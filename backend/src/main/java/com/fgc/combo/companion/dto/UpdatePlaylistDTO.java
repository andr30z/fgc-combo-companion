package com.fgc.combo.companion.dto;

import jakarta.validation.constraints.NotEmpty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import org.hibernate.validator.constraints.Length;

@AllArgsConstructor
@Data
@Builder
public class UpdatePlaylistDTO {

  @NotEmpty
  private String name;

  @Length(max = 255)
  private String description;
}
