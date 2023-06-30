package com.fgc.combo.companion.service;

import com.fgc.combo.companion.dto.AddCombosToPlaylistDTO;
import com.fgc.combo.companion.dto.CreateComboDTO;
import com.fgc.combo.companion.dto.CreatePlaylistDTO;
import com.fgc.combo.companion.dto.PaginationResponse;
import com.fgc.combo.companion.dto.PlaylistComboSearchDTO;
import com.fgc.combo.companion.dto.ReorderCombosDto;
import com.fgc.combo.companion.dto.UpdatePlaylistDTO;
import com.fgc.combo.companion.model.Playlist;
import com.fgc.combo.companion.model.User;
import java.util.List;
import java.util.UUID;

import org.springframework.data.domain.Pageable;

public interface PlaylistService {
  PaginationResponse<Playlist> getByOwner(User owner, Pageable pageable);
  
  PaginationResponse<Playlist> getByOwner(UUID userId, Pageable pageable);

  Playlist getByIdAndCurrentUser(UUID id);

  PaginationResponse<Playlist> getByCurrentUser(Pageable pageable);

  Playlist create(CreatePlaylistDTO playlistDTO);

  Playlist update(UUID id, UpdatePlaylistDTO playlistDTO);

  boolean delete(UUID playlistId);

  boolean deleteCombosFromPlaylist(
    UUID playlistId,
    List<UUID> playlistComboIds
  );

  Playlist getPlaylistWithCombos(UUID playlistId);

  Playlist addCombosToPlaylist(UUID playlistId, AddCombosToPlaylistDTO combos);

  Playlist savePlaylist(Playlist playlist);

  PaginationResponse<Playlist> getByCurrentUserPlaylistAndSearchParam(
    PlaylistComboSearchDTO playlistComboSearchDTO,
    Pageable pageable
  );

  Playlist createComboAndAddToPlaylist(
    UUID playlistId,
    CreateComboDTO createComboDTO
  );

  Playlist reorderPlaylistCombos(UUID playlistId, ReorderCombosDto reorderCombosDto);
}
