package com.fgc.combo.companion.mapper;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

import com.fgc.combo.companion.dto.CompletePlaylistDTO;
import com.fgc.combo.companion.dto.PlaylistResponseDTO;
import com.fgc.combo.companion.model.Playlist;

@Component
public class PlaylistMapper {
    private final ModelMapper modelMapper;

    public PlaylistMapper(ModelMapper modelMapper) {
        this.modelMapper = modelMapper;
    }

    public PlaylistResponseDTO toPlaylistReponseDTO(Playlist playlist) {
        return this.modelMapper.map(playlist, PlaylistResponseDTO.class);
    }

    public Playlist toPlaylist(Object playlistDTO) {
        return modelMapper.map(playlistDTO, Playlist.class);
    }

    public CompletePlaylistDTO toCompletePlaylistDTO(Playlist playlist) {
        return modelMapper.map(playlist, CompletePlaylistDTO.class);
    }
}
