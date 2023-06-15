package com.fgc.combo.companion.controller;

import com.fgc.combo.companion.dto.ChangePasswordDto;
import com.fgc.combo.companion.dto.CreateUserDTO;
import com.fgc.combo.companion.dto.LoginRequest;
import com.fgc.combo.companion.dto.LoginResponse;
import com.fgc.combo.companion.dto.OAuthLoginRequestDto;
import com.fgc.combo.companion.dto.UpdateUserDto;
import com.fgc.combo.companion.dto.UpdateUserPasswordDto;
import com.fgc.combo.companion.dto.UserVerficationSuccessDto;
import com.fgc.combo.companion.dto.UserVerificationDto;
import com.fgc.combo.companion.mapper.UserVerificationMapper;
import com.fgc.combo.companion.model.User;
import com.fgc.combo.companion.service.UserService;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import java.util.UUID;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/users")
public class UserController {

  private final UserService usersService;
  private final UserVerificationMapper userVerificationMapper;

  public UserController(
    UserService usersService,
    UserVerificationMapper userVerificationMapper
  ) {
    this.usersService = usersService;
    this.userVerificationMapper = userVerificationMapper;
  }

  @PostMapping
  public User create(@RequestBody @Validated CreateUserDTO createUserDTO) {
    return this.usersService.create(createUserDTO);
  }

  @PostMapping(
    value = "/login",
    consumes = MediaType.APPLICATION_JSON_VALUE,
    produces = MediaType.APPLICATION_JSON_VALUE
  )
  public ResponseEntity<LoginResponse> login(
    @CookieValue(name = "accessToken", required = false) String accessToken,
    @CookieValue(name = "refreshToken", required = false) String refreshToken,
    @RequestBody @Validated LoginRequest loginRequest
  ) {
    return usersService.login(loginRequest, accessToken, refreshToken);
  }

  @PostMapping(
    value = "/oauth/login",
    consumes = MediaType.APPLICATION_JSON_VALUE,
    produces = MediaType.APPLICATION_JSON_VALUE
  )
  public ResponseEntity<LoginResponse> oAuthLogin(
    @RequestBody @Validated OAuthLoginRequestDto loginRequest
  ) {
    return usersService.oAuthlogin(loginRequest);
  }

  @PostMapping(value = "/refresh", produces = MediaType.APPLICATION_JSON_VALUE)
  public ResponseEntity<LoginResponse> refreshToken(
    @CookieValue(name = "accessToken", required = false) String accessToken,
    @CookieValue(name = "refreshToken", required = false) String refreshToken
  ) {
    return usersService.refresh(accessToken, refreshToken);
  }

  @GetMapping("/me")
  public User me() {
    return this.usersService.me();
  }

  @GetMapping("/{id}")
  public User findById(@PathVariable Long id) {
    return usersService.findById(id);
  }

  @PutMapping("/me")
  public User updateEmailAndName(@RequestBody @Validated UpdateUserDto updateUserDto) {
    return usersService.updateCurrentUserEmailAndName(updateUserDto);
  }

  @PatchMapping("/me/password")
  public User updateUserPassword(UpdateUserPasswordDto updateUserPasswordDto) {
    return usersService.updateCurrentUserPassword(updateUserPasswordDto);
  }

  @PostMapping("/email-verification-solicitation")
  public UserVerificationDto createEmailVerification(
    @RequestParam String email
  ) {
    return this.userVerificationMapper.toDto(
        this.usersService.createEmailVerification(email)
      );
  }

  @PostMapping("/password-change-solicitation")
  public UserVerificationDto createPasswordChange(
    @RequestParam @NotBlank @Email String email
  ) {
    return this.userVerificationMapper.toDto(
        this.usersService.createPasswordChangeSolicitation(email)
      );
  }

  @PatchMapping("/password-change")
  public UserVerficationSuccessDto changePassword(
    @RequestParam UUID token,
    @RequestBody @Validated ChangePasswordDto changePasswordDto
  ) {
    this.usersService.changePassword(token, changePasswordDto.getNewPassword());
    return UserVerficationSuccessDto.success("Password changed successfully");
  }

  @PatchMapping("/email-verification")
  public UserVerficationSuccessDto verifyUserEmail(@RequestParam UUID token) {
    this.usersService.verifyEmail(token);

    return UserVerficationSuccessDto.success("Email verified successfully");
  }

  @GetMapping("/verification/{token}")
  public UserVerificationDto getVerificationToken(@PathVariable UUID token) {
    return this.userVerificationMapper.toDto(
        this.usersService.getUserVerificationToken(token)
      );
  }
}
