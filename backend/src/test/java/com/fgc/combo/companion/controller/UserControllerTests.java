package com.fgc.combo.companion.controller;

import static org.assertj.core.api.Assertions.assertThat;

import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestInstance;
import org.junit.jupiter.api.TestInstance.Lifecycle;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureWebMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.mock.web.MockHttpServletResponse;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fgc.combo.companion.dto.CreateUserDto;
import com.fgc.combo.companion.dto.LoginRequest;
import com.fgc.combo.companion.dto.LoginResponse;
import com.fgc.combo.companion.dto.OAuthLoginRequestDto;
import com.fgc.combo.companion.enums.OAuthTypes;
import com.fgc.combo.companion.model.User;
import com.fgc.combo.companion.repository.UserRepository;
import com.fgc.combo.companion.service.UserService;

import jakarta.servlet.http.Cookie;
import lombok.extern.slf4j.Slf4j;

@SpringBootTest
@AutoConfigureWebMvc
@Slf4j
@ExtendWith(MockitoExtension.class)
@TestInstance(Lifecycle.PER_CLASS)
public class UserControllerTests {

  private MockMvc mockMvc;

  @Autowired
  private WebApplicationContext applicationContext;

  @Autowired
  private UserService userService;

  @Autowired
  private UserRepository userRepository;

  @Autowired
  private ObjectMapper objectMapper;

  private void assertSuccessResponse(int responseStatus) {
    assertThat(responseStatus).isIn(List.of(200, 201));
  }

  @BeforeEach
  public final void init() {
    this.mockMvc = MockMvcBuilders.webAppContextSetup(applicationContext).build();
  }

  private MockHttpServletResponse login(String url, Object body, User user) throws Exception {

    MvcResult mvcResult = this.mockMvc.perform(
        MockMvcRequestBuilders
            .post(url)
            .contentType("application/json")
            .content(
                objectMapper.writeValueAsString(body)))
        .andReturn();

    var mvcResponse = mvcResult.getResponse();

    assertSuccessResponse(mvcResponse.getStatus());

    LoginResponse loginResponse = objectMapper.readValue(
        mvcResponse.getContentAsString(),
        LoginResponse.class);

    Cookie accessToken = mvcResponse.getCookie("accessToken");
    if (user != null) {
      assertThat(loginResponse.getUser().getId()).isEqualTo(user.getId());
    }
    assertThat(accessToken).isNotNull();
    assertThat(accessToken.getDomain()).isEqualTo("fgc-combo-companion.xyz");
    return mvcResponse;
  }

  @Test
  @DisplayName("It should login with email and password")
  void itShouldLoginSuccessfully() throws Exception {
    var user = this.userService.create(
        CreateUserDto.builder()
            .email("randomuser1@gmail.com")
            .password("12345678")
            .name("USER")
            .build());
    this.login("/api/v1/users/login", new LoginRequest(user.getEmail(), "12345678"), user);
  }

  @Test
  @DisplayName("It should login and create user if don't exist through OAuth")
  void itShouldLoginAndCreateTheUserSuccessfullyThroughOAuth() throws Exception {

    assertThat(userRepository.findUserByEmail("randomuser2@gmail.com")).isEmpty();
    MockHttpServletResponse response = this.login("/api/v1/users/oauth/login",
        new OAuthLoginRequestDto("randomuser2@gmail.com", OAuthTypes.GOOGLE.name(), "testname", "testauthkey", "123"),
        null);

    LoginResponse loginResponse = objectMapper.readValue(
        response.getContentAsString(),
        LoginResponse.class);

    Optional<User> user = userRepository.findUserByEmail("randomuser2@gmail.com");

    assertThat(user).isNotEmpty();
    assertThat(user.get().getId()).isEqualTo(loginResponse.getUser().getId());

  }

  @Test
  @DisplayName("It should login through OAuth")
  void itShouldLoginThroughOAuth() throws Exception {

    var user = this.userService.saveUser(User.builder().authProvider(OAuthTypes.GOOGLE).oAuthId("123456")
        .email("testemail@gmail.com").emailVerified(true)
        .name("test").build());

    MockHttpServletResponse response = this.login("/api/v1/users/oauth/login",
        new OAuthLoginRequestDto(user.getEmail(), OAuthTypes.GOOGLE.name(), user.getOAuthId(), "testauthkey",
            user.getName()),
        null);

    LoginResponse loginResponse = objectMapper.readValue(
        response.getContentAsString(),
        LoginResponse.class);

    assertThat(user.getId()).isEqualTo(loginResponse.getUser().getId());

  }

}
