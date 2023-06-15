package com.fgc.combo.companion.dto;

import com.fgc.combo.companion.model.User;
import java.time.LocalDateTime;
import java.util.Set;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CompletePlaylistDTO {

  private Long id;

  private String name;

  private String description;

  private LocalDateTime createdAt;

  private LocalDateTime updatedAt;

  private User owner;

  private Set<PlaylistComboResponseDTO> playlistCombos;

  private Set<TagResponseDTO> tags;
}
