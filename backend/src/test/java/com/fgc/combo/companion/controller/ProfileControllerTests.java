package com.fgc.combo.companion.controller;

import static org.assertj.core.api.Assertions.assertThat;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fgc.combo.companion.dto.ComboResponseDto;
import com.fgc.combo.companion.dto.PlaylistResponseDto;
import com.fgc.combo.companion.dto.UserDto;
import com.fgc.combo.companion.dto.UserProfile;
import com.fgc.combo.companion.enums.ComboGameTypes;
import com.fgc.combo.companion.model.Combo;
import com.fgc.combo.companion.model.Playlist;
import com.fgc.combo.companion.model.User;
import com.fgc.combo.companion.service.ComboService;
import com.fgc.combo.companion.service.PlaylistService;
import com.fgc.combo.companion.service.UserService;
import java.util.List;
import java.util.UUID;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestInstance;
import org.junit.jupiter.api.TestInstance.Lifecycle;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

@SpringBootTest
@AutoConfigureMockMvc
@ExtendWith(MockitoExtension.class)
@TestInstance(Lifecycle.PER_CLASS)
public class ProfileControllerTests {

  private MockMvc mockMvc;

  @Autowired
  private WebApplicationContext applicationContext;

  @Autowired
  private UserService userService;

  @Autowired
  private PlaylistService playlistService;

  @Autowired
  private ComboService comboService;

  @Autowired
  private ObjectMapper objectMapper;

  private static User currentUser;

  private void assertSuccessResponse(int responseStatus) {
    assertThat(responseStatus).isIn(List.of(200, 201));
  }

  @BeforeAll
  void setUp() {
    User randomUser = userService.saveUser(
      User
        .builder()
        .name("RANDOMBOY")
        .email("RANDOMUSER@EMAIL.COM")
        .password("12345678")
        .build()
    );
    currentUser =
      userService.saveUser(
        User
          .builder()
          .name("CURRENTUSER")
          .email("DEFAULTUSER@EMAIL.COM")
          .password("12345678")
          .build()
      );
    comboService.saveCombo(
      Combo
        .builder()
        .combo("")
        .game(ComboGameTypes.TEKKEN_7)
        .name("OWNED BY CURRENT USER")
        .owner(currentUser)
        .build()
    );
    comboService.saveCombo(
      Combo
        .builder()
        .combo("")
        .game(ComboGameTypes.TEKKEN_7)
        .name("NOT OWNED BY CURRENT USER")
        .owner(randomUser)
        .build()
    );

    playlistService.savePlaylist(
      Playlist
        .builder()
        .name("OWNED BY CURRENT USER")
        .owner(currentUser)
        .build()
    );

    playlistService.savePlaylist(
      Playlist
        .builder()
        .name("NOT OWNED BY CURRENT USER")
        .owner(randomUser)
        .build()
    );
  }

  @BeforeEach
  public final void init() {
    this.mockMvc =
      MockMvcBuilders.webAppContextSetup(applicationContext).build();
  }

  @Test
  @DisplayName("It should get the user profile")
  void itShouldGetUserProfile() throws Exception {
    MvcResult mvcResult =
      this.mockMvc.perform(
          MockMvcRequestBuilders
            .get("/api/v1/profile/{userId}", currentUser.getId())
            .contentType("application/json")
        )
        .andReturn();

    assertSuccessResponse(mvcResult.getResponse().getStatus());

    UserProfile userProfile = objectMapper.readValue(
      mvcResult.getResponse().getContentAsString(),
      UserProfile.class
    );

    assertThat(userProfile.user().getId()).isEqualTo(currentUser.getId());

    assertThat(
      userProfile
        .playlists()
        .getData()
        .stream()
        .map(PlaylistResponseDto::getOwner)
        .map(UserDto::getName)
        .toList()
    )
      .contains("CURRENTUSER");

    assertThat(
      userProfile
        .combos()
        .getData()
        .stream()
        .map(ComboResponseDto::getOwner)
        .map(UserDto::getName)
        .toList()
    )
      .contains("CURRENTUSER");

    assertThat(
      userProfile
        .playlists()
        .getData()
        .stream()
        .map(PlaylistResponseDto::getOwner)
        .map(UserDto::getName)
        .toList()
    )
      .doesNotContain("RANDOMBOY");

    assertThat(
      userProfile
        .combos()
        .getData()
        .stream()
        .map(ComboResponseDto::getOwner)
        .map(UserDto::getName)
        .toList()
    )
      .doesNotContain("RANDOMBOY");
  }

  @Test
  @DisplayName("It should return 404 when user does not exist")
  void itShouldReturn404WhenUserDoesNotExist() throws Exception {
    MvcResult mvcResult =
      this.mockMvc.perform(
          MockMvcRequestBuilders
            .get("/api/v1/profile/{userId}", UUID.randomUUID())
            .contentType("application/json")
        )
        .andReturn();

    assertThat(mvcResult.getResponse().getStatus()).isEqualTo(404);
  }
}
