package com.fgc.combo.companion.dto;

import java.util.ArrayList;
import java.util.List;

import org.hibernate.validator.constraints.Length;

import jakarta.validation.constraints.NotEmpty;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class CreatePlaylistDTO {
    @NotEmpty
    private String name;

    @Length(max = 255)
    private String description;

    private List<Long> combos = new ArrayList<>();
}
