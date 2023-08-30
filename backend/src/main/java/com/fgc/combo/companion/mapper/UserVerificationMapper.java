package com.fgc.combo.companion.mapper;

import com.fgc.combo.companion.dto.UserVerificationDto;
import com.fgc.combo.companion.model.UserVerification;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

@Component
public class UserVerificationMapper extends BaseMapper<UserVerification> {

  public UserVerificationMapper(ModelMapper modelMapper) {
    super(modelMapper);
  }

  public UserVerificationDto toDto(UserVerification userVerification) {
    return this.toDto(userVerification, UserVerificationDto.class);
  }
}
