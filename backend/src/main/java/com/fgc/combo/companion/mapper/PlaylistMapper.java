package com.fgc.combo.companion.mapper;

import com.fgc.combo.companion.dto.CompletePlaylistDTO;
import com.fgc.combo.companion.dto.PaginationResponse;
import com.fgc.combo.companion.dto.PlaylistResponseDTO;
import com.fgc.combo.companion.model.Playlist;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

@Component
public class PlaylistMapper extends BaseMapper<Playlist> {

  public PlaylistMapper(ModelMapper modelMapper) {
    super(modelMapper);
  }

  public PlaylistResponseDTO toDTO(Playlist playlist) {
    return super.toDTO(playlist, PlaylistResponseDTO.class);
  }

  public CompletePlaylistDTO toCompletePlaylistDTO(Playlist playlist) {
    return super.toDTO(playlist, CompletePlaylistDTO.class);
  }

  public Playlist toOriginal(Object playlistDTO) {
    return super.toOriginal(playlistDTO, Playlist.class);
  }

  public PaginationResponse<PlaylistResponseDTO> toPagination(
    PaginationResponse<Playlist> playlistPagination
  ) {
    return super.toPaginationDTO(playlistPagination, PlaylistResponseDTO.class);
  }
}
