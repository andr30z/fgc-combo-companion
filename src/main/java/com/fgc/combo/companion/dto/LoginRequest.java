package com.fgc.combo.companion.dto;

import lombok.*;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;


@Getter
@Setter
@Data
@AllArgsConstructor
public class LoginRequest {
    @NotEmpty(message = "Email address cannot be empty")
    @Email(message = "Please provide valid email address")
    private String email;

    @NotEmpty(message = "Password cannot be empty")
    private String password;
}
