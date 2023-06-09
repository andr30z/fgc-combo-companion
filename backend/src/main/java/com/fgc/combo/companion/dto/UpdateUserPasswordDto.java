package com.fgc.combo.companion.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;

public record UpdateUserPasswordDto(
  @NotBlank @Min(8) String oldPassword,
  @NotBlank @Min(8) String newPassword
) {}
