package com.fgc.combo.companion.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ChangePasswordDto {

  @NotBlank
  @Size(min = 8, message = "should have at least 8 characters.")
  private String newPassword;
}
