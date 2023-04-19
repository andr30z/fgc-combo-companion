package com.fgc.combo.companion.controller;

import com.fgc.combo.companion.dto.ComboResponseDTO;
import com.fgc.combo.companion.dto.CreateComboDTO;
import com.fgc.combo.companion.dto.PaginationResponse;
import com.fgc.combo.companion.dto.PlaylistComboSearchDTO;
import com.fgc.combo.companion.dto.UpdateComboDTO;
import com.fgc.combo.companion.mapper.ComboMapper;
import com.fgc.combo.companion.service.ComboService;
import org.springframework.data.domain.Pageable;
import org.springframework.validation.annotation.Validated;
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

  @GetMapping("/me")
  public PaginationResponse<ComboResponseDTO> getUserCombos(
    PlaylistComboSearchDTO playlistComboSearchDTO,
    Pageable pageable
  ) {
    return this.comboMapper.toPagination(
        this.comboService.getAllByOwnerAndComboNameOrTagName(
            playlistComboSearchDTO,
            pageable
          )
      );
  }

  @PostMapping
  public ComboResponseDTO getByDTO(
    @RequestBody @Validated CreateComboDTO comboDTO
  ) {
    return this.comboMapper.toDTO((this.comboService.create(comboDTO)));
  }

  @PutMapping("/{comboId}")
  public ComboResponseDTO getByDTO(
    @PathVariable Long comboId,
    @RequestBody @Validated UpdateComboDTO comboDTO
  ) {
    return this.comboMapper.toDTO(
        (this.comboService.update(comboId, comboDTO))
      );
  }

  @GetMapping("/{comboId}/me")
  public ComboResponseDTO getByIdAndCurrentUser(@PathVariable Long comboId) {
    return this.comboMapper.toDTO(
        this.comboService.getByIdAndCurrentUser(comboId)
      );
  }
}
