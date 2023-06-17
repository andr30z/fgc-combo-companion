package com.fgc.combo.companion.service;

import com.fgc.combo.companion.dto.CreateComboDTO;
import com.fgc.combo.companion.dto.PaginationResponse;
import com.fgc.combo.companion.dto.PlaylistComboSearchDTO;
import com.fgc.combo.companion.dto.UpdateComboDTO;
import com.fgc.combo.companion.model.Combo;
import com.fgc.combo.companion.model.User;
import org.springframework.data.domain.Pageable;

public interface ComboService {
  PaginationResponse<Combo> getByOwner(User user, Pageable pageable);
  PaginationResponse<Combo> getByOwner(Long userId, Pageable pageable);

  Combo create(CreateComboDTO createComboDTO);

  Combo update(Long id, UpdateComboDTO updateComboDTO);

  Combo getByIdAndCurrentUser(Long id);

  PaginationResponse<Combo> getAllBySearchParams(
    PlaylistComboSearchDTO playlistComboSearchDTO,
    Pageable pageable
  );

  PaginationResponse<Combo> getAllByCurrentUser(Pageable pageable);

  Combo saveCombo(Combo combo);

  boolean deleteByIdAndCurrentUser(Long id);

  PaginationResponse<Combo> getAllByOwnerAndSearchParam(
    PlaylistComboSearchDTO playlistComboSearchDTO,
    Pageable pageable
  );
}
