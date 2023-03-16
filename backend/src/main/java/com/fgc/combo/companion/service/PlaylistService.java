package com.fgc.combo.companion.service;

import com.fgc.combo.companion.dto.CreatePlaylistDTO;
import com.fgc.combo.companion.dto.PlaylistResponseDTO;

public interface PlaylistService {
    PlaylistResponseDTO create(CreatePlaylistDTO playlistDTO);
}
