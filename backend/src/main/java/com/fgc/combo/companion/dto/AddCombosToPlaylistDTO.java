package com.fgc.combo.companion.dto;

import java.util.Set;

import jakarta.validation.constraints.NotEmpty;
import lombok.Data;

@Data
public class AddCombosToPlaylistDTO {

  @NotEmpty
  private Set<Long> combos;
}
