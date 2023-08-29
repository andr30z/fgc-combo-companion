package com.fgc.combo.companion.dto;

import java.util.List;

public record SearchAllResourcesDto(
  List<UserDto> users,
  List<ComboResponseDto> combos,
  List<PlaylistResponseDto> playlists
) {}
