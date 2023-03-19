package com.fgc.combo.companion.mapper;

import com.fgc.combo.companion.dto.CompletePlaylistDTO;
import com.fgc.combo.companion.dto.PaginationResponse;
import com.fgc.combo.companion.dto.PlaylistResponseDTO;
import com.fgc.combo.companion.model.Playlist;
import org.modelmapper.ModelMapper;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Component;

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

  public PaginationResponse<PlaylistResponseDTO> toPlaylistResponseDTOPagination(
    PaginationResponse<Playlist> playlistPagination
  ) {
    PaginationResponse<PlaylistResponseDTO> responsePaginated = new PaginationResponse<>();
    BeanUtils.copyProperties(playlistPagination, responsePaginated);
    responsePaginated.setData(
      playlistPagination
        .getData()
        .stream()
        .map(this::toPlaylistReponseDTO)
        .toList()
    );

    return responsePaginated;
  }
}
