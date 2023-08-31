package com.fgc.combo.companion.dto;

import jakarta.validation.constraints.Size;

public record UpdateUserPasswordDto(
   @Size(min = 8, message = "should have at least 8 characters.") String oldPassword,
    @Size(min = 8, message = "should have at least 8 characters.") String newPassword
) {}
