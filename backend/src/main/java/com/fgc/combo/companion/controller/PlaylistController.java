package com.fgc.combo.companion.controller;

import com.fgc.combo.companion.dto.AddCombosToPlaylistDTO;
import com.fgc.combo.companion.dto.CompletePlaylistDTO;
import com.fgc.combo.companion.dto.CreateComboDTO;
import com.fgc.combo.companion.dto.CreatePlaylistDTO;
import com.fgc.combo.companion.dto.PaginationResponse;
import com.fgc.combo.companion.dto.PlaylistComboSearchDTO;
import com.fgc.combo.companion.dto.PlaylistResponseDTO;
import com.fgc.combo.companion.dto.ReorderCombosDto;
import com.fgc.combo.companion.dto.UpdatePlaylistDTO;
import com.fgc.combo.companion.mapper.PlaylistMapper;
import com.fgc.combo.companion.service.PlaylistService;
import jakarta.validation.constraints.NotEmpty;
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

@RequestMapping("/api/v1/playlists")
@RestController
public class PlaylistController {

  private final PlaylistService playlistService;

  private final PlaylistMapper playlistMapper;

  public PlaylistController(
    PlaylistService playlistService,
    PlaylistMapper playlistMapper
  ) {
    this.playlistService = playlistService;
    this.playlistMapper = playlistMapper;
  }

  @GetMapping("/users/{userId}")
  public PaginationResponse<PlaylistResponseDTO> getByOwner(
    @PathVariable Long userId,
    Pageable pageable
  ) {
    return this.playlistMapper.toPagination(
        this.playlistService.getByOwner(userId, pageable)
      );
  }

  @GetMapping("/me")
  public PaginationResponse<PlaylistResponseDTO> getByCurrentUserAndSearchParam(
    PlaylistComboSearchDTO playlistComboSearchDTO,
    Pageable pageable
  ) {
    return this.playlistMapper.toPagination(
        this.playlistService.getByCurrentUserPlaylistAndSearchParam(
            playlistComboSearchDTO,
            pageable
          )
      );
  }

  @PostMapping
  public PlaylistResponseDTO create(
    @RequestBody @Validated CreatePlaylistDTO createPlaylistDTO
  ) {
    return this.playlistMapper.toDTO(
        this.playlistService.create(createPlaylistDTO)
      );
  }

  @PutMapping("/{playlistId}/me")
  public PlaylistResponseDTO update(
    @PathVariable Long playlistId,
    @RequestBody @Validated UpdatePlaylistDTO updatePlaylistDTO
  ) {
    return this.playlistMapper.toDTO(
        this.playlistService.update(playlistId, updatePlaylistDTO)
      );
  }

  @DeleteMapping("/{playlistId}/me")
  public boolean delete(@PathVariable Long playlistId) {
    return this.playlistService.delete(playlistId);
  }

  @PostMapping("/{playlistId}/me/combos")
  public CompletePlaylistDTO addCombosToPlaylist(
    @PathVariable Long playlistId,
    @RequestBody @Validated AddCombosToPlaylistDTO addCombosToPlaylistDTO
  ) {
    return this.playlistMapper.toCompletePlaylistDTO(
        this.playlistService.addCombosToPlaylist(
            playlistId,
            addCombosToPlaylistDTO
          )
      );
  }

  @PostMapping("/{playlistId}/me/new-combo")
  public CompletePlaylistDTO addNewCombosToPlaylist(
    @PathVariable Long playlistId,
    @RequestBody @Validated CreateComboDTO createComboDTO
  ) {
    return this.playlistMapper.toCompletePlaylistDTO(
        this.playlistService.createComboAndAddToPlaylist(
            playlistId,
            createComboDTO
          )
      );
  }

  @DeleteMapping("/{playlistId}/me/combos")
  public boolean deleteCombosFromPlaylist(
    @PathVariable Long playlistId,
    @Validated @NotEmpty @RequestParam(
      name = "playlistComboId"
    ) List<Long> playlistComboIds
  ) {
    return this.playlistService.deleteCombosFromPlaylist(
        playlistId,
        playlistComboIds
      );
  }

  @GetMapping("/{playlistId}")
  public CompletePlaylistDTO getPlaylistDetails(@PathVariable Long playlistId) {
    return this.playlistMapper.toCompletePlaylistDTO(
        this.playlistService.getPlaylistWithCombos(playlistId)
      );
  }

  @PutMapping("/{playlistId}/me/combos/ordenation")
  public CompletePlaylistDTO reorderPlaylistCombos(
    @PathVariable Long playlistId,
    @RequestBody @Validated ReorderCombosDto reorderCombosDto
  ) {
    return this.playlistMapper.toCompletePlaylistDTO(
        this.playlistService.reorderPlaylistCombos(playlistId, reorderCombosDto)
      );
  }
}
