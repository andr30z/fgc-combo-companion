package com.fgc.combo.companion.service;

import java.util.List;

import com.fgc.combo.companion.model.Combo;
import com.fgc.combo.companion.model.Playlist;

public interface PlaylistComboService {
    List<Combo> getAllCombosInPlaylist(Long playlistId);

    List<Combo> getAllCombosInPlaylist(Playlist playlist);

    List<Combo> addAllCombosToPlaylist(Long playlistId, List<Long> comboIds);

    List<Combo> addAllCombosToPlaylist(Playlist playlist, List<Long> comboIds);

    List<Combo> removeCombosFromPlaylist(List<Long> playlistCombosId);
}
