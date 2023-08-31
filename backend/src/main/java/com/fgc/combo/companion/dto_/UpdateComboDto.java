package com.fgc.combo.companion.dto;

import com.fgc.combo.companion.enums.ComboGameTypes;
import com.fgc.combo.companion.validation.ValueOfEnum;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import org.hibernate.validator.constraints.Length;

@Data
public class UpdateComboDto {

  @NotEmpty
  private String name;

  @NotEmpty
  private String combo;

  @ValueOfEnum(
    enumClass = ComboGameTypes.class,
    message = "must be one of: " + ComboGameTypes.Constants.ALL_GAME_TYPES
  )
  @NotNull(message = "is required")
  private String game;

  @Length(max = 255)
  private String description;

  @Length(max = 255)
  private String totalDamage;

  @Length(max = 255)
  private String character;
}
