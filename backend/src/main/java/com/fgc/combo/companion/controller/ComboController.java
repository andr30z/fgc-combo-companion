package com.fgc.combo.companion.controller;

import com.fgc.combo.companion.dto.ComboResponseDto;
import com.fgc.combo.companion.dto.CreateComboDto;
import com.fgc.combo.companion.dto.PaginationResponse;
import com.fgc.combo.companion.dto.PlaylistComboSearchDto;
import com.fgc.combo.companion.dto.UpdateComboDto;
import com.fgc.combo.companion.mapper.ComboMapper;
import com.fgc.combo.companion.service.ComboService;
import java.util.UUID;
import org.springframework.data.domain.Pageable;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequestMapping("/api/v1/combos")
@RestController
public class ComboController {

  private final ComboService comboService;
  private final ComboMapper comboMapper;

  public ComboController(ComboService comboService, ComboMapper comboMapper) {
    this.comboService = comboService;
    this.comboMapper = comboMapper;
  }

  @GetMapping("/users/{userId}")
  public PaginationResponse<ComboResponseDto> getUserCombos(
    @PathVariable UUID userId,
    Pageable pageable
  ) {
    return this.comboMapper.toPagination(
        this.comboService.getByOwner(userId, pageable)
      );
  }

  @GetMapping("/me")
  public PaginationResponse<ComboResponseDto> getUserCombos(
    PlaylistComboSearchDto playlistComboSearchDTO,
    Pageable pageable
  ) {
    return this.comboMapper.toPagination(
        this.comboService.getAllByOwnerAndSearchParam(
            playlistComboSearchDTO,
            pageable
          )
      );
  }

  @GetMapping
  public PaginationResponse<ComboResponseDto> getAllCombosBySearchParam(
    PlaylistComboSearchDto playlistComboSearchDTO,
    Pageable pageable
  ) {
    return this.comboMapper.toPagination(
        this.comboService.getAllBySearchParams(playlistComboSearchDTO, pageable)
      );
  }

  @PostMapping
  public ComboResponseDto getByDTO(
    @RequestBody @Validated CreateComboDto comboDTO
  ) {
    return this.comboMapper.toDTO((this.comboService.create(comboDTO)));
  }

  @GetMapping("/{comboId}")
  public ComboResponseDto getComboDetails(@PathVariable UUID comboId) {
    return this.comboMapper.toDTO((this.comboService.getById(comboId)));
  }

  @PutMapping("/{comboId}")
  public ComboResponseDto updateCombo(
    @PathVariable UUID comboId,
    @RequestBody @Validated UpdateComboDto comboDTO
  ) {
    return this.comboMapper.toDTO(
        (this.comboService.update(comboId, comboDTO))
      );
  }

  @DeleteMapping("/{comboId}")
  public boolean deleteCombo(@PathVariable UUID comboId) {
    return this.comboService.deleteByIdAndCurrentUser(comboId);
  }
}
