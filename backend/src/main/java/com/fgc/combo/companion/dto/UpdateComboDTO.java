package com.fgc.combo.companion.dto;

import org.hibernate.validator.constraints.Length;

import jakarta.validation.constraints.NotEmpty;
import lombok.Data;

@Data
public class UpdateComboDTO {
    @NotEmpty
    private String name;

    @NotEmpty
    private String combo;

    @Length(max = 255)
    private String description;
}
