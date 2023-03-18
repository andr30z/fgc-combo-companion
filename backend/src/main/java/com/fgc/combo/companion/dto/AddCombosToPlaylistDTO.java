package com.fgc.combo.companion.dto;

import jakarta.validation.constraints.NotEmpty;
import java.util.List;
import lombok.Data;

@Data
public class AddCombosToPlaylistDTO {

  @NotEmpty
  private List<Long> combos;
}
