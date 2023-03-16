package com.fgc.combo.companion.dto;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.NotEmpty;
import lombok.AllArgsConstructor;
import lombok.Data;

@AllArgsConstructor
@Data
public class UpdatePlaylistDTO {
    @NotEmpty
    private String name;

    @NotEmpty
    private String combo;

    @Max(255)
    private String description;
}
