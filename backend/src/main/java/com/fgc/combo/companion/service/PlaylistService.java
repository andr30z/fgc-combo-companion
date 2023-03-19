package com.fgc.combo.companion.service;

import java.util.List;

import org.springframework.data.domain.Pageable;

import com.fgc.combo.companion.dto.AddCombosToPlaylistDTO;
import com.fgc.combo.companion.dto.CreatePlaylistDTO;
import com.fgc.combo.companion.dto.PaginationResponse;
import com.fgc.combo.companion.dto.UpdatePlaylistDTO;
import com.fgc.combo.companion.model.Playlist;

public interface PlaylistService {

    Playlist getByIdAndCurrentUser(Long id);

    PaginationResponse<Playlist> getByCurrentUser(Pageable pageable);

    Playlist create(CreatePlaylistDTO playlistDTO);

    Playlist update(Long id, UpdatePlaylistDTO playlistDTO);

    boolean delete(Long playlistId);

    boolean deleteCombosFromPlaylist(Long playlistId, List<Long> playlistComboIds);

    Playlist getPlaylistWithCombos(Long playlistId);

    Playlist addCombosToPlaylist(Long playlistId, AddCombosToPlaylistDTO combos);

}
