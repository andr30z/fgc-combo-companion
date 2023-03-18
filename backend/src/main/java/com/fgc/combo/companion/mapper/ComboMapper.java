package com.fgc.combo.companion.mapper;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

import com.fgc.combo.companion.dto.ComboResponseDTO;
import com.fgc.combo.companion.model.Combo;

@Component
public class ComboMapper {

    private final ModelMapper modelMapper;

    public ComboMapper(ModelMapper modelMapper) {
        this.modelMapper = modelMapper;
    }

    public ComboResponseDTO toComboReponseDTO(Combo combo) {
        return this.modelMapper.map(combo, ComboResponseDTO.class);
    }

    public Combo toCombo(Object comboDTO) {
        return modelMapper.map(comboDTO, Combo.class);
    }

}
