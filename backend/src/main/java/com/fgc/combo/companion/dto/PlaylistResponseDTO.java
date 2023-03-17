package com.fgc.combo.companion.dto;

import java.time.LocalDateTime;

import com.fgc.combo.companion.model.User;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
public class PlaylistResponseDTO {
    private Long id;

    private String name;

    private String description;

    private LocalDateTime createdAt;

    private User owner;
}
