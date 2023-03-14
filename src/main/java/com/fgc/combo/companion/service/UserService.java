package com.fgc.combo.companion.service;

import org.springframework.http.ResponseEntity;

import com.fgc.combo.companion.dto.CreateUserDTO;
import com.fgc.combo.companion.dto.LoginRequest;
import com.fgc.combo.companion.dto.LoginResponse;
import com.fgc.combo.companion.model.User;



public interface UserService {

    User create(CreateUserDTO userDTO);

    User findById(Long id);

    User me(String token);

    ResponseEntity<LoginResponse> login(LoginRequest loginRequest, String accessToken, String refreshToken);

    ResponseEntity<LoginResponse> refresh(String accessToken, String refreshToken);

    User getTokenUser(String token);
}
