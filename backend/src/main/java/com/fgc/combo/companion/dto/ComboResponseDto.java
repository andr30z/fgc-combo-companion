package com.fgc.combo.companion.dto;

import java.time.LocalDateTime;
import java.util.Set;
import java.util.UUID;

import com.fgc.combo.companion.enums.ComboGameTypes;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
public class ComboResponseDto {

    private UUID id;

    private String name;

    private String combo;

    private LocalDateTime createdAt;
    
    private LocalDateTime updatedAt;
    
    private ComboGameTypes game;

    private String description;

    private UserDto owner;

    private String totalDamage;

    private String character;

    private Set<TagResponseDto> tags;
}