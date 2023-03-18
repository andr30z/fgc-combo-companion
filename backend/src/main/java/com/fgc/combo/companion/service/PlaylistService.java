package com.fgc.combo.companion.service;

import java.util.List;

import org.springframework.data.domain.Pageable;

import com.fgc.combo.companion.dto.AddCombosToPlaylistDTO;
import com.fgc.combo.companion.dto.CompletePlaylistDTO;
import com.fgc.combo.companion.dto.CreatePlaylistDTO;
import com.fgc.combo.companion.dto.PaginationResponse;
import com.fgc.combo.companion.dto.PlaylistResponseDTO;
import com.fgc.combo.companion.dto.UpdatePlaylistDTO;

public interface PlaylistService {

    PlaylistResponseDTO getByIdAndCurrentUser(Long id);

    PaginationResponse<PlaylistResponseDTO> getByCurrentUser(Pageable pageable);

    PlaylistResponseDTO create(CreatePlaylistDTO playlistDTO);

    PlaylistResponseDTO update(Long id, UpdatePlaylistDTO playlistDTO);

    boolean deleteCombosFromPlaylist(Long playlistId, List<Long> playlistComboIds);

    CompletePlaylistDTO getPlaylistWithCombos(Long playlistId);

    CompletePlaylistDTO addCombosToPlaylist(Long playlistId, AddCombosToPlaylistDTO combos);

}
