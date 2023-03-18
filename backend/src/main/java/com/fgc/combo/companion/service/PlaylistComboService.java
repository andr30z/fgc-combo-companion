package com.fgc.combo.companion.service;

import java.util.List;
import java.util.Set;

import com.fgc.combo.companion.model.Combo;
import com.fgc.combo.companion.model.Playlist;

public interface PlaylistComboService {
    List<Combo> getAllCombosInPlaylist(Long playlistId);

    List<Combo> getAllCombosInPlaylist(Playlist playlist);

    List<Combo> addAllCombosToPlaylist(Long playlistId, Set<Long> comboIds);

    List<Combo> addAllCombosToPlaylist(Playlist playlist, Set<Long> comboIds);

    List<Combo> removeCombosFromPlaylist(Playlist playlist, List<Long> playlistCombosId);

    void deleteByPlaylist(Playlist playlist);
}
