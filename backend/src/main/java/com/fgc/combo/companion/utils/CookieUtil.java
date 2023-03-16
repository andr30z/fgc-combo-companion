package com.fgc.combo.companion.utils;

import java.util.Arrays;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpCookie;
import org.springframework.http.ResponseCookie;
import org.springframework.stereotype.Component;

import com.fgc.combo.companion.exception.BadRequestException;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;

@Component
public class CookieUtil {
    @Value("${authentication.auth.accessTokenCookieName}")
    private String accessTokenCookieName;

    @Value("${authentication.auth.refreshTokenCookieName}")
    private String refreshTokenCookieName;

    private ResponseCookie buildCookieConfig(String cookieSourceName, String token,
            Long duration) {
        String encryptedToken = SecurityCipher.encrypt(token);
        return ResponseCookie.from(cookieSourceName, encryptedToken)
                .maxAge(duration)
                .httpOnly(true)
                .sameSite("None")
                // .secure(true)
                .path("/")
                .build();
    }

    public String getCookieValue(HttpServletRequest req, String cookieName) {
        return Arrays.stream(req.getCookies())
                .filter(c -> c.getName().equals(cookieName))
                .findFirst()
                .map(Cookie::getValue)
                .orElse(null);
    }

    public String getAuthCookieValue(HttpServletRequest req) {
        String authCookie = this.getCookieValue(req, accessTokenCookieName);
        if (authCookie == null)
            throw new BadRequestException("Token not present in request!");
        return authCookie;
    }

    public HttpCookie createAccessTokenCookie(String token, Long duration) {
        return buildCookieConfig(accessTokenCookieName, token, duration);
    }

    public HttpCookie createRefreshTokenCookie(String token, Long duration) {
        return buildCookieConfig(refreshTokenCookieName, token, duration);
    }

    public HttpCookie deleteAccessTokenCookie() {
        return ResponseCookie.from(accessTokenCookieName, "").maxAge(0).httpOnly(true).path("/").build();
    }

}