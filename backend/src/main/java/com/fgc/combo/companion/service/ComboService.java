package com.fgc.combo.companion.service;

import java.util.List;

import com.fgc.combo.companion.dto.ComboResponseDTO;
import com.fgc.combo.companion.dto.CreateComboDTO;

public interface ComboService {
    ComboResponseDTO create(CreateComboDTO createComboDTO);

    ComboResponseDTO update(Long id, CreateComboDTO createComboDTO);

    List<ComboResponseDTO> getAllByCurrentUser(CreateComboDTO createComboDTO);
}
