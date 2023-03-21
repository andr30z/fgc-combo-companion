package com.fgc.combo.companion.controller;

import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.security.test.web.servlet.setup.SecurityMockMvcConfigurers.springSecurity;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fgc.combo.companion.dto.CreatePlaylistDTO;
import com.fgc.combo.companion.dto.PlaylistResponseDTO;
import com.fgc.combo.companion.model.User;
import com.fgc.combo.companion.repository.ComboRepository;
import com.fgc.combo.companion.repository.PlaylistRepository;
import com.fgc.combo.companion.repository.UserRepository;
import java.util.List;
import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
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
public class PlaylistControllerTests {

  private MockMvc mockMvc;

  @Autowired
  private WebApplicationContext applicationContext;

  @Autowired
  private PlaylistRepository playlistRepository;

  @Autowired
  private UserRepository userRepository;

  @Autowired
  private ComboRepository comboRepository;

  @Autowired
  private ObjectMapper objectMapper;

  public User setupUser() {
    User user = new User();
    user.setPassword("test123");
    user.setEmail("test@gmail.com");
    user.setName("Sidney");
    return userRepository.save(user);
  }

  @AfterAll
  void tearDown() {
    playlistRepository.deleteAll();
    comboRepository.deleteAll();
  }

  @BeforeAll
  void setUp() {
    setupUser();
  }

  @BeforeEach
  public void init() {
    this.mockMvc =
      MockMvcBuilders
        .webAppContextSetup(applicationContext)
        .apply(springSecurity())
        .build();
  }

  @Test
  @WithUserDetails("test@gmail.com")
  void itShouldCreateAPlaylist() throws Exception {
    // Given
    CreatePlaylistDTO playlist = CreatePlaylistDTO
      .builder()
      .name("TEST")
      .description("TEST DESCRIPTION")
      .build();

    MvcResult mvcResult =
      this.mockMvc.perform(
          MockMvcRequestBuilders
            .post("/api/v1/playlists")
            .content(objectMapper.writeValueAsString(playlist))
            .contentType("application/json")
        )
        .andReturn();
    System.out.println(mvcResult.getResponse().getContentAsString());

    assertThat(mvcResult.getResponse().getStatus()).isIn(List.of(200, 201));
    PlaylistResponseDTO expectedResult = objectMapper.readValue(
      mvcResult.getResponse().getContentAsString(),
      PlaylistResponseDTO.class
    );
    assertThat(playlistRepository.count()).isEqualTo(1);
    assertThat(expectedResult.getId()).isNotNull();
    assertThat(expectedResult.getName()).isEqualTo(playlist.getName());
    assertThat(comboRepository.count()).isEqualTo(0);
  }
}
