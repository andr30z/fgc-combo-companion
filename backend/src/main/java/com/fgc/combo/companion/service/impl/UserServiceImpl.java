package com.fgc.combo.companion.service.impl;

import com.fgc.combo.companion.dto.CreateUserDTO;
import com.fgc.combo.companion.dto.CustomUserDetails;
import com.fgc.combo.companion.dto.LoginRequest;
import com.fgc.combo.companion.dto.LoginResponse;
import com.fgc.combo.companion.dto.OAuthLoginRequestDto;
import com.fgc.combo.companion.dto.Token;
import com.fgc.combo.companion.dto.UpdateUserDto;
import com.fgc.combo.companion.exception.BadRequestException;
import com.fgc.combo.companion.exception.EntityExistsException;
import com.fgc.combo.companion.exception.OperationNotAllowedException;
import com.fgc.combo.companion.exception.ResourceNotFoundException;
import com.fgc.combo.companion.model.User;
import com.fgc.combo.companion.model.UserVerification;
import com.fgc.combo.companion.repository.UserRepository;
import com.fgc.combo.companion.service.TokenProvider;
import com.fgc.combo.companion.service.UserService;
import com.fgc.combo.companion.service.UserVerificationService;
import com.fgc.combo.companion.utils.CookieUtil;
import com.fgc.combo.companion.utils.SecurityCipher;
import jakarta.transaction.Transactional;
import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;
import java.security.SecureRandom;
import java.util.Optional;
import java.util.UUID;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.BeanUtils;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class UserServiceImpl implements UserService {

  private static final int PASSWORD_STRENGTH = 10;

  private final UserRepository userRepository;

  private final TokenProvider tokenProvider;
  private final PasswordEncoder passwordEncoder;
  private final CookieUtil cookieUtil;

  private final UserVerificationService userVerificationService;

  public UserServiceImpl(
    UserRepository userRepository,
    TokenProvider tokenProvider,
    CookieUtil cookieUtil,
    PasswordEncoder passwordEncoder,
    UserVerificationService userVerificationService
  ) {
    this.userRepository = userRepository;
    this.tokenProvider = tokenProvider;
    this.cookieUtil = cookieUtil;
    this.passwordEncoder = passwordEncoder;
    this.userVerificationService = userVerificationService;
  }

  private ResponseEntity<LoginResponse> login(
    User user,
    String encryptedAccessToken,
    String encryptedRefreshToken
  ) {
    String accessToken = SecurityCipher.decrypt(encryptedAccessToken);
    String refreshToken = SecurityCipher.decrypt(encryptedRefreshToken);
    boolean accessTokenValid = tokenProvider.validateToken(accessToken);
    boolean refreshTokenValid = tokenProvider.validateToken(refreshToken);

    HttpHeaders responseHeaders = new HttpHeaders();
    Token newAccessToken;
    Token newRefreshToken;
    if (!accessTokenValid && !refreshTokenValid) {
      newAccessToken = tokenProvider.generateAccessToken(user.getEmail());
      newRefreshToken = tokenProvider.generateRefreshToken(user.getEmail());
      addAccessTokenCookie(responseHeaders, newAccessToken);
      addRefreshTokenCookie(responseHeaders, newRefreshToken);
    }

    if (!accessTokenValid && refreshTokenValid) {
      newAccessToken = tokenProvider.generateAccessToken(user.getEmail());
      addAccessTokenCookie(responseHeaders, newAccessToken);
    }

    if (accessTokenValid && refreshTokenValid) {
      newAccessToken = tokenProvider.generateAccessToken(user.getEmail());
      newRefreshToken = tokenProvider.generateRefreshToken(user.getEmail());
      addAccessTokenCookie(responseHeaders, newAccessToken);
      addRefreshTokenCookie(responseHeaders, newRefreshToken);
    }

    LoginResponse loginResponse = new LoginResponse(
      LoginResponse.SuccessFailure.SUCCESS,
      "Auth successful. Tokens are created in cookies.",
      user
    );
    return ResponseEntity.ok().headers(responseHeaders).body(loginResponse);
  }

  private User findByEmail(String email) {
    return userRepository
      .findUserByEmail(email)
      .orElseThrow(() ->
        new ResourceNotFoundException("User not found" + " with email " + email)
      );
  }

  private void addAccessTokenCookie(HttpHeaders httpHeaders, Token token) {
    httpHeaders.add(
      HttpHeaders.SET_COOKIE,
      cookieUtil
        .createAccessTokenCookie(token.getTokenValue(), token.getDuration())
        .toString()
    );
  }

  private void addRefreshTokenCookie(HttpHeaders httpHeaders, Token token) {
    httpHeaders.add(
      HttpHeaders.SET_COOKIE,
      cookieUtil
        .createRefreshTokenCookie(token.getTokenValue(), token.getDuration())
        .toString()
    );
  }

  @Override
  @Transactional
  public User create(CreateUserDTO userDTO) {
    Optional<User> userOptional =
      this.userRepository.findUserByEmail(userDTO.getEmail());
    if (userOptional.isPresent()) throw new EntityExistsException(
      "User with email: " + userDTO.getEmail() + " already exists."
    );
    User user = new User();
    BeanUtils.copyProperties(userDTO, user);
    BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder(
      PASSWORD_STRENGTH,
      new SecureRandom()
    );
    String encodedPassword = bCryptPasswordEncoder.encode(user.getPassword());
    user.setPassword(encodedPassword);
    user.setEmailVerified(false);

    log.info("Creating user with email {}", userDTO.getEmail());
    User createdUser = this.userRepository.save(user);

    this.userVerificationService.sendVerificationEmail(createdUser);
    return createdUser;
  }

  @Override
  public ResponseEntity<LoginResponse> login(
    LoginRequest loginRequest,
    String encryptedAccessToken,
    String encryptedRefreshToken
  ) {
    String email = loginRequest.getEmail();
    User user = this.findByEmail(email);
    if (
      !passwordEncoder.matches(loginRequest.getPassword(), user.getPassword())
    ) throw new BadRequestException("Password doesn't match!");

    return login(user, encryptedAccessToken, encryptedRefreshToken);
  }

  @Override
  public ResponseEntity<LoginResponse> refresh(
    String encryptedAccessToken,
    String encryptedRefreshToken
  ) {
    String refreshToken = SecurityCipher.decrypt(encryptedRefreshToken);
    var refreshTokenValid = tokenProvider.validateToken(refreshToken);
    if (!refreshTokenValid) throw new BadRequestException(
      "Refresh Token is invalid!"
    );

    String currentUserEmail = tokenProvider.getUsernameFromToken(refreshToken);
    Token newAccessToken = tokenProvider.generateAccessToken(currentUserEmail);
    HttpHeaders responseHeaders = new HttpHeaders();
    responseHeaders.add(
      HttpHeaders.SET_COOKIE,
      cookieUtil
        .createAccessTokenCookie(
          newAccessToken.getTokenValue(),
          newAccessToken.getDuration()
        )
        .toString()
    );

    LoginResponse loginResponse = new LoginResponse(
      LoginResponse.SuccessFailure.SUCCESS,
      "Auth successful. Tokens are created in cookies.",
      this.findByEmail(currentUserEmail)
    );
    return ResponseEntity.ok().headers(responseHeaders).body(loginResponse);
  }

  @Override
  public User getTokenUser(String encryptedToken) {
    String token = SecurityCipher.decrypt(
      URLDecoder.decode(encryptedToken, StandardCharsets.UTF_8),
      true
    );

    boolean isTokenValid = this.tokenProvider.validateToken(token);
    if (!isTokenValid) throw new BadRequestException("Token invalid!");
    var tokenUsername = this.tokenProvider.getUsernameFromToken(token);
    return this.userRepository.findUserByEmail(tokenUsername)
      .orElseThrow(() -> new ResourceNotFoundException("User not found!"));
  }

  @Override
  public User findById(Long id) {
    return this.userRepository.findById(id)
      .orElseThrow(() -> new ResourceNotFoundException("User not found."));
  }

  @Override
  public User me() {
    CustomUserDetails currentUser = (CustomUserDetails) SecurityContextHolder
      .getContext()
      .getAuthentication()
      .getPrincipal();
    return currentUser.getUser();
  }

  @Transactional
  @Override
  public ResponseEntity<LoginResponse> oAuthlogin(
    OAuthLoginRequestDto loginRequest
  ) {
    String email = loginRequest.getEmail();
    User user =
      this.userRepository.findUserByEmail(email)
        .orElseGet(() -> {
          User oAuthUser = User
            .builder()
            .email(email)
            .name(loginRequest.getName())
            .emailVerified(true)
            .build();
          oAuthUser.setAuthProvider(loginRequest.getAuthProvider());
          return this.userRepository.save(oAuthUser);
        });

    return this.login(user, null, null);
  }

  @Override
  public UserVerification createEmailVerification(String email) {
    return this.userVerificationService.sendVerificationEmail(
        this.findByEmail(email)
      );
  }

  @Override
  public UserVerification createPasswordChangeSolicitation(String email) {
    return this.userVerificationService.sendChangePasswordEmail(
        this.findByEmail(email)
      );
  }

  @Override
  public User verifyEmail(UUID token) {
    return this.userVerificationService.verifyEmail(token);
  }

  @Override
  public User changePassword(UUID token, String newPassword) {
    return this.userVerificationService.changePassword(token, newPassword);
  }

  @Override
  public UserVerification getUserVerificationToken(UUID token) {
    return this.userVerificationService.getUserVerificationByToken(token);
  }

  @Override
  public User updateEmailAndName(Long id, UpdateUserDto userDTO) {
    User currentUser = this.me();
    if (currentUser.getId() != id) throw new OperationNotAllowedException(
      "You are not the owner of this account!"
    );

    BeanUtils.copyProperties(userDTO, currentUser);
    return this.userRepository.save(currentUser);
  }
}
