package com.fgc.combo.companion.service;

import org.springframework.data.domain.Pageable;

import com.fgc.combo.companion.dto.CreatePlaylistDTO;
import com.fgc.combo.companion.dto.PaginationResponse;
import com.fgc.combo.companion.dto.PlaylistResponseDTO;
import com.fgc.combo.companion.dto.UpdatePlaylistDTO;

public interface PlaylistService {

    PlaylistResponseDTO getByIdAndCurrentUser(Long id);

    PaginationResponse<PlaylistResponseDTO> getByCurrentUser(Pageable pageable);

    PlaylistResponseDTO create(CreatePlaylistDTO playlistDTO);

    PlaylistResponseDTO update(Long id, UpdatePlaylistDTO playlistDTO);

}
