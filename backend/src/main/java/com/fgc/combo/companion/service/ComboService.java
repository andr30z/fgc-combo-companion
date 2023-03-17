package com.fgc.combo.companion.service;

import org.springframework.data.domain.Pageable;

import com.fgc.combo.companion.dto.ComboResponseDTO;
import com.fgc.combo.companion.dto.CreateComboDTO;
import com.fgc.combo.companion.dto.PaginationResponse;
import com.fgc.combo.companion.dto.UpdateComboDTO;

public interface ComboService {
    ComboResponseDTO create(CreateComboDTO createComboDTO);

    ComboResponseDTO update(Long id, UpdateComboDTO updateComboDTO);

    ComboResponseDTO getByIdAndCurrentUser(Long id);

    PaginationResponse<ComboResponseDTO> getAllByCurrentUser(Pageable pageable);
}
