package com.fgc.combo.companion.dto;

import java.time.LocalDateTime;
import java.util.Set;
import java.util.UUID;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CompletePlaylistDTO {

  private UUID id;

  private String name;

  private String description;

  private LocalDateTime createdAt;

  private LocalDateTime updatedAt;

  private UserDto owner;

  private Set<PlaylistComboResponseDTO> playlistCombos;

  private Set<TagResponseDTO> tags;
}
