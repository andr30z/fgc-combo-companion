package com.fgc.combo.companion.controller;

import java.util.List;

import org.springframework.data.domain.Pageable;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.fgc.combo.companion.dto.CompletePlaylistDTO;
import com.fgc.combo.companion.dto.CreatePlaylistDTO;
import com.fgc.combo.companion.dto.PaginationResponse;
import com.fgc.combo.companion.dto.PlaylistResponseDTO;
import com.fgc.combo.companion.dto.UpdatePlaylistDTO;
import com.fgc.combo.companion.service.PlaylistService;

import jakarta.validation.constraints.NotEmpty;

@RequestMapping("/api/v1/playlists")
@RestController
public class PlaylistController {

  private final PlaylistService playlistService;

  public PlaylistController(PlaylistService playlistService) {
    this.playlistService = playlistService;
  }

  @GetMapping("/{playlistId}")
  public PlaylistResponseDTO getByIdAndCurrentUser(Long playlistId) {
    return this.playlistService.getByIdAndCurrentUser(playlistId);
  }

  @GetMapping("/me")
  public PaginationResponse<PlaylistResponseDTO> getByCurrentUser(
      Pageable pageable) {
    return this.playlistService.getByCurrentUser(pageable);
  }

  @PostMapping
  public PlaylistResponseDTO create(
      @RequestBody @Validated CreatePlaylistDTO createPlaylistDTO) {
    return this.playlistService.create(createPlaylistDTO);
  }

  @PutMapping("/{playlistId}")
  public PlaylistResponseDTO update(
      @PathVariable Long playlistId,
      @RequestBody @Validated UpdatePlaylistDTO updatePlaylistDTO) {
    return this.playlistService.update(playlistId, updatePlaylistDTO);
  }

  @DeleteMapping("/{playlistId}/combos")
  public boolean deleteCombosFromPlaylist(
      @PathVariable Long playlistId,
      @Validated @NotEmpty @RequestParam(name = "playlistComboId") List<Long> playlistComboIds) {
    return this.playlistService.deleteCombosFromPlaylist(playlistId, playlistComboIds);
  }

  @GetMapping("/{playlistId}/combos")
  public CompletePlaylistDTO getCombosFromPlaylist(
      @PathVariable Long playlistId) {
    return this.playlistService.getPlaylistWithCombos(playlistId);
  }
}
