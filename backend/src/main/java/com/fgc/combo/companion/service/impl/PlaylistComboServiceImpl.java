package com.fgc.combo.companion.service.impl;

import java.util.List;
import java.util.stream.IntStream;

import org.webjars.NotFoundException;

import com.fgc.combo.companion.exception.OperationNotAllowedException;
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

public class PlaylistComboServiceImpl implements PlaylistComboService {

    private final PlaylistRepository playlistRepository;
    private final ComboRepository comboRepository;
    private final PlaylistComboRepository playlistComboRepository;
    private final UserService userService;

    public PlaylistComboServiceImpl(
            PlaylistRepository playlistRepository,
            ComboRepository comboRepository,
            PlaylistComboRepository playlistComboRepository,
            UserService userService) {
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
    public List<Combo> addAllCombosToPlaylist(Long playlistId, List<Long> comboIds) {

        Playlist playlist = getPlaylist(playlistId);
        User user = userService.me();

        if (user.getId() != playlist.getOwner().getId())
            throw new OperationNotAllowedException("You cannot add combos to this playlist!");

        List<Combo> combos = this.comboRepository.findAllById(comboIds);
        List<PlaylistCombo> playlistCombos = createPlaylistCombos(combos, playlist);

        List<PlaylistCombo> savedPlaylistCombos = playlistComboRepository.saveAll(playlistCombos);
        playlist.getPlaylistCombos().addAll(savedPlaylistCombos);
        playlistRepository.save(playlist);

        return combos;
    }

    @Transactional
    @Override
    public List<Combo> addAllCombosToPlaylist(Playlist playlist, List<Long> comboIds) {

        List<Combo> combos = this.comboRepository.findAllById(comboIds);
        List<PlaylistCombo> playlistCombos = createPlaylistCombos(combos, playlist);

        List<PlaylistCombo> savedPlaylistCombos = playlistComboRepository.saveAll(playlistCombos);
        playlist.getPlaylistCombos().addAll(savedPlaylistCombos);
        playlistRepository.save(playlist);

        return combos;
    }

    @Override
    public List<Combo> removeCombosFromPlaylist(List<Long> playlistComboIds) {
        User user = userService.me();
        List<PlaylistCombo> playlistCombos = this.playlistComboRepository.findAllById(playlistComboIds);

        boolean hasNotOwnedPlaylists = playlistCombos.stream()
                .anyMatch((playlistCombo) -> playlistCombo.getPlaylist().getOwner().getId() != user.getId());

        if (hasNotOwnedPlaylists)
            throw new OperationNotAllowedException("You cannot add combos to this playlist!");
        this.playlistComboRepository.deleteAllById(playlistComboIds);

        return playlistCombos.stream().map((playlistCombo) -> playlistCombo.getCombo()).toList();
    }

    private List<PlaylistCombo> createPlaylistCombos(List<Combo> combos, Playlist playlist) {

        if (combos.isEmpty())
            throw new NotFoundException("Combo IDs not found!");

        return IntStream.range(0, combos.size())
                .mapToObj(index -> PlaylistCombo.builder()
                        .combo(combos.get(index))
                        .playlist(playlist)
                        .position(index)
                        .build())
                .toList();
    }

    private Playlist getPlaylist(Long id) {
        return this.playlistRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Playlist not found!"));
    }

    private List<Combo> getCombosFromPlaylist(Playlist playlist) {
        return playlist.getPlaylistCombos().stream().map((playlistCombo) -> playlistCombo.getCombo()).toList();
    }

}
