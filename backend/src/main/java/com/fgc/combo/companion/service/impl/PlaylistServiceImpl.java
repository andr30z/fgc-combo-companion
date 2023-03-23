package com.fgc.combo.companion.service.impl;

import com.fgc.combo.companion.dto.AddCombosToPlaylistDTO;
import com.fgc.combo.companion.dto.CreatePlaylistDTO;
import com.fgc.combo.companion.dto.PaginationResponse;
import com.fgc.combo.companion.dto.PlaylistComboSearchDTO;
import com.fgc.combo.companion.dto.UpdatePlaylistDTO;
import com.fgc.combo.companion.exception.OperationNotAllowedException;
import com.fgc.combo.companion.exception.ResourceNotFoundException;
import com.fgc.combo.companion.mapper.PaginationResponseMapper;
import com.fgc.combo.companion.model.Playlist;
import com.fgc.combo.companion.model.User;
import com.fgc.combo.companion.repository.PlaylistRepository;
import com.fgc.combo.companion.service.PlaylistComboService;
import com.fgc.combo.companion.service.PlaylistService;
import com.fgc.combo.companion.service.UserService;
import jakarta.transaction.Transactional;
import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;
import java.util.List;
import java.util.Set;
import org.springframework.beans.BeanUtils;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class PlaylistServiceImpl implements PlaylistService {

  private final PlaylistRepository playlistRepository;
  private final UserService userService;
  private final PlaylistComboService playlistComboService;

  public PlaylistServiceImpl(
    PlaylistRepository playlistRepository,
    UserService userService,
    PlaylistComboService playlistComboService
  ) {
    this.playlistRepository = playlistRepository;
    this.userService = userService;
    this.playlistComboService = playlistComboService;
  }

  private Playlist getByIdWithOwnerValidation(Long playlistId) {
    User currentUser = userService.me();
    Playlist playlist = getPlaylistById(playlistId);

    if (playlist.getOwner().getId() != currentUser.getId()) {
      throw new OperationNotAllowedException(
        "This playlist belongs to another user!"
      );
    }

    return playlist;
  }

  private Playlist getPlaylistById(Long id) {
    return this.playlistRepository.findById(id)
      .orElseThrow(() -> new ResourceNotFoundException("Playlist not found!"));
  }

  @Override
  public Playlist addCombosToPlaylist(
    Long playlistId,
    AddCombosToPlaylistDTO combos
  ) {
    Playlist playlist = getPlaylistById(playlistId);
    this.playlistComboService.addAllCombosToPlaylist(
        playlist,
        combos.getCombos()
      );
    return playlist;
  }

  @Override
  public Playlist getPlaylistWithCombos(Long playlistId) {
    return this.playlistRepository.findById(playlistId)
      .orElseThrow(() -> new ResourceNotFoundException("Playlist not found!"));
  }

  @Transactional
  @Override
  public boolean deleteCombosFromPlaylist(
    Long playlistId,
    List<Long> playlistComboIds
  ) {
    User currentUser = userService.me();
    Playlist playlist = getPlaylistById(playlistId);

    if (playlist.getOwner().getId() != currentUser.getId()) {
      throw new OperationNotAllowedException(
        "This playlist belongs to another user!"
      );
    }
    this.playlistComboService.removeCombosFromPlaylist(
        playlist,
        playlistComboIds
      );
    return true;
  }

  @Override
  @Transactional
  public Playlist create(CreatePlaylistDTO playlistDTO) {
    User currentUser = userService.me();

    Playlist playlist = new Playlist();
    BeanUtils.copyProperties(playlistDTO, playlist);
    playlist.setOwner(currentUser);

    Playlist createdPlaylist = this.savePlaylist(playlist);

    this.playlistComboService.addAllCombosToPlaylist(
        createdPlaylist,
        playlistDTO.getCombos()
      );

    return createdPlaylist;
  }

  @Override
  public Playlist update(Long id, UpdatePlaylistDTO playlistDTO) {
    Playlist playlist = getByIdAndCurrentUser(id);

    BeanUtils.copyProperties(playlistDTO, playlist);
    return this.savePlaylist(playlist);
  }

  @Override
  public Playlist getByIdAndCurrentUser(Long id) {
    return getByIdWithOwnerValidation(id);
  }

  @Override
  public PaginationResponse<Playlist> getByCurrentUser(Pageable pageable) {
    Page<Playlist> currentUserPlaylists =
      this.playlistRepository.findByOwner(this.userService.me(), pageable);
    return PaginationResponseMapper.create(currentUserPlaylists);
  }

  @Override
  @Transactional
  public boolean delete(Long playlistId) {
    Playlist playlist = getByIdWithOwnerValidation(playlistId);
    this.playlistComboService.deleteByPlaylist(playlist);
    this.playlistRepository.delete(playlist);

    return true;
  }

  @Override
  public Playlist savePlaylist(Playlist playlist) {
    return this.playlistRepository.save(playlist);
  }

  @Override
  public PaginationResponse<Playlist> getAllByPlaylistNameOrTagName(
    PlaylistComboSearchDTO playlistSearchResponseDTO,
    Pageable pageable
  ) {
    String name = playlistSearchResponseDTO.getName() != null
      ? URLDecoder.decode(
        playlistSearchResponseDTO.getName(),
        StandardCharsets.UTF_8
      )
      : null;
    return PaginationResponseMapper.create(
      name == null
        ? this.playlistRepository.findAll(pageable)
        : this.playlistRepository.findAllByNameContainingIgnoreCaseOrTagsTitleInIgnoreCase(
            name,
            Set.of(name),
            pageable
          )
    );
  }
}