package com.fgc.combo.companion.dto;

import jakarta.validation.constraints.NotEmpty;
import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.validator.constraints.Length;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CreatePlaylistDto {

  @NotEmpty
  private String name;

  @Length(max = 255)
  private String description;

  @Builder.Default
  private Set<UUID> combos = new HashSet<>();
}
