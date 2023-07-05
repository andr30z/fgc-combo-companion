package com.fgc.combo.companion.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class LoginResponse {

  private SuccessFailure status;
  private String message;

  private UserDto user;

  public enum SuccessFailure {
    SUCCESS,
    FAILURE,
  }
}
