package com.fgc.combo.companion.service.impl;

import com.fgc.combo.companion.dto.CreatePlaylistDTO;
import com.fgc.combo.companion.dto.PaginationResponse;
import com.fgc.combo.companion.dto.PlaylistResponseDTO;
import com.fgc.combo.companion.dto.UpdatePlaylistDTO;
import com.fgc.combo.companion.exception.OperationNotAllowedException;
import com.fgc.combo.companion.mapper.PaginationResponseMapper;
import com.fgc.combo.companion.mapper.PlaylistMapper;
import com.fgc.combo.companion.model.Playlist;
import com.fgc.combo.companion.model.User;
import com.fgc.combo.companion.repository.PlaylistRepository;
import com.fgc.combo.companion.service.PlaylistComboService;
import com.fgc.combo.companion.service.PlaylistService;
import com.fgc.combo.companion.service.UserService;
import jakarta.transaction.Transactional;
import org.springframework.beans.BeanUtils;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.webjars.NotFoundException;

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

  @Override
  @Transactional
  public PlaylistResponseDTO create(CreatePlaylistDTO playlistDTO) {
    User currentUser = userService.me();

    Playlist playlist = playlistMapper.toPlaylist(playlistDTO);
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
      .orElseThrow(() -> new NotFoundException("Playlist not found!"));

    if (
      playlist.getOwner().getId() != currentUser.getId()
    ) throw new OperationNotAllowedException(
      "You can't edit a playlist that is not yours!"
    );

    BeanUtils.copyProperties(playlist, playlistDTO);
    return playlistMapper.toPlaylistReponseDTO(
      this.playlistRepository.save(playlist)
    );
  }

  @Override
  public PlaylistResponseDTO getByIdAndCurrentUser(Long id) {
    Playlist playlist =
      this.playlistRepository.findByIdAndOwner(id, this.userService.me())
        .orElseThrow(() -> new NotFoundException("Playlist not found!"));

    return this.playlistMapper.toPlaylistReponseDTO(playlist);
  }

  @Override
  public PaginationResponse<PlaylistResponseDTO> getByCurrentUser(
    Pageable pageable
  ) {
    Page<Playlist> currentUserPlaylists =
      this.playlistRepository.findByOwner(this.userService.me());
    return PaginationResponseMapper.create(
      currentUserPlaylists,
      playlistMapper::toPlaylistReponseDTO
    );
  }
}
