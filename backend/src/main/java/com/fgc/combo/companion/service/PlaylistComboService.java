package com.fgc.combo.companion.service;

import com.fgc.combo.companion.dto.CreateComboDTO;
import com.fgc.combo.companion.dto.ReorderCombosDto;
import com.fgc.combo.companion.model.Combo;
import com.fgc.combo.companion.model.Playlist;
import java.util.List;
import java.util.Set;

public interface PlaylistComboService {
  List<Combo> getAllCombosInPlaylist(Long playlistId);

  List<Combo> getAllCombosInPlaylist(Playlist playlist);

  List<Combo> addAllCombosToPlaylist(Long playlistId, Set<Long> comboIds);

  List<Combo> addAllCombosToPlaylist(Playlist playlist, Set<Long> comboIds);

  List<Combo> removeCombosFromPlaylist(
    Playlist playlist,
    List<Long> playlistCombosId
  );

  Playlist createComboAndAddToPlaylist(
    Playlist playlist,
    CreateComboDTO createComboDTO
  );

  void deleteByPlaylist(Playlist playlist);

  Playlist reorderPlaylistCombos(Playlist playlist, ReorderCombosDto reorderCombosDto);
}
