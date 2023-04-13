package com.fgc.combo.companion.dto;

import com.fgc.combo.companion.enums.UserVerificationTypes;
import java.time.LocalDateTime;
import java.util.UUID;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class UserVerificationDto {

  private Long id;
  private UUID token;
  private UserVerificationTypes type;
  private LocalDateTime expiryDate;
  private LocalDateTime createdAt;
}
