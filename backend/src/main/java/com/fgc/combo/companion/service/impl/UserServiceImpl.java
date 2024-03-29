package com.fgc.combo.companion.service.impl;

import com.fgc.combo.companion.dto.CreateUserDto;
import com.fgc.combo.companion.dto.CustomUserDetails;
import com.fgc.combo.companion.dto.LoginRequest;
import com.fgc.combo.companion.dto.LoginResponse;
import com.fgc.combo.companion.dto.OAuthLoginRequestDto;
import com.fgc.combo.companion.dto.Token;
import com.fgc.combo.companion.dto.UpdateUserDto;
import com.fgc.combo.companion.dto.UpdateUserPasswordDto;
import com.fgc.combo.companion.dto.UserDto;
import com.fgc.combo.companion.exception.BadRequestException;
import com.fgc.combo.companion.exception.EntityExistsException;
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
import java.util.Optional;
import java.util.UUID;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class UserServiceImpl implements UserService {

  @Value("${authentication.auth.oauthkey}")
  private String oAuthKey;

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
      new UserDto(user)
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

  private boolean validateUserEmailIsUnique(User user, String newEmail) {
    Optional<User> userOptional = this.userRepository.findUserByEmail(newEmail);
    if (
      userOptional.isPresent() && userOptional.get().getId() != user.getId()
    ) {
      throw new EntityExistsException(
        "User with email: " + newEmail + " already exists."
      );
    }

    return true;
  }

  private User createOAuthUser(OAuthLoginRequestDto loginRequest) {
    User oAuthUser = User
      .builder()
      .name(loginRequest.getName())
      .oAuthId(loginRequest.getOAuthId())
      .email(loginRequest.getEmail())
      .emailVerified(true)
      .build();
    oAuthUser.setAuthProvider(loginRequest.getAuthProvider());
    return userRepository.save(oAuthUser);
  }

  @Override
  @Transactional
  public User create(CreateUserDto userDTO) {
    Optional<User> userOptional =
      this.userRepository.findUserByEmail(userDTO.getEmail());
    if (userOptional.isPresent()) throw new EntityExistsException(
      "User with email: " + userDTO.getEmail() + " already exists."
    );
    User user = new User();
    BeanUtils.copyProperties(userDTO, user);

    String encodedPassword = passwordEncoder.encode(user.getPassword());
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
      new UserDto(this.findByEmail(currentUserEmail))
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
  public User findById(UUID id) {
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
    if (!loginRequest.getOAuthSecretKey().equals(oAuthKey)) {
      throw new BadRequestException("Secret key doesn't match!");
    }

    String email = loginRequest.getEmail();
    Optional<User> user = this.userRepository.findUserByEmail(email);

    User loginUser = user.isPresent()
      ? user.get()
      : this.createOAuthUser(loginRequest);

    if (
      !loginRequest.getOAuthId().equals(loginUser.getOAuthId())
    ) throw new BadRequestException(
      "You have previously logged in using this email with a different provider or you removed the provider."
    );

    return this.login(loginUser, null, null);
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
  public User updateCurrentUserProfileData(UpdateUserDto userDTO) {
    User currentUser = this.me();
    boolean isUpdatingEmail = !currentUser.getEmail().equals(userDTO.email());
    boolean hasPassword = currentUser.getPassword() != null;
    if (!hasPassword && isUpdatingEmail) {
      throw new BadRequestException(
        "You need to add a password to your account before changing your email."
      );
    }

    if (
      isUpdatingEmail && validateUserEmailIsUnique(currentUser, userDTO.email())
    ) {
      currentUser.setEmailVerified(false);
    }
    BeanUtils.copyProperties(userDTO, currentUser);
    return this.userRepository.save(currentUser);
  }

  @Override
  public User updateCurrentUserPassword(
    UpdateUserPasswordDto updateUserPasswordDto
  ) {
    User currentUser = this.me();
    System.out.println("updateUserPasswordDto: " + updateUserPasswordDto);
    if (
      !passwordEncoder.matches(
        updateUserPasswordDto.oldPassword(),
        currentUser.getPassword()
      )
    ) {
      throw new BadRequestException("Password doesn't match!");
    }

    currentUser.setPassword(
      passwordEncoder.encode(updateUserPasswordDto.newPassword())
    );
    return userRepository.save(currentUser);
  }

  @Override
  public User saveUser(User user) {
    return this.userRepository.save(user);
  }

  @Override
  public boolean deleteCurrentUser() {
    User user = this.me();
    this.userRepository.delete(user);
    return true;
  }
}
