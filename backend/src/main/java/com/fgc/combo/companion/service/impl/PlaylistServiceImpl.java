package com.fgc.combo.companion.service.impl;

import java.util.List;

import org.springframework.beans.BeanUtils;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.fgc.combo.companion.dto.AddCombosToPlaylistDTO;
import com.fgc.combo.companion.dto.CompletePlaylistDTO;
import com.fgc.combo.companion.dto.CreatePlaylistDTO;
import com.fgc.combo.companion.dto.PaginationResponse;
import com.fgc.combo.companion.dto.PlaylistResponseDTO;
import com.fgc.combo.companion.dto.UpdatePlaylistDTO;
import com.fgc.combo.companion.exception.OperationNotAllowedException;
import com.fgc.combo.companion.exception.ResourceNotFoundException;
import com.fgc.combo.companion.mapper.PaginationResponseMapper;
import com.fgc.combo.companion.mapper.PlaylistMapper;
import com.fgc.combo.companion.model.Playlist;
import com.fgc.combo.companion.model.User;
import com.fgc.combo.companion.repository.PlaylistRepository;
import com.fgc.combo.companion.service.PlaylistComboService;
import com.fgc.combo.companion.service.PlaylistService;
import com.fgc.combo.companion.service.UserService;

import jakarta.transaction.Transactional;

@Service
public class PlaylistServiceImpl implements PlaylistService {

  private final PlaylistRepository playlistRepository;
  private final PlaylistMapper playlistMapper;
  private final UserService userService;
  private final PlaylistComboService playlistComboService;

  public PlaylistServiceImpl(
    PlaylistRepository playlistRepository,
    PlaylistMapper playlistMapper,
    UserService userService,
    PlaylistComboService playlistComboService
  ) {
    this.playlistRepository = playlistRepository;
    this.playlistMapper = playlistMapper;
    this.userService = userService;
    this.playlistComboService = playlistComboService;
  }

  private Playlist getByIdAndOwner(Long playlistId, User user) {
    return this.playlistRepository.findByIdAndOwner(playlistId, user)
      .orElseThrow(() -> new ResourceNotFoundException("Playlist not found!"));
  }

  private Playlist getPlaylistById(Long id) {
    return this.playlistRepository.findById(id)
      .orElseThrow(() -> new ResourceNotFoundException("Playlist not found!"));
  }

  @Override
  public CompletePlaylistDTO addCombosToPlaylist(
    Long playlistId,
    AddCombosToPlaylistDTO combos
  ) {
    Playlist playlist = getPlaylistById(playlistId);
    this.playlistComboService.addAllCombosToPlaylist(
        playlist,
        combos.getCombos()
      );
    return this.playlistMapper.toCompletePlaylistDTO(playlist);
  }

  @Override
  public CompletePlaylistDTO getPlaylistWithCombos(Long playlistId) {
    return this.playlistMapper.toCompletePlaylistDTO(
        this.playlistRepository.findById(playlistId)
          .orElseThrow(() ->
            new ResourceNotFoundException("Playlist not found!")
          )
      );
  }

  @Transactional
  @Override
  public boolean deleteCombosFromPlaylist(
    Long playlistId,
    List<Long> playlistComboIds
  ) {
    Playlist playlist = getByIdAndOwner(playlistId, this.userService.me());
    this.playlistComboService.removeCombosFromPlaylist(
        playlist,
        playlistComboIds
      );
    return true;
  }

  @Override
  @Transactional
  public PlaylistResponseDTO create(CreatePlaylistDTO playlistDTO) {
    User currentUser = userService.me();

    Playlist playlist = new Playlist();
    BeanUtils.copyProperties(playlistDTO, playlist);
    playlist.setOwner(currentUser);

    Playlist createdPlaylist = this.playlistRepository.save(playlist);

    this.playlistComboService.addAllCombosToPlaylist(
        createdPlaylist,
        playlistDTO.getCombos()
      );

    return playlistMapper.toPlaylistReponseDTO(createdPlaylist);
  }

  @Override
  public PlaylistResponseDTO update(Long id, UpdatePlaylistDTO playlistDTO) {
    User currentUser = userService.me();

    Playlist playlist = playlistRepository
      .findById(id)
      .orElseThrow(() -> new ResourceNotFoundException("Playlist not found!"));

    if (
      playlist.getOwner().getId() != currentUser.getId()
    ) throw new OperationNotAllowedException(
      "This playlist belongs to another user!"
    );

    BeanUtils.copyProperties(playlistDTO, playlist);
    return playlistMapper.toPlaylistReponseDTO(
      this.playlistRepository.save(playlist)
    );
  }

  @Override
  public PlaylistResponseDTO getByIdAndCurrentUser(Long id) {
    Playlist playlist = getByIdAndOwner(id, this.userService.me());

    return this.playlistMapper.toPlaylistReponseDTO(playlist);
  }

  @Override
  public PaginationResponse<PlaylistResponseDTO> getByCurrentUser(
    Pageable pageable
  ) {
    Page<Playlist> currentUserPlaylists =
      this.playlistRepository.findByOwner(this.userService.me(), pageable);
    return PaginationResponseMapper.create(
      currentUserPlaylists,
      playlistMapper::toPlaylistReponseDTO
    );
  }
}
