package com.fgc.combo.companion.service;

import com.fgc.combo.companion.dto.CreateComboDTO;
import com.fgc.combo.companion.dto.PaginationResponse;
import com.fgc.combo.companion.dto.PlaylistComboSearchDTO;
import com.fgc.combo.companion.dto.UpdateComboDTO;
import com.fgc.combo.companion.model.Combo;
import org.springframework.data.domain.Pageable;

public interface ComboService {
  Combo create(CreateComboDTO createComboDTO);

  Combo update(Long id, UpdateComboDTO updateComboDTO);

  Combo getByIdAndCurrentUser(Long id);

  PaginationResponse<Combo> getAllByCurrentUser(Pageable pageable);

  Combo saveCombo(Combo combo);

  PaginationResponse<Combo> getAllByOwnerAndComboNameOrTagName(
    PlaylistComboSearchDTO playlistComboSearchDTO,
    Pageable pageable
  );
}
