package com.fgc.combo.companion.dto;

import com.fgc.combo.companion.model.User;
import java.time.LocalDateTime;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PlaylistResponseDTO {

  private Long id;

  private String name;

  private String description;

  private LocalDateTime createdAt;

  private User owner;

  private List<TagResponseDTO> tags;
}
