package com.fgc.combo.companion.service;

import com.fgc.combo.companion.dto.CreateComboDto;
import com.fgc.combo.companion.dto.PaginationResponse;
import com.fgc.combo.companion.dto.PlaylistComboSearchDto;
import com.fgc.combo.companion.dto.UpdateComboDto;
import com.fgc.combo.companion.model.Combo;
import com.fgc.combo.companion.model.User;

import java.util.UUID;

import org.springframework.data.domain.Pageable;

public interface ComboService {
  PaginationResponse<Combo> getByOwner(User user, Pageable pageable);
  PaginationResponse<Combo> getByOwner(UUID userId, Pageable pageable);

  Combo getById(UUID id);

  Combo create(CreateComboDto createComboDTO);

  Combo update(UUID id, UpdateComboDto updateComboDTO);

  Combo getByIdAndCurrentUser(UUID id);

  PaginationResponse<Combo> getAllBySearchParams(
    PlaylistComboSearchDto playlistComboSearchDTO,
    Pageable pageable
  );

  PaginationResponse<Combo> getAllByCurrentUser(Pageable pageable);

  Combo saveCombo(Combo combo);

  boolean deleteByIdAndCurrentUser(UUID id);

  PaginationResponse<Combo> getAllByOwnerAndSearchParam(
    PlaylistComboSearchDto playlistComboSearchDTO,
    Pageable pageable
  );
}
