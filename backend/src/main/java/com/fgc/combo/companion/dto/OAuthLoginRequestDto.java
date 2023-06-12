package com.fgc.combo.companion.dto;

import com.fgc.combo.companion.enums.OAuthTypes;
import com.fgc.combo.companion.validation.ValueOfEnum;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class OAuthLoginRequestDto {

  @NotBlank
  @Email
  private String email;

  @NotBlank
  @ValueOfEnum(
    enumClass = OAuthTypes.class,
    message = "must be one of: " + OAuthTypes.Constants.ALL_OAUTH_TYPES
  )
  @NotNull(message = "is required")
  private String authProvider;

  @NotNull(message = "is required")
  private String oAuthId;

  private String name;
}
