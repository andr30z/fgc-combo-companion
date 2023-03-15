package com.fgc.combo.companion.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
public class CreateComboDTO {

    private String name;

    private String combo;

    private String description;

    private Long ownerId;
}
