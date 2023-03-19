package com.fgc.combo.companion.dto;

import java.util.Set;

import com.fgc.combo.companion.enums.ComboGameTypes;
import com.fgc.combo.companion.model.User;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
public class ComboResponseDTO {

    private Long id;

    private String name;

    private String combo;
    
    private ComboGameTypes game;

    private String description;

    private User owner;

    private Set<TagResponseDTO> tags;
}