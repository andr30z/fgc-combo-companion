package com.fgc.combo.companion.dto;

import java.util.List;

public record SearchAllResourcesDto(
  List<UserDto> users,
  List<ComboResponseDTO> combos,
  List<PlaylistResponseDTO> playlists
) {}
