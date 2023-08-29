package com.fgc.combo.companion.service;

import com.fgc.combo.companion.dto.CreateComboDto;
import com.fgc.combo.companion.dto.ReorderCombosDto;
import com.fgc.combo.companion.model.Combo;
import com.fgc.combo.companion.model.Playlist;
import java.util.List;
import java.util.Set;
import java.util.UUID;

public interface PlaylistComboService {
  List<Combo> getAllCombosInPlaylist(UUID playlistId);

  List<Combo> getAllCombosInPlaylist(Playlist playlist);

  List<Combo> addAllCombosToPlaylist(UUID playlistId, Set<UUID> comboIds);

  List<Combo> addAllCombosToPlaylist(Playlist playlist, Set<UUID> comboIds);

  List<Combo> removeCombosFromPlaylist(
    Playlist playlist,
    List<UUID> playlistCombosId
  );

  Playlist createComboAndAddToPlaylist(
    Playlist playlist,
    CreateComboDto createComboDTO
  );

  void deleteByPlaylist(Playlist playlist);

  Playlist reorderPlaylistCombos(Playlist playlist, ReorderCombosDto reorderCombosDto);
}
