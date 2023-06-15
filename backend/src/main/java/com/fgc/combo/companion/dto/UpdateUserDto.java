package com.fgc.combo.companion.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import org.hibernate.validator.constraints.Length;
import org.hibernate.validator.constraints.URL;

public record UpdateUserDto(
  @NotBlank @Email String email,
  @NotBlank String name,
  @Length(max = 750) String bio,
  @URL String twitterProfileUrl,
  @URL String instagramProfileUrl,
  @URL String YoutubeProfileUrl
) {}
