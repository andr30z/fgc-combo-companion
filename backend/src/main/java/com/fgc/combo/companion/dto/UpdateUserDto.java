package com.fgc.combo.companion.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public record UpdateUserDto(
  @NotBlank @Email String email,
  @NotBlank String name
) {}
