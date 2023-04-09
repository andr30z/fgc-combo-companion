package com.fgc.combo.companion.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@AllArgsConstructor
@Builder
public class CreateEmailDto {
    private String emailTo;
    private String subject;
    private String content;
}
