package com.fgc.combo.companion.dto;

import java.util.List;

import org.hibernate.validator.constraints.Length;

import jakarta.validation.constraints.NotEmpty;
import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class ReorderCombosDto {

  @NotEmpty
  @Length(min = 2)
  private List<Long> newPlaylistCombosOrdenation;
}
