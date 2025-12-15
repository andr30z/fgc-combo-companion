package com.fgc.combo.companion.service;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Date;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.fgc.combo.companion.dto.Token;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;

@Service
public class TokenProvider {

  @Value("${authentication.auth.tokenSecret}")
  private String tokenSecret;

  @Value("${authentication.auth.tokenExpirationMsec}")
  private Long tokenExpirationMsec;

  @Value("${authentication.auth.refreshTokenExpirationMsec}")
  private Long refreshTokenExpirationMsec;

   
  public Token generateAccessToken(String subject) {
    Date now = new Date();
    long duration = now.getTime() + tokenExpirationMsec;
    Date expiryDate = new Date(duration);
    String token = Jwts
        .builder()
        .setSubject(subject)
        .setIssuedAt(now)
        .setExpiration(expiryDate)
        .signWith(
            Keys.hmacShaKeyFor(tokenSecret.getBytes()),
            SignatureAlgorithm.HS512)
        .compact();
    return new Token(
        Token.TokenType.ACCESS,
        token,
        duration,
        LocalDateTime.ofInstant(expiryDate.toInstant(), ZoneId.systemDefault()));
  }

   
  public Token generateRefreshToken(String subject) {
    Date now = new Date();
    long duration = now.getTime() + refreshTokenExpirationMsec;
    Date expiryDate = new Date(duration);
    String token = Jwts
        .builder()
        .setSubject(subject)
        .setIssuedAt(now)
        .setExpiration(expiryDate)
        .signWith(
            Keys.hmacShaKeyFor(tokenSecret.getBytes()),
            SignatureAlgorithm.HS512)
        .compact();
    return new Token(
        Token.TokenType.REFRESH,
        token,
        duration,
        LocalDateTime.ofInstant(expiryDate.toInstant(), ZoneId.systemDefault()));
  }

   
  public String getUsernameFromToken(String token) {
    Claims claims = Jwts
        .parserBuilder()
        .setSigningKey(Keys.hmacShaKeyFor(tokenSecret.getBytes()))
        .build()
        .parseClaimsJws(token)
        .getBody();
    return claims.getSubject();
  }

   
  public LocalDateTime getExpiryDateFromToken(String token) {
    Claims claims = Jwts
        .parserBuilder()
        .setSigningKey(Keys.hmacShaKeyFor(tokenSecret.getBytes()))
        .build()
        .parseClaimsJws(token)
        .getBody();
    return LocalDateTime.ofInstant(
        claims.getExpiration().toInstant(),
        ZoneId.systemDefault());
  }

   
  public boolean validateToken(String token) {
    if (token == null)
      return false;
    try {
      Jwts
          .parserBuilder()
          .setSigningKey(Keys.hmacShaKeyFor(tokenSecret.getBytes()))
          .build()
          .parse(token);
      return true;
    } catch (Exception ex) {
      ex.printStackTrace();
    }
    return false;
  }
}
