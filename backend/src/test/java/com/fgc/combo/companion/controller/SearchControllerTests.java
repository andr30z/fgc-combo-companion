package com.fgc.combo.companion.controller;

import static org.assertj.core.api.Assertions.assertThat;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fgc.combo.companion.dto.ComboResponseDTO;
import com.fgc.combo.companion.dto.PlaylistResponseDTO;
import com.fgc.combo.companion.dto.SearchAllResourcesDto;
import com.fgc.combo.companion.enums.ComboGameTypes;
import com.fgc.combo.companion.model.Combo;
import com.fgc.combo.companion.model.Playlist;
import com.fgc.combo.companion.model.User;
import com.fgc.combo.companion.service.ComboService;
import com.fgc.combo.companion.service.PlaylistService;
import com.fgc.combo.companion.service.UserService;
import java.util.List;
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
import org.springframework.security.test.context.support.WithUserDetails;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

@SpringBootTest
@AutoConfigureMockMvc
@ExtendWith(MockitoExtension.class)
@TestInstance(Lifecycle.PER_CLASS)
public class SearchControllerTests {

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
        .name("USER owned")
        .email("random123@asdas.COM")
        .password("12345678")
        .build()
    );
    currentUser =
      userService.saveUser(
        User
          .builder()
          .name("CURRENTUSER")
          .email("currentuser@email.com")
          .password("12345678")
          .build()
      );
    comboService.saveCombo(
      Combo
        .builder()
        .combo("DF/2")
        .game(ComboGameTypes.STREET_FIGHTER_6)
        .name("OWNED BY CURRENT USER")
        .owner(currentUser)
        .build()
    );
    comboService.saveCombo(
      Combo
        .builder()
        .combo("DF/2")
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
  @DisplayName("It should get all resources by OWNED search param")
  @WithUserDetails("DEFAULTUSER@EMAIL.COM")
  void itShouldGetByOwnedSearchParam() throws Exception {
    MvcResult mvcResult =
      this.mockMvc.perform(
          MockMvcRequestBuilders
            .get("/api/v1/search?search={searchParam}", "OWNED")
            .contentType("application/json")
        )
        .andReturn();

    assertSuccessResponse(mvcResult.getResponse().getStatus());

    SearchAllResourcesDto searchAllResourcesDto = objectMapper.readValue(
      mvcResult.getResponse().getContentAsString(),
      SearchAllResourcesDto.class
    );

    assertThat(
      searchAllResourcesDto.combos().stream().map(ComboResponseDTO::getName)
    )
      .containsAll(
        List.of("OWNED BY CURRENT USER", "NOT OWNED BY CURRENT USER")
      );

    assertThat(
      searchAllResourcesDto
        .playlists()
        .stream()
        .map(PlaylistResponseDTO::getName)
    )
      .containsAll(
        List.of("OWNED BY CURRENT USER", "NOT OWNED BY CURRENT USER")
      );

    var users = searchAllResourcesDto
      .users()
      .stream()
      .map(User::getName)
      .toList();

    assertThat(users).contains("USER owned");
    assertThat(users).doesNotContain("CURRENTUSER");
  }

  @Test
  @DisplayName("It should get all resources by CURRENTUSER search param")
  @WithUserDetails("DEFAULTUSER@EMAIL.COM")
  void itShouldGetByCurrentUserSearchParam() throws Exception {
    MvcResult mvcResult =
      this.mockMvc.perform(
          MockMvcRequestBuilders
            .get("/api/v1/search?search={searchParam}", "CURRENTUSER")
            .contentType("application/json")
        )
        .andReturn();

    assertSuccessResponse(mvcResult.getResponse().getStatus());

    SearchAllResourcesDto searchAllResourcesDto = objectMapper.readValue(
      mvcResult.getResponse().getContentAsString(),
      SearchAllResourcesDto.class
    );

    assertThat(
      searchAllResourcesDto.combos().stream().map(ComboResponseDTO::getName)
    )
      .doesNotContain("OWNED BY CURRENT USER", "NOT OWNED BY CURRENT USER");

    assertThat(
      searchAllResourcesDto
        .playlists()
        .stream()
        .map(PlaylistResponseDTO::getName)
    )
      .doesNotContain("OWNED BY CURRENT USER", "NOT OWNED BY CURRENT USER");

    var users = searchAllResourcesDto
      .users()
      .stream()
      .map(User::getName)
      .toList();

    assertThat(users).doesNotContain("USER owned");
    assertThat(users).contains("CURRENTUSER");
  }

  @Test
  @DisplayName(
    "It should get all resources by CURRENTUSER search param and TEKKEN_7 type"
  )
  @WithUserDetails("DEFAULTUSER@EMAIL.COM")
  void itShouldGetBySearchParamAndGameTypes() throws Exception {
    MvcResult mvcResult =
      this.mockMvc.perform(
          MockMvcRequestBuilders
            .get(
              "/api/v1/search?search={searchParam}&games={gameType}",
              "DF/2",
              ComboGameTypes.TEKKEN_7
            )
            .contentType("application/json")
        )
        .andReturn();

    assertSuccessResponse(mvcResult.getResponse().getStatus());

    SearchAllResourcesDto searchAllResourcesDto = objectMapper.readValue(
      mvcResult.getResponse().getContentAsString(),
      SearchAllResourcesDto.class
    );

    assertThat(
      searchAllResourcesDto.combos().stream().map(ComboResponseDTO::getGame)
    )
      .containsOnly(ComboGameTypes.TEKKEN_7);
  }
}
