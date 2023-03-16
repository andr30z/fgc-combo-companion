package com.fgc.combo.companion.dto;

import java.util.Set;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.NotEmpty;

public class CreatePlaylistDTO {
    @NotEmpty
    private String name;

    @NotEmpty
    private String combo;

    @Max(255)
    private String description;

    @NotEmpty
    private Long ownerId;

    Set<Long> combos;
}
