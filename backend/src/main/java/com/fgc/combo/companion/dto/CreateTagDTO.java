package com.fgc.combo.companion.dto;

import java.util.UUID;

import jakarta.validation.constraints.NotEmpty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CreateTagDTO {

  @NotEmpty(message = "Title is required")
  private String title;

  @NotEmpty(message = "Color is required")
  private String color;

  private UUID comboId;
  private UUID playlistId;
}
