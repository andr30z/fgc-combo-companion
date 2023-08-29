package com.fgc.combo.companion.dto;

import java.time.LocalDateTime;
import java.util.UUID;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TagResponseDto {
    private UUID id;
    private String title;
    private String color;
    private LocalDateTime createdAt;
    private UUID comboId;
    private UUID playlistId;
}
