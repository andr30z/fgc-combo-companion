package com.fgc.combo.companion.dto;

import java.util.Set;
import lombok.Data;

@Data
public class PlaylistComboSearchDTO {

  private Set<String> tags;
  private String name;
  private String description;
}
