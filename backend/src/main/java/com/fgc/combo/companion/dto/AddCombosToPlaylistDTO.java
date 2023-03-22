package com.fgc.combo.companion.dto;

import jakarta.validation.constraints.NotEmpty;
import java.util.Set;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AddCombosToPlaylistDTO {

  @NotEmpty
  private Set<Long> combos;
}
