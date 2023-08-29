package com.fgc.combo.companion.service;

import com.fgc.combo.companion.dto.AddCombosToPlaylistDto;
import com.fgc.combo.companion.dto.CreateComboDto;
import com.fgc.combo.companion.dto.CreatePlaylistDto;
import com.fgc.combo.companion.dto.PaginationResponse;
import com.fgc.combo.companion.dto.PlaylistComboSearchDto;
import com.fgc.combo.companion.dto.ReorderCombosDto;
import com.fgc.combo.companion.dto.UpdatePlaylistDto;
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

  Playlist create(CreatePlaylistDto playlistDTO);

  Playlist update(UUID id, UpdatePlaylistDto playlistDTO);

  boolean delete(UUID playlistId);

  boolean deleteCombosFromPlaylist(
    UUID playlistId,
    List<UUID> playlistComboIds
  );

  Playlist getPlaylistWithCombos(UUID playlistId);

  Playlist addCombosToPlaylist(UUID playlistId, AddCombosToPlaylistDto combos);

  Playlist savePlaylist(Playlist playlist);

  PaginationResponse<Playlist> getByCurrentUserPlaylistAndSearchParam(
    PlaylistComboSearchDto playlistComboSearchDTO,
    Pageable pageable
  );

  Playlist createComboAndAddToPlaylist(
    UUID playlistId,
    CreateComboDto createComboDTO
  );

  Playlist reorderPlaylistCombos(UUID playlistId, ReorderCombosDto reorderCombosDto);
}
