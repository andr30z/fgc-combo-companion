package com.fgc.combo.companion.controller;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.springframework.security.test.web.servlet.setup.SecurityMockMvcConfigurers.springSecurity;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fgc.combo.companion.dto.AddCombosToPlaylistDTO;
import com.fgc.combo.companion.dto.CompletePlaylistDTO;
import com.fgc.combo.companion.dto.CreateComboDTO;
import com.fgc.combo.companion.dto.CreatePlaylistDTO;
import com.fgc.combo.companion.dto.PaginationResponse;
import com.fgc.combo.companion.dto.PlaylistComboResponseDTO;
import com.fgc.combo.companion.dto.PlaylistResponseDTO;
import com.fgc.combo.companion.dto.ReorderCombosDto;
import com.fgc.combo.companion.dto.UpdatePlaylistDTO;
import com.fgc.combo.companion.enums.ComboGameTypes;
import com.fgc.combo.companion.enums.Tekken7Characters;
import com.fgc.combo.companion.model.Combo;
import com.fgc.combo.companion.model.Playlist;
import com.fgc.combo.companion.model.PlaylistCombo;
import com.fgc.combo.companion.model.User;
import com.fgc.combo.companion.repository.ComboRepository;
import com.fgc.combo.companion.repository.PlaylistComboRepository;
import com.fgc.combo.companion.repository.PlaylistRepository;
import com.fgc.combo.companion.repository.UserRepository;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;
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
import org.springframework.http.HttpStatus;
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
  private PlaylistComboRepository playlistComboRepository;

  @Autowired
  private ObjectMapper objectMapper;

  private static User currentUser;
  private static Combo defaultCombo;

  public final User setupUser(String email) {
    User user = new User();
    user.setPassword("test123");
    user.setEmail(email);
    user.setName("Sidney");
    return userRepository.save(user);
  }

  private void setupCombo() {
    Combo combo = new Combo();
    combo.setName("Combo 1");
    combo.setCombo("Test Combo");
    combo.setOwner(currentUser);
    combo.setGame(ComboGameTypes.TEKKEN_7.name());

    defaultCombo = comboRepository.save(combo);
  }

  private Playlist createComboAndAddToPlaylist(
    Playlist playlist,
    Combo combo,
    int position
  ) {
    PlaylistCombo playlistCombo = playlistComboRepository.save(
      PlaylistCombo
        .builder()
        .playlist(playlist)
        .position(position)
        .combo(combo)
        .build()
    );
    playlist.getPlaylistCombos().add(playlistCombo);
    playlist = playlistRepository.save(playlist);

    return playlist;
  }

  @BeforeAll
  void setUp() {
    currentUser = setupUser("test@gmail.com");
    setupUser("secondtestmail@gmail.com");
    setupCombo();
  }

  @BeforeEach
  public final void init() {
    this.mockMvc =
      MockMvcBuilders
        .webAppContextSetup(applicationContext)
        .apply(springSecurity())
        .build();
  }

  private CreatePlaylistDTO createPlaylistDTO(Set<UUID> comboIds) {
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

  private void assertSuccessResponse(int responseStatus) {
    assertThat(responseStatus).isIn(List.of(200, 201));
  }

  private <T> T toPlaylistResposeDTO(String content, Class<T> clazz)
    throws Exception {
    return objectMapper.readValue(content, clazz);
  }

  private Playlist createEmptyPlaylist(User owner, String name) {
    Playlist playlist = new Playlist();
    playlist.setName(name);
    playlist.setDescription("TEST DESCRIPTION");
    playlist.setOwner(owner);
    return playlistRepository.save(playlist);
  }

  private PlaylistResponseDTO doPlaylistCreationTest(Set<UUID> comboIds)
    throws Exception {
    final long numberOfPlaylists = playlistRepository.count();
    // Given
    CreatePlaylistDTO playlist = createPlaylistDTO(comboIds);

    MvcResult mvcResult = createPostMvcAction("/api/v1/playlists", playlist)
      .andReturn();

    assertSuccessResponse(mvcResult.getResponse().getStatus());
    PlaylistResponseDTO expectedResult = toPlaylistResposeDTO(
      mvcResult.getResponse().getContentAsString(),
      PlaylistResponseDTO.class
    );
    assertThat(playlistRepository.count()).isGreaterThan(numberOfPlaylists);
    assertThat(expectedResult.getId()).isNotNull();
    assertThat(expectedResult.getName()).isEqualTo(playlist.getName());

    return expectedResult;
  }

  private PaginationResponse<PlaylistResponseDTO> setupSearchPlaylist(
    String url
  ) throws Exception {
    MvcResult mvcResult =
      this.mockMvc.perform(
          MockMvcRequestBuilders.get(url).contentType("application/json")
        )
        .andReturn();

    assertSuccessResponse(mvcResult.getResponse().getStatus());
    PaginationResponse<PlaylistResponseDTO> response = objectMapper.readValue(
      mvcResult.getResponse().getContentAsString(),
      new TypeReference<PaginationResponse<PlaylistResponseDTO>>() {}
    );
    return response;
  }

  @Test
  @WithUserDetails("test@gmail.com")
  void itShouldCreateAPlaylist() throws Exception {
    PlaylistResponseDTO playlistResponseDTO = doPlaylistCreationTest(
      new HashSet<>()
    );
    Playlist createdPlaylist =
      this.playlistRepository.findById(playlistResponseDTO.getId())
        .orElseThrow(() -> new NotFoundException("Playlist not found"));

    assertThat(createdPlaylist.getPlaylistCombos().size()).isEqualTo(0);
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

  @Test
  @WithUserDetails("test@gmail.com")
  void itShouldGetPlaylistDetails() throws Exception {
    PlaylistResponseDTO playlistResponseDTO = doPlaylistCreationTest(
      new HashSet<>()
    );
    MvcResult mvcResult =
      this.mockMvc.perform(
          MockMvcRequestBuilders
            .get("/api/v1/playlists/{playlistId}", playlistResponseDTO.getId())
            .contentType("application/json")
        )
        .andReturn();
    assertSuccessResponse(mvcResult.getResponse().getStatus());
    CompletePlaylistDTO playlist = toPlaylistResposeDTO(
      mvcResult.getResponse().getContentAsString(),
      CompletePlaylistDTO.class
    );

    assertThat(playlist.getId()).isEqualTo(playlistResponseDTO.getId());
    assertThat(playlist.getPlaylistCombos().stream().toList())
      .asList()
      .isEmpty();
    assertThat(playlist.getTags().stream().toList()).asList().isEmpty();
  }

  @Test
  @WithUserDetails("test@gmail.com")
  void itShouldAddCombosToPlaylist() throws Exception {
    PlaylistResponseDTO playlistResponseDTO = doPlaylistCreationTest(
      new HashSet<>()
    );

    MvcResult mvcResult = createPostMvcAction(
      "/api/v1/playlists/{playlistId}/combos".replace(
          "{playlistId}",
          playlistResponseDTO.getId().toString()
        ),
      AddCombosToPlaylistDTO
        .builder()
        .combos(Set.of(defaultCombo.getId()))
        .build()
    )
      .andReturn();
    System.out.println(
      "------------------------------------------||---------------------------------------"
    );
    assertSuccessResponse(mvcResult.getResponse().getStatus());

    CompletePlaylistDTO playlist = toPlaylistResposeDTO(
      mvcResult.getResponse().getContentAsString(),
      CompletePlaylistDTO.class
    );

    assertThat(
      playlist
        .getPlaylistCombos()
        .stream()
        .map(playlistCombo -> playlistCombo.getCombo().getId())
        .toList()
    )
      .contains(defaultCombo.getId());
  }

  @Test
  @WithUserDetails("secondtestmail@gmail.com")
  void itShouldNotAddComboToPlaylistWhenUserDoNotOwnPlaylist()
    throws Exception {
    Playlist playlist = createEmptyPlaylist(currentUser, "TEST");
    MvcResult mvcResult = createPostMvcAction(
      "/api/v1/playlists/{playlistId}/combos".replace(
          "{playlistId}",
          playlist.getId().toString()
        ),
      AddCombosToPlaylistDTO
        .builder()
        .combos(Set.of(defaultCombo.getId()))
        .build()
    )
      .andReturn();
    assertThat(mvcResult.getResponse().getStatus())
      .isEqualTo(HttpStatus.FORBIDDEN.value());
  }

  @Test
  @WithUserDetails("test@gmail.com")
  void itShouldRemoveCombosFromPlaylist() throws Exception {
    Playlist playlist = createEmptyPlaylist(currentUser, "TEST");

    PlaylistCombo playlistCombo = playlistComboRepository.save(
      PlaylistCombo
        .builder()
        .playlist(playlist)
        .position(1)
        .combo(defaultCombo)
        .build()
    );
    playlist.getPlaylistCombos().add(playlistCombo);
    playlist = playlistRepository.save(playlist);

    MvcResult mvcResult =
      this.mockMvc.perform(
          MockMvcRequestBuilders
            .delete(
              "/api/v1/playlists/{playlistId}/combos?playlistComboId={playlistComboId}",
              playlist.getId(),
              playlistCombo.getId()
            )
            .contentType("application/json")
        )
        .andReturn();

    assertSuccessResponse(mvcResult.getResponse().getStatus());
    boolean result = mvcResult
      .getResponse()
      .getContentAsString()
      .contains("true");
    assertThat(result).isTrue();
    assertThat(
      playlistComboRepository.findById(playlistCombo.getId()).isPresent()
    )
      .isFalse();
  }

  @Test
  @WithUserDetails("secondtestmail@gmail.com")
  void itShouldNotRemoveCombosFromPlaylistWhenUserDoNotOwnPlaylist()
    throws Exception {
    Playlist playlist = createEmptyPlaylist(currentUser, "TEST");

    MvcResult mvcResult =
      this.mockMvc.perform(
          MockMvcRequestBuilders
            .delete(
              "/api/v1/playlists/{playlistId}/combos?playlistComboId={playlistComboId}",
              playlist.getId(),
              playlist.getId()
            )
            .contentType("application/json")
        )
        .andReturn();
    assertThat(mvcResult.getResponse().getStatus())
      .isEqualTo(HttpStatus.FORBIDDEN.value());
  }

  @Test
  @WithUserDetails("test@gmail.com")
  void itShouldDeleteAPlaylist() throws Exception {
    Playlist playlist = createEmptyPlaylist(currentUser, "TEST");
    MvcResult mvcResult =
      this.mockMvc.perform(
          MockMvcRequestBuilders
            .delete("/api/v1/playlists/{id}", playlist.getId())
            .contentType("application/json")
        )
        .andReturn();
    assertSuccessResponse(mvcResult.getResponse().getStatus());
    assertThat(playlistRepository.findById(playlist.getId()).isPresent())
      .isFalse();
  }

  @Test
  @WithUserDetails("secondtestmail@gmail.com")
  void itShouldNotDeleteAPlaylistWhenUserDoNotOwnPlaylist() throws Exception {
    Playlist playlist = createEmptyPlaylist(currentUser, "TEST");
    MvcResult mvcResult =
      this.mockMvc.perform(
          MockMvcRequestBuilders
            .delete("/api/v1/playlists/{id}", playlist.getId())
            .contentType("application/json")
        )
        .andReturn();
    assertThat(mvcResult.getResponse().getStatus())
      .isEqualTo(HttpStatus.FORBIDDEN.value());
  }

  @Test
  @WithUserDetails("test@gmail.com")
  void itShouldUpdatePlaylist() throws Exception {
    PlaylistResponseDTO playlistResponseDTO = doPlaylistCreationTest(
      new HashSet<>()
    );

    MvcResult mvcResult =
      this.mockMvc.perform(
          MockMvcRequestBuilders
            .put("/api/v1/playlists/{id}", playlistResponseDTO.getId())
            .contentType("application/json")
            .content(
              objectMapper.writeValueAsString(
                UpdatePlaylistDTO
                  .builder()
                  .name("Updated name")
                  .description("Updated description")
                  .build()
              )
            )
        )
        .andReturn();
    assertSuccessResponse(mvcResult.getResponse().getStatus());
    PlaylistResponseDTO updatedPlaylistResponseDTO = toPlaylistResposeDTO(
      mvcResult.getResponse().getContentAsString(),
      PlaylistResponseDTO.class
    );

    Playlist updatedPlaylist = playlistRepository
      .findById(playlistResponseDTO.getId())
      .orElse(Playlist.builder().build());

    assertThat(updatedPlaylist.getName())
      .isEqualTo(updatedPlaylistResponseDTO.getName());

    assertThat(updatedPlaylist.getDescription())
      .isEqualTo(updatedPlaylistResponseDTO.getDescription());
  }

  @Test
  @WithUserDetails("test@gmail.com")
  void itShouldGetAllPlaylistsBySearchParameters() throws Exception {
    playlistRepository.deleteAll();
    Playlist playlist = createEmptyPlaylist(currentUser, "playlist");
    Playlist secondPlaylist = createEmptyPlaylist(currentUser, "playlist 2");
    Playlist thirdPlaylist = createEmptyPlaylist(currentUser, "COOL test");

    PaginationResponse<PlaylistResponseDTO> response = setupSearchPlaylist(
      "/api/v1/playlists/me?name={name}".replace("{name}", playlist.getName())
    );
    List<String> responsePlaylistNames = response
      .getData()
      .stream()
      .map(PlaylistResponseDTO::getName)
      .toList();

    assertThat(responsePlaylistNames)
      .contains(playlist.getName(), secondPlaylist.getName());

    assertThat(responsePlaylistNames).doesNotContain(thirdPlaylist.getName());
  }

  @Test
  @WithUserDetails("test@gmail.com")
  void itShouldGetAllPlaylistsWhenNoSearchParameterIsPassed() throws Exception {
    playlistRepository.deleteAll();
    Playlist playlist = createEmptyPlaylist(currentUser, "TEST");
    Playlist secondPlaylist = createEmptyPlaylist(currentUser, "tESt123");
    Playlist thirdPlaylist = createEmptyPlaylist(currentUser, "COOL PLAYLIST");

    PaginationResponse<PlaylistResponseDTO> response = setupSearchPlaylist(
      "/api/v1/playlists/me"
    );
    List<String> responsePlaylistNames = response
      .getData()
      .stream()
      .map(PlaylistResponseDTO::getName)
      .toList();

    assertThat(responsePlaylistNames)
      .containsAll(
        List.of(
          playlist.getName(),
          secondPlaylist.getName(),
          thirdPlaylist.getName()
        )
      );
  }

  @Test
  @WithUserDetails("test@gmail.com")
  void itShouldErrorWhenCreatingComboAndCharacterIsNotFromSelectedGame()
    throws Exception {
    Playlist playlist = createEmptyPlaylist(currentUser, "TEST__333");
    MvcResult mvcResult =
      this.mockMvc.perform(
          MockMvcRequestBuilders
            .post("/api/v1/playlists/{id}/new-combo", playlist.getId())
            .contentType("application/json")
            .content(
              objectMapper.writeValueAsString(
                CreateComboDTO
                  .builder()
                  .name("TEST Name")
                  .description("Updated description")
                  .combo("d/f+2")
                  .game(ComboGameTypes.Constants.STREET_FIGHTER_6)
                  .character(Tekken7Characters.MASTER_RAVEN.name())
                  .build()
              )
            )
        )
        .andReturn();
    assertEquals(
      mvcResult.getResponse().getStatus(),
      HttpStatus.BAD_REQUEST.value()
    );
    assertThat(mvcResult.getResponse().getContentAsString())
      .contains("Invalid combo character!");
  }

  @Test
  @WithUserDetails("test@gmail.com")
  void itShouldCreateNewComboAndAddToPlaylist() throws Exception {
    Playlist playlist = createEmptyPlaylist(currentUser, "TEST");
    MvcResult mvcResult =
      this.mockMvc.perform(
          MockMvcRequestBuilders
            .post("/api/v1/playlists/{id}/new-combo", playlist.getId())
            .contentType("application/json")
            .content(
              objectMapper.writeValueAsString(
                CreateComboDTO
                  .builder()
                  .name("TEST Name")
                  .description("Updated description")
                  .combo("d/f+2")
                  .game(ComboGameTypes.Constants.TEKKEN_7)
                  .character(Tekken7Characters.MASTER_RAVEN.name())
                  .build()
              )
            )
        )
        .andReturn();
    assertSuccessResponse(mvcResult.getResponse().getStatus());
    CompletePlaylistDTO playlistResponse = toPlaylistResposeDTO(
      mvcResult.getResponse().getContentAsString(),
      CompletePlaylistDTO.class
    );
    Set<PlaylistComboResponseDTO> playlistCombos = playlistResponse.getPlaylistCombos();
    assertThat(playlistCombos).hasSize(1);
    String combo = playlistCombos.iterator().next().getCombo().getCombo();
    assertThat(combo).isEqualTo("d/f+2");
  }

  @Test
  @WithUserDetails("secondtestmail@gmail.com")
  void itShouldNotAddToPlaylistWhenNotUserIsNotOwnerPlaylist()
    throws Exception {
    Playlist playlist = createEmptyPlaylist(currentUser, "TEST");
    long numberOfCombos = playlistRepository.count();
    MvcResult mvcResult =
      this.mockMvc.perform(
          MockMvcRequestBuilders
            .post("/api/v1/playlists/{id}/new-combo", playlist.getId())
            .contentType("application/json")
            .content(
              objectMapper.writeValueAsString(
                CreateComboDTO
                  .builder()
                  .name("TEST Name")
                  .description("Updated description")
                  .combo("d/f+2")
                  .game(ComboGameTypes.Constants.TEKKEN_7)
                  .build()
              )
            )
        )
        .andReturn();
    assertThat(mvcResult.getResponse().getStatus())
      .isEqualTo(HttpStatus.FORBIDDEN.value());
    assertThat(numberOfCombos).isEqualTo(playlistRepository.count());
  }

  @Test
  @WithUserDetails("test@gmail.com")
  void itShouldReturnPlaylistsFromUser() throws Exception {
    Playlist playlist = createEmptyPlaylist(currentUser, "TEST");
    Playlist secondPlaylist = createEmptyPlaylist(currentUser, "TEST2");
    Playlist playlistNotOwnedByCurrentUser = createEmptyPlaylist(
      setupUser("anothertestuser@test.com"),
      "TEST3"
    );

    PaginationResponse<PlaylistResponseDTO> playlistResponse = setupSearchPlaylist(
      "/api/v1/playlists/users/" + currentUser.getId()
    );

    List<String> responsePlaylistNames = playlistResponse
      .getData()
      .stream()
      .map(PlaylistResponseDTO::getName)
      .toList();
    assertThat(responsePlaylistNames)
      .contains(playlist.getName(), secondPlaylist.getName());
    assertThat(responsePlaylistNames)
      .doesNotContain(playlistNotOwnedByCurrentUser.getName());
  }

  @Test
  @WithUserDetails("test@gmail.com")
  void itShouldReorderPlaylistCombos() throws Exception {
    Playlist playlist = createEmptyPlaylist(currentUser, "TEST");
    createComboAndAddToPlaylist(
      playlist,
      comboRepository.save(
        Combo
          .builder()
          .owner(currentUser)
          .name("Combo 1")
          .combo("u/f+3+4")
          .game(ComboGameTypes.TEKKEN_7)
          .build()
      ),
      0
    );
    playlist =
      createComboAndAddToPlaylist(
        playlist,
        comboRepository.save(
          Combo
            .builder()
            .owner(currentUser)
            .name("Combo 2")
            .combo("u/f+3+4")
            .game(ComboGameTypes.TEKKEN_7)
            .build()
        ),
        1
      );

    List<UUID> comboIds = playlist
      .getPlaylistCombos()
      .stream()
      .sorted((o1, o2) -> o1.getPosition().compareTo(o2.getPosition()))
      .map(PlaylistCombo::getId)
      .toList();

    MvcResult mvcResult =
      this.mockMvc.perform(
          MockMvcRequestBuilders
            .put("/api/v1/playlists/{id}/combos/ordenation", playlist.getId())
            .contentType("application/json")
            .content(
              objectMapper.writeValueAsString(
                ReorderCombosDto
                  .builder()
                  .newPlaylistCombosOrdenation(
                    List.of(comboIds.get(1), comboIds.get(0))
                  )
                  .build()
              )
            )
        )
        .andReturn();

    assertSuccessResponse(mvcResult.getResponse().getStatus());
    CompletePlaylistDTO playlistResponse = toPlaylistResposeDTO(
      mvcResult.getResponse().getContentAsString(),
      CompletePlaylistDTO.class
    );
    List<PlaylistComboResponseDTO> playlistCombos = playlistResponse
      .getPlaylistCombos()
      .stream()
      .sorted((o1, o2) -> o1.getPosition().compareTo(o2.getPosition()))
      .toList();

    assertEquals(playlistCombos.get(0).getCombo().getName(), "Combo 2");
    assertEquals(playlistCombos.get(1).getCombo().getName(), "Combo 1");
  }
}
