package com.fgc.combo.companion.service;

import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;
import java.util.List;
import java.util.UUID;

import org.springframework.beans.BeanUtils;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.fgc.combo.companion.dto.AddCombosToPlaylistDto;
import com.fgc.combo.companion.dto.CreateComboDto;
import com.fgc.combo.companion.dto.CreatePlaylistDto;
import com.fgc.combo.companion.dto.PaginationResponse;
import com.fgc.combo.companion.dto.PlaylistComboSearchDto;
import com.fgc.combo.companion.dto.ReorderCombosDto;
import com.fgc.combo.companion.dto.UpdatePlaylistDto;
import com.fgc.combo.companion.exception.OperationNotAllowedException;
import com.fgc.combo.companion.exception.ResourceNotFoundException;
import com.fgc.combo.companion.mapper.PaginationResponseMapper;
import com.fgc.combo.companion.model.Playlist;
import com.fgc.combo.companion.model.User;
import com.fgc.combo.companion.repository.PlaylistRepository;

import jakarta.transaction.Transactional;

@Service
public class PlaylistService {

  private final PlaylistRepository playlistRepository;
  private final UserService userService;
  private final PlaylistComboService playlistComboService;

  public PlaylistService(
    PlaylistRepository playlistRepository,
    UserService userService,
    PlaylistComboService playlistComboService
  ) {
    this.playlistRepository = playlistRepository;
    this.userService = userService;
    this.playlistComboService = playlistComboService;
  }

  private Playlist getByIdWithOwnerValidation(UUID playlistId) {
    User currentUser = userService.me();
    Playlist playlist = getPlaylistById(playlistId);

    if (!playlist.getOwner().getId().equals(currentUser.getId())) {
      throw new OperationNotAllowedException(
        "This playlist belongs to another user!"
      );
    }

    return playlist;
  }

  private Playlist getPlaylistById(UUID id) {
    return this.playlistRepository.findById(id)
      .orElseThrow(() -> new ResourceNotFoundException("Playlist not found!"));
  }

   
  public Playlist addCombosToPlaylist(
    UUID playlistId,
    AddCombosToPlaylistDto combos
  ) {
    Playlist playlist = getPlaylistById(playlistId);
    this.playlistComboService.addAllCombosToPlaylist(
        playlist,
        combos.getCombos()
      );
    return playlist;
  }

   
  public Playlist getPlaylistWithCombos(UUID playlistId) {
    return this.playlistRepository.findById(playlistId)
      .orElseThrow(() -> new ResourceNotFoundException("Playlist not found!"));
  }

  @Transactional
   
  public boolean deleteCombosFromPlaylist(
    UUID playlistId,
    List<UUID> playlistComboIds
  ) {
    User currentUser = userService.me();
    Playlist playlist = getPlaylistById(playlistId);

    if (!playlist.getOwner().getId().equals(currentUser.getId())) {
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

   
  @Transactional
  public Playlist create(CreatePlaylistDto playlistDTO) {
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

   
  public Playlist update(UUID id, UpdatePlaylistDto playlistDTO) {
    Playlist playlist = getByIdAndCurrentUser(id);

    BeanUtils.copyProperties(playlistDTO, playlist);
    return this.savePlaylist(playlist);
  }

   
  public Playlist getByIdAndCurrentUser(UUID id) {
    return getByIdWithOwnerValidation(id);
  }

   
  public PaginationResponse<Playlist> getByCurrentUser(Pageable pageable) {
    Page<Playlist> currentUserPlaylists =
      this.playlistRepository.findByOwner(this.userService.me(), pageable);
    return PaginationResponseMapper.create(currentUserPlaylists);
  }

   
  @Transactional
  public boolean delete(UUID playlistId) {
    Playlist playlist = getByIdWithOwnerValidation(playlistId);
    this.playlistRepository.delete(playlist);
    this.playlistComboService.deleteByPlaylist(playlist);

    return true;
  }

   
  public Playlist savePlaylist(Playlist playlist) {
    return this.playlistRepository.save(playlist);
  }

   
  public PaginationResponse<Playlist> getByCurrentUserPlaylistAndSearchParam(
    PlaylistComboSearchDto playlistSearchResponseDTO,
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
        ? this.playlistRepository.findByOwner(userService.me(), pageable)
        : this.playlistRepository.findAllByOnwerAndSearchParam(
            userService.me(),
            name,
            pageable
          )
    );
  }

   
  public Playlist createComboAndAddToPlaylist(
    UUID playlistId,
    CreateComboDto createComboDTO
  ) {
    return this.playlistComboService.createComboAndAddToPlaylist(
        this.getByIdAndCurrentUser(playlistId),
        createComboDTO
      );
  }

   
  public PaginationResponse<Playlist> getByOwner(User user, Pageable pageable) {
    return PaginationResponseMapper.create(
      this.playlistRepository.findByOwner(user, pageable)
    );
  }

   
  public PaginationResponse<Playlist> getByOwner(
    UUID userId,
    Pageable pageable
  ) {
    return this.getByOwner(this.userService.findById(userId), pageable);
  }

   
  public Playlist reorderPlaylistCombos(
    UUID playlistId,
    ReorderCombosDto reorderCombosDto
  ) {
    return this.playlistComboService.reorderPlaylistCombos(
        this.getByIdAndCurrentUser(playlistId),
        reorderCombosDto
      );
  }
}
