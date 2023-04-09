package com.fgc.combo.companion.service;

import com.fgc.combo.companion.dto.CreateEmailDto;
import com.fgc.combo.companion.model.Email;

public interface EmailService {
  Email sendEmail(CreateEmailDto createEmailDto);
}
