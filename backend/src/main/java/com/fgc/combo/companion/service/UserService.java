package com.fgc.combo.companion.service;

import com.fgc.combo.companion.dto.CreateUserDto;
import com.fgc.combo.companion.dto.LoginRequest;
import com.fgc.combo.companion.dto.LoginResponse;
import com.fgc.combo.companion.dto.OAuthLoginRequestDto;
import com.fgc.combo.companion.dto.UpdateUserDto;
import com.fgc.combo.companion.dto.UpdateUserPasswordDto;
import com.fgc.combo.companion.model.User;
import com.fgc.combo.companion.model.UserVerification;
import java.util.UUID;
import org.springframework.http.ResponseEntity;

public interface UserService {
  User create(CreateUserDto userDTO);
  User updateCurrentUserProfileData(UpdateUserDto userDTO);
  User updateCurrentUserPassword(UpdateUserPasswordDto updateUserPasswordDto);

  User findById(UUID id);

  User me();

  User saveUser(User user);

  ResponseEntity<LoginResponse> login(
    LoginRequest loginRequest,
    String accessToken,
    String refreshToken
  );

  ResponseEntity<LoginResponse> oAuthlogin(OAuthLoginRequestDto loginRequest);

  ResponseEntity<LoginResponse> refresh(
    String accessToken,
    String refreshToken
  );

  User getTokenUser(String token);

  UserVerification getUserVerificationToken(UUID token);

  UserVerification createEmailVerification(String email);
  UserVerification createPasswordChangeSolicitation(String email);

  User verifyEmail(UUID token);
  User changePassword(UUID token, String newPassword);

  boolean deleteCurrentUser();
}
