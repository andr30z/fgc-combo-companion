package com.fgc.combo.companion.service.impl;

import com.fgc.combo.companion.dto.CreateComboDTO;
import com.fgc.combo.companion.dto.ReorderCombosDto;
import com.fgc.combo.companion.exception.BadRequestException;
import com.fgc.combo.companion.exception.OperationNotAllowedException;
import com.fgc.combo.companion.exception.ResourceNotFoundException;
import com.fgc.combo.companion.mapper.ComboMapper;
import com.fgc.combo.companion.model.Combo;
import com.fgc.combo.companion.model.Playlist;
import com.fgc.combo.companion.model.PlaylistCombo;
import com.fgc.combo.companion.model.User;
import com.fgc.combo.companion.repository.ComboRepository;
import com.fgc.combo.companion.repository.PlaylistComboRepository;
import com.fgc.combo.companion.repository.PlaylistRepository;
import com.fgc.combo.companion.service.PlaylistComboService;
import com.fgc.combo.companion.service.UserService;
import jakarta.transaction.Transactional;
import java.util.Collections;
import java.util.Comparator;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.UUID;
import java.util.function.IntFunction;
import java.util.stream.Collectors;
import java.util.stream.IntStream;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.webjars.NotFoundException;

@Service
@Slf4j
public class PlaylistComboServiceImpl implements PlaylistComboService {

  private final PlaylistRepository playlistRepository;
  private final ComboRepository comboRepository;
  private final PlaylistComboRepository playlistComboRepository;
  private final UserService userService;
  private final ComboMapper comboMapper;

  public PlaylistComboServiceImpl(
    PlaylistRepository playlistRepository,
    ComboRepository comboRepository,
    PlaylistComboRepository playlistComboRepository,
    UserService userService,
    ComboMapper comboMapper
  ) {
    this.playlistRepository = playlistRepository;
    this.comboRepository = comboRepository;
    this.playlistComboRepository = playlistComboRepository;
    this.userService = userService;
    this.comboMapper = comboMapper;
  }

  @Override
  public List<Combo> getAllCombosInPlaylist(UUID playlistId) {
    Playlist playlist = getPlaylist(playlistId);
    return getCombosFromPlaylist(playlist);
  }

  @Override
  public List<Combo> getAllCombosInPlaylist(Playlist playlist) {
    return getCombosFromPlaylist(playlist);
  }

  @Transactional
  @Override
  public List<Combo> addAllCombosToPlaylist(
    UUID playlistId,
    Set<UUID> comboIds
  ) {
    Playlist playlist = getPlaylist(playlistId);

    return addAllCombosToPlaylist(playlist, comboIds);
  }

  @Transactional
  @Override
  public List<Combo> addAllCombosToPlaylist(
    Playlist playlist,
    Set<UUID> comboIds
  ) {
    User user = userService.me();
    if (!playlist.getOwner().getId().equals(user.getId())) {
      throw new OperationNotAllowedException(
        "This playlist belongs to another user!"
      );
    }

    Set<Combo> combos = new HashSet<>(
      this.comboRepository.findAllById(comboIds)
    );

    if (
      (!comboIds.isEmpty() && combos.isEmpty()) ||
      combos.size() != comboIds.size()
    ) {
      throw new ResourceNotFoundException(
        "One of the combos you are trying to add is not in the database!"
      );
    }
    List<Combo> listOfCombos = combos.stream().toList();
    List<PlaylistCombo> playlistCombos = createPlaylistCombos(
      listOfCombos,
      playlist
    );

    List<PlaylistCombo> savedPlaylistCombos = playlistComboRepository.saveAll(
      playlistCombos
    );
    playlist.getPlaylistCombos().addAll(savedPlaylistCombos);
    playlistRepository.save(playlist);

    return listOfCombos;
  }

  @Override
  public List<Combo> removeCombosFromPlaylist(
    Playlist playlist,
    List<UUID> playlistComboIds
  ) {
    if (playlistComboIds.isEmpty()) throw new BadRequestException(
      "At least one Playlist Combo ID should be informed!"
    );

    User user = userService.me();

    if (
      !playlist.getOwner().getId().equals(user.getId())
    ) throw new OperationNotAllowedException("This playlist is not yours!");

    List<PlaylistCombo> playlistCombos =
      this.playlistComboRepository.findAllByIdInAndPlaylist(
          playlistComboIds,
          playlist
        );

    if (playlistCombos.isEmpty()) throw new BadRequestException(
      "Playlist or combos not found!"
    );

    log.info(
      "Removing the following combos: {} from playlist: {} - ID: {}",
      playlistCombos
        .stream()
        .map(playlistCombo -> playlistCombo.getCombo().getId())
        .toList(),
      playlist.getName(),
      playlist.getId()
    );
    this.playlistComboRepository.deletePlaylistCombos(playlistComboIds);
    return playlistCombos
      .stream()
      .map(playlistCombo -> playlistCombo.getCombo())
      .toList();
  }

  private List<PlaylistCombo> mapPlaylistComboPositions(
    int maxSize,
    IntFunction<PlaylistCombo> mapper
  ) {
    return IntStream.range(0, maxSize).mapToObj(mapper).toList();
  }

  private List<PlaylistCombo> createPlaylistCombos(
    List<Combo> combos,
    Playlist playlist
  ) {
    if (combos.isEmpty()) return Collections.emptyList();

    Set<PlaylistCombo> playlistCombos = playlist.getPlaylistCombos();

    Optional<PlaylistCombo> playlistCombo = playlistCombos
      .stream()
      .max(Comparator.comparing(PlaylistCombo::getPosition));

    final int EMPTY_LIST_MAX_POSITION = playlistCombo.isEmpty()
      ? 0
      : playlistCombo.get().getPosition();
    return mapPlaylistComboPositions(
      combos.size(),
      index ->
        PlaylistCombo
          .builder()
          .combo(combos.get(index))
          .playlist(playlist)
          .position(EMPTY_LIST_MAX_POSITION + index)
          .build()
    );
  }

  private Playlist getPlaylist(UUID id) {
    return this.playlistRepository.findById(id)
      .orElseThrow(() -> new ResourceNotFoundException("Playlist not found!"));
  }

  private List<Combo> getCombosFromPlaylist(Playlist playlist) {
    return playlist
      .getPlaylistCombos()
      .stream()
      .map(playlistCombo -> playlistCombo.getCombo())
      .toList();
  }

  @Override
  public void deleteByPlaylist(Playlist playlist) {
    this.playlistComboRepository.deleteByPlaylist(playlist);
  }

  @Override
  @Transactional
  public Playlist createComboAndAddToPlaylist(
    Playlist playlist,
    CreateComboDTO createComboDTO
  ) {
    Combo combo = comboMapper.toOriginal(createComboDTO);
    User currentUser = userService.me();

    combo.setOwner(currentUser);
    combo.setGame(createComboDTO.getGame());
    this.comboRepository.save(combo);
    this.addAllCombosToPlaylist(playlist, Collections.singleton(combo.getId()));
    return playlist;
  }

  @Override
  public Playlist reorderPlaylistCombos(
    Playlist playlist,
    ReorderCombosDto reorderCombosDto
  ) {
    Set<PlaylistCombo> playlistCombos = playlist.getPlaylistCombos();
    boolean allPlaylistCombosAreInPlaylist = playlistCombos
      .stream()
      .map(PlaylistCombo::getId)
      .toList()
      .containsAll(reorderCombosDto.getNewPlaylistCombosOrdenation());

    if (!allPlaylistCombosAreInPlaylist) {
      throw new BadRequestException(
        "At least one playlist combo is not in the playlist!"
      );
    }

    log.info(
      "Starting ordenation for playlist: {}, with ID: {}",
      playlist.getName(),
      playlist.getId()
    );
    log.info(
      "New Ordenation: {}",
      reorderCombosDto.getNewPlaylistCombosOrdenation()
    );
    List<UUID> newPlaylistCombos = reorderCombosDto.getNewPlaylistCombosOrdenation();
    List<PlaylistCombo> reordedCombos = mapPlaylistComboPositions(
      reorderCombosDto.getNewPlaylistCombosOrdenation().size(),
      index -> {
        UUID playlistComboId = newPlaylistCombos.get(index);
        PlaylistCombo playlistCombo = playlistCombos
          .stream()
          .filter(pCombo -> pCombo.getId().equals(playlistComboId))
          .findAny()
          .orElseThrow(() ->
            new NotFoundException(
              "Playlist combo with ID: " + playlistComboId + " was not found!"
            )
          );
        log.info(
          "Setting combo: {}, to index: {}, ID: {}",
          playlistCombo.getCombo().getName(),
          index,
          playlistCombo.getId()
        );
        playlistCombo.setPosition(index);
        return playlistCombo;
      }
    );

    playlist.setPlaylistCombos(
      reordedCombos.stream().collect(Collectors.toSet())
    );
    playlistComboRepository.saveAll(reordedCombos);
    return playlist;
  }
}
