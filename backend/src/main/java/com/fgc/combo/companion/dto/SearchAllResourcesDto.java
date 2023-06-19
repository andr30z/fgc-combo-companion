package com.fgc.combo.companion.dto;

import com.fgc.combo.companion.model.User;
import java.util.List;

public record SearchAllResourcesDto(
  List<User> users,
  List<ComboResponseDTO> combos,
  List<PlaylistResponseDTO> playlists
) {}
