package com.fgc.combo.companion.mapper;

import com.fgc.combo.companion.dto.ComboResponseDTO;
import com.fgc.combo.companion.dto.PaginationResponse;
import com.fgc.combo.companion.model.Combo;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

@Component
public class ComboMapper extends BaseMapper<Combo> {

  public ComboMapper(ModelMapper modelMapper) {
    super(modelMapper);
  }

  public ComboResponseDTO toDTO(Combo combo) {
    return this.toDTO(combo, ComboResponseDTO.class);
  }

  public Combo toOriginal(Object comboDTO) {
    return this.toOriginal(comboDTO, Combo.class);
  }

  public PaginationResponse<ComboResponseDTO> toPagination(
    PaginationResponse<Combo> comboPagination
  ) {
    return this.toPaginationDTO(comboPagination, ComboResponseDTO.class);
  }
}
