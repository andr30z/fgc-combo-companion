package com.fgc.combo.companion.mapper;

import com.fgc.combo.companion.dto.CompletePlaylistDto;
import com.fgc.combo.companion.dto.PaginationResponse;
import com.fgc.combo.companion.dto.PlaylistResponseDto;
import com.fgc.combo.companion.model.Playlist;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

@Component
public class PlaylistMapper extends BaseMapper<Playlist> {

  public PlaylistMapper(ModelMapper modelMapper) {
    super(modelMapper);
  }

  public PlaylistResponseDto toDto(Playlist playlist) {
    return super.toDto(playlist, PlaylistResponseDto.class);
  }

  public CompletePlaylistDto toCompletePlaylistDto(Playlist playlist) {
    return super.toDto(playlist, CompletePlaylistDto.class);
  }

  public Playlist toOriginal(Object playlistDTO) {
    return super.toOriginal(playlistDTO, Playlist.class);
  }

  public PaginationResponse<PlaylistResponseDto> toPagination(
    PaginationResponse<Playlist> playlistPagination
  ) {
    return super.toPaginationDto(playlistPagination, PlaylistResponseDto.class);
  }
}
