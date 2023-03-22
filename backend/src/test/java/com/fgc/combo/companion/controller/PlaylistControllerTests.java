package com.fgc.combo.companion.controller;

import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.security.test.web.servlet.setup.SecurityMockMvcConfigurers.springSecurity;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fgc.combo.companion.dto.CreatePlaylistDTO;
import com.fgc.combo.companion.dto.PlaylistResponseDTO;
import com.fgc.combo.companion.enums.ComboGameTypes;
import com.fgc.combo.companion.model.Combo;
import com.fgc.combo.companion.model.Playlist;
import com.fgc.combo.companion.model.PlaylistCombo;
import com.fgc.combo.companion.model.User;
import com.fgc.combo.companion.repository.ComboRepository;
import com.fgc.combo.companion.repository.PlaylistRepository;
import com.fgc.combo.companion.repository.UserRepository;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;
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
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;
import org.webjars.NotFoundException;

/**
 *
 * @author andr30z
 */
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

  private static User currentUser;

  public final User setupUser() {
    User user = new User();
    user.setPassword("test123");
    user.setEmail("test@gmail.com");
    user.setName("Sidney");
    currentUser = userRepository.save(user);
    return currentUser;
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
  public final void init() {
    this.mockMvc =
      MockMvcBuilders
        .webAppContextSetup(applicationContext)
        .apply(springSecurity())
        .build();
  }

  private CreatePlaylistDTO createPlaylistDTO(Set<Long> comboIds) {
    CreatePlaylistDTO createPlaylistDTO = new CreatePlaylistDTO();
    createPlaylistDTO.setName("TEST");
    createPlaylistDTO.setDescription("TEST DESCRIPTION");
    createPlaylistDTO.setCombos(comboIds);
    return createPlaylistDTO;
  }

  private ResultActions createPostMvcAction(String url, Object body)
    throws Exception {
    return this.mockMvc.perform(
        MockMvcRequestBuilders
          .post(url)
          .contentType("application/json")
          .content(objectMapper.writeValueAsString(body))
      );
  }

  private PlaylistResponseDTO toPlaylistResposeDTO(String content)
    throws Exception {
    return objectMapper.readValue(content, PlaylistResponseDTO.class);
  }

  private PlaylistResponseDTO doPlaylistCreationTest(Set<Long> comboIds)
    throws Exception {
    final long numberOfPlaylists = playlistRepository.count();
    // Given
    CreatePlaylistDTO playlist = createPlaylistDTO(comboIds);

    MvcResult mvcResult = createPostMvcAction("/api/v1/playlists", playlist)
      .andReturn();

    assertThat(mvcResult.getResponse().getStatus()).isIn(List.of(200, 201));
    PlaylistResponseDTO expectedResult = toPlaylistResposeDTO(
      mvcResult.getResponse().getContentAsString()
    );
    assertThat(playlistRepository.count()).isGreaterThan(numberOfPlaylists);
    assertThat(expectedResult.getId()).isNotNull();
    assertThat(expectedResult.getName()).isEqualTo(playlist.getName());

    return expectedResult;
  }

  @Test
  @WithUserDetails("test@gmail.com")
  void itShouldCreateAPlaylist() throws Exception {
    doPlaylistCreationTest(new HashSet<>());
    assertThat(comboRepository.count()).isEqualTo(0);
  }

  @Test
  @WithUserDetails("test@gmail.com")
  void itShouldCreateAPlaylistWithCombos() throws Exception {
    List<Combo> combos = List.of(
      Combo
        .builder()
        .owner(currentUser)
        .combo("TEST COMBO")
        .game(ComboGameTypes.GUILTY_GEAR_STRIVE)
        .name("TEST")
        .build(),
      Combo
        .builder()
        .owner(currentUser)
        .combo("TEST COMBO 2")
        .game(ComboGameTypes.TEKKEN_7)
        .name("TEST 2")
        .build()
    );
    List<Combo> createdCombos = comboRepository.saveAll(combos);
    PlaylistResponseDTO playlistResponseDTO = doPlaylistCreationTest(
      createdCombos.stream().map(Combo::getId).collect(Collectors.toSet())
    );

    Playlist createdPlaylist =
      this.playlistRepository.findById(playlistResponseDTO.getId())
        .orElseThrow(() -> new NotFoundException("Playlist not found"));

    Set<PlaylistCombo> playlistCombos = createdPlaylist.getPlaylistCombos();
    assertThat(playlistCombos.size()).isEqualTo(createdCombos.size());
    assertThat(playlistCombos.stream().map(PlaylistCombo::getPlaylist).toList())
      .allMatch(playlist -> playlist.getId().equals(playlistResponseDTO.getId())
      );
    assertThat(
      playlistCombos
        .stream()
        .map(playlistCombo -> playlistCombo.getCombo().getId())
        .toList()
    )
      .containsAll(createdCombos.stream().map(Combo::getId).toList());
  }
}
