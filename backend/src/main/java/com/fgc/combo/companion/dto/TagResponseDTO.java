package com.fgc.combo.companion.dto;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TagResponseDTO {
    private Long id;
    private String title;
    private String color;
    private LocalDateTime createdAt;
    private Long comboId;
    private Long playlistId;
}
