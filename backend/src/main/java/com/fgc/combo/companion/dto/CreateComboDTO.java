package com.fgc.combo.companion.dto;

import org.hibernate.validator.constraints.Length;

import jakarta.validation.constraints.NotEmpty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
public class CreateComboDTO {

    @NotEmpty
    private String name;

    @NotEmpty
    private String combo;

    @Length(max = 255)
    private String description;
}
