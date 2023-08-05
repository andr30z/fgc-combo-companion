package com.fgc.combo.companion.dto;

import com.fgc.combo.companion.enums.ComboGameTypes;
import com.fgc.combo.companion.validation.ValueOfEnum;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.validator.constraints.Length;

@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
public class CreateComboDTO {

  @NotEmpty
  private String name;

  @ValueOfEnum(
    enumClass = ComboGameTypes.class,
    message = "must be one of: " + ComboGameTypes.Constants.ALL_GAME_TYPES
  )
  @NotNull(message = "is required")
  private String game;

  @NotEmpty
  private String combo;

  @Length(max = 255)
  private String description;

  @Length(max = 255)
  private String totalDamage;

  @Length(max = 255)
  private String character;
}
