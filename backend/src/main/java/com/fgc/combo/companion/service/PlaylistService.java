package com.fgc.combo.companion.service;

import com.fgc.combo.companion.dto.CreatePlaylistDTO;
import com.fgc.combo.companion.dto.PlaylistResponseDTO;
import com.fgc.combo.companion.dto.UpdatePlaylistDTO;

public interface PlaylistService {
    PlaylistResponseDTO create(CreatePlaylistDTO playlistDTO);

    PlaylistResponseDTO update(Long id, UpdatePlaylistDTO playlistDTO);

}
