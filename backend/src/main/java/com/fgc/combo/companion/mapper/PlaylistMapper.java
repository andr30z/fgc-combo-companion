package com.fgc.combo.companion.mapper;

import org.modelmapper.ModelMapper;

import com.fgc.combo.companion.dto.PlaylistResponseDTO;
import com.fgc.combo.companion.model.Playlist;

public class PlaylistMapper {
    private final ModelMapper modelMapper;

    public PlaylistMapper(ModelMapper modelMapper) {
        this.modelMapper = modelMapper;
    }

    public PlaylistResponseDTO toComboReponseDTO(Playlist playlist) {
        return this.modelMapper.map(playlist, PlaylistResponseDTO.class);
    }

    public Playlist toPlaylist(Object playlistDTO) {
        return modelMapper.map(playlistDTO, Playlist.class);
    }
}
