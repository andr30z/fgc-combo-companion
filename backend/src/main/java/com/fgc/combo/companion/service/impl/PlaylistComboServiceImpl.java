package com.fgc.combo.companion.service.impl;

import com.fgc.combo.companion.exception.BadRequestException;
import com.fgc.combo.companion.exception.OperationNotAllowedException;
import com.fgc.combo.companion.exception.ResourceNotFoundException;
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
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.IntStream;
import org.springframework.stereotype.Service;

@Service
public class PlaylistComboServiceImpl implements PlaylistComboService {

  private final PlaylistRepository playlistRepository;
  private final ComboRepository comboRepository;
  private final PlaylistComboRepository playlistComboRepository;
  private final UserService userService;

  public PlaylistComboServiceImpl(
    PlaylistRepository playlistRepository,
    ComboRepository comboRepository,
    PlaylistComboRepository playlistComboRepository,
    UserService userService
  ) {
    this.playlistRepository = playlistRepository;
    this.comboRepository = comboRepository;
    this.playlistComboRepository = playlistComboRepository;
    this.userService = userService;
  }

  @Override
  public List<Combo> getAllCombosInPlaylist(Long playlistId) {
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
    Long playlistId,
    Set<Long> comboIds
  ) {
    Playlist playlist = getPlaylist(playlistId);

    return addAllCombosToPlaylist(playlist, comboIds);
  }

  @Transactional
  @Override
  public List<Combo> addAllCombosToPlaylist(
    Playlist playlist,
    Set<Long> comboIds
  ) {
    User user = userService.me();
    if (
      user.getId() != playlist.getOwner().getId()
    ) throw new OperationNotAllowedException(
      "You cannot add combos to this playlist!"
    );

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
    List<Long> playlistComboIds
  ) {
    if (playlistComboIds.isEmpty()) throw new BadRequestException(
      "At least one Playlist Combo ID should be informed!"
    );

    User user = userService.me();

    if (
      playlist.getOwner().getId() != user.getId()
    ) throw new OperationNotAllowedException("This playlist is not yours!");

    List<PlaylistCombo> playlistCombos =
      this.playlistComboRepository.findAllByIdInAndPlaylist(
          playlistComboIds,
          playlist
        );

    if (playlistCombos.isEmpty()) throw new BadRequestException(
      "Playlist or combos not found!"
    );
    this.playlistComboRepository.deletePlaylistCombos(playlistComboIds);
    return playlistCombos
      .stream()
      .map(playlistCombo -> playlistCombo.getCombo())
      .toList();
  }

  private List<PlaylistCombo> createPlaylistCombos(
    List<Combo> combos,
    Playlist playlist
  ) {
    if (combos.isEmpty()) return Collections.emptyList();

    Set<PlaylistCombo> playlistCombos = playlist.getPlaylistCombos();

    int EMPTY_LIST_MAX_POSITION = playlistCombos.size();

    return IntStream
      .range(0, combos.size())
      .mapToObj(index ->
        PlaylistCombo
          .builder()
          .combo(combos.get(index))
          .playlist(playlist)
          .position(EMPTY_LIST_MAX_POSITION + index)
          .build()
      )
      .toList();
  }

  private Playlist getPlaylist(Long id) {
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
}
