package com.fgc.combo.companion.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@AllArgsConstructor
@Data
public class UserVerficationSuccessDto {

  private String message;

  public static UserVerficationSuccessDto success(String message) {
    return new UserVerficationSuccessDto(message);
  }
}
