package com.fgc.combo.companion.dto;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
public class ReorderCombosDto {

  @NotEmpty
  @Size(min = 2, max = 255)
  private List<Long> newPlaylistCombosOrdenation;
}
