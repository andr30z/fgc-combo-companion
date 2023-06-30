package com.fgc.combo.companion.dto;

import java.time.LocalDateTime;
import java.util.UUID;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PlaylistComboResponseDTO {
    private UUID id;

    private Integer position;

    private ComboResponseDTO combo;

    private LocalDateTime addedAt;
}
