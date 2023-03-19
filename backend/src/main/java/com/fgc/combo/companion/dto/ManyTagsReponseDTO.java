package com.fgc.combo.companion.dto;

import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ManyTagsReponseDTO {

  private List<TagResponseDTO> tags;
}
