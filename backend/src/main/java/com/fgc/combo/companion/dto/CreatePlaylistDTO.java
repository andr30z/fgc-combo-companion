package com.fgc.combo.companion.dto;

import java.util.List;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.NotEmpty;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class CreatePlaylistDTO {
    @NotEmpty
    private String name;

    @NotEmpty
    private String combo;

    @Max(255)
    private String description;

    List<Long> combos;
}
