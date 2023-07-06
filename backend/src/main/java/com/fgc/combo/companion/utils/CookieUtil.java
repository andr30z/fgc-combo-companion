package com.fgc.combo.companion.utils;

import com.fgc.combo.companion.exception.BadRequestException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import java.util.Arrays;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpCookie;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseCookie.ResponseCookieBuilder;
import org.springframework.stereotype.Component;

@Component
public class CookieUtil {

  @Value("${authentication.auth.accessTokenCookieName:accessToken}")
  private String accessTokenCookieName;

  @Value("${authentication.auth.refreshTokenCookieName:refreshToken}")
  private String refreshTokenCookieName;

  @Value("${spring.profiles.active:Unknown}")
  private String activeProfile;

  private ResponseCookie buildCookieConfig(
    String cookieSourceName,
    String token,
    Long duration
  ) {
    String encryptedToken = SecurityCipher.encrypt(token);
    ResponseCookieBuilder cookieBuilder = ResponseCookie
      .from(cookieSourceName, encryptedToken)
      .maxAge(duration)
      .httpOnly(true)
      // .domain("fgc-combo-companion.xyz")
      .sameSite("None")
      .path("/");

    //comment this line if you want to test on postman/insomnia
    // cookieBuilder.secure(true);

    return cookieBuilder.build();
  }

  public String getCookieValue(HttpServletRequest req, String cookieName) {
    return Arrays
      .stream(req.getCookies())
      .filter(c -> c.getName().equals(cookieName))
      .findFirst()
      .map(Cookie::getValue)
      .orElse(null);
  }

  public String getAuthCookieValue(HttpServletRequest req) {
    String authCookie = this.getCookieValue(req, accessTokenCookieName);
    if (authCookie == null) throw new BadRequestException(
      "Token not present in request!"
    );
    return authCookie;
  }

  public HttpCookie createAccessTokenCookie(String token, Long duration) {
    return buildCookieConfig(accessTokenCookieName, token, duration);
  }

  public HttpCookie createRefreshTokenCookie(String token, Long duration) {
    return buildCookieConfig(refreshTokenCookieName, token, duration);
  }

  public HttpCookie deleteAccessTokenCookie() {
    return ResponseCookie
      .from(accessTokenCookieName, "")
      .maxAge(0)
      .httpOnly(true)
      .path("/")
      .build();
  }
}
