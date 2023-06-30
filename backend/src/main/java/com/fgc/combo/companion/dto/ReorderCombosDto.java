package com.fgc.combo.companion.dto;

import java.util.List;
import java.util.UUID;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;
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
  private List<UUID> newPlaylistCombosOrdenation;
}
