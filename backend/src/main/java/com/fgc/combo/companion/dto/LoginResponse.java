package com.fgc.combo.companion.dto;

import com.fgc.combo.companion.model.User;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class LoginResponse {

  private SuccessFailure status;
  private String message;

  private User user;

  public enum SuccessFailure {
    SUCCESS,
    FAILURE,
  }
}
