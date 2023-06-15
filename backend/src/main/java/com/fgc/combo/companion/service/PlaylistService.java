package com.fgc.combo.companion.service;

import com.fgc.combo.companion.dto.AddCombosToPlaylistDTO;
import com.fgc.combo.companion.dto.CreateComboDTO;
import com.fgc.combo.companion.dto.CreatePlaylistDTO;
import com.fgc.combo.companion.dto.PaginationResponse;
import com.fgc.combo.companion.dto.PlaylistComboSearchDTO;
import com.fgc.combo.companion.dto.UpdatePlaylistDTO;
import com.fgc.combo.companion.model.Playlist;
import java.util.List;
import org.springframework.data.domain.Pageable;

public interface PlaylistService {
  PaginationResponse<Playlist> getByOwner(Long userId, Pageable pageable);

  Playlist getByIdAndCurrentUser(Long id);

  PaginationResponse<Playlist> getByCurrentUser(Pageable pageable);

  Playlist create(CreatePlaylistDTO playlistDTO);

  Playlist update(Long id, UpdatePlaylistDTO playlistDTO);

  boolean delete(Long playlistId);

  boolean deleteCombosFromPlaylist(
    Long playlistId,
    List<Long> playlistComboIds
  );

  Playlist getPlaylistWithCombos(Long playlistId);

  Playlist addCombosToPlaylist(Long playlistId, AddCombosToPlaylistDTO combos);

  Playlist savePlaylist(Playlist playlist);

  PaginationResponse<Playlist> getByCurrentUserPlaylistAndSearchParam(
    PlaylistComboSearchDTO playlistComboSearchDTO,
    Pageable pageable
  );

  Playlist createComboAndAddToPlaylist(
    Long playlistId,
    CreateComboDTO createComboDTO
  );
}
