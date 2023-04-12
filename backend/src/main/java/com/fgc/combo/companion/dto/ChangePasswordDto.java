package com.fgc.combo.companion.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ChangePasswordDto {

  @NotBlank
  @Size(min = 8, message = "should have at least 8 characters.")
  private String newPassword;
}
