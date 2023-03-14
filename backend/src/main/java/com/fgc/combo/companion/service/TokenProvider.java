package com.fgc.combo.companion.service;

import java.time.LocalDateTime;

import com.fgc.combo.companion.dto.Token;

public interface TokenProvider {
  Token generateAccessToken(String subject);

  Token generateRefreshToken(String subject);

  String getUsernameFromToken(String token);

  LocalDateTime getExpiryDateFromToken(String token);

  boolean validateToken(String token);
}
