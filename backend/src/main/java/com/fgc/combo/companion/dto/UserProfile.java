package com.fgc.combo.companion.dto;

import com.fgc.combo.companion.model.User;

public record UserProfile(
  User user,
  PaginationResponse<PlaylistResponseDto> playlists,
  PaginationResponse<ComboResponseDto> combos
) {}
