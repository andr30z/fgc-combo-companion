package com.fgc.combo.companion.dto;

import java.time.LocalDateTime;
import java.util.Set;

import com.fgc.combo.companion.model.PlaylistCombo;
import com.fgc.combo.companion.model.User;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@AllArgsConstructor
@Builder
public class PlaylistResponseDTO {
    private Long id;

    private String name;

    private String description;

    LocalDateTime createdAt;

    private User owner;

    Set<PlaylistCombo> playlistCombos;
}
