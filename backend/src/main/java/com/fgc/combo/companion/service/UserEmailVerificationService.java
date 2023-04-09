package com.fgc.combo.companion.service;

import java.util.UUID;

import com.fgc.combo.companion.model.User;
import com.fgc.combo.companion.model.UserEmailVerification;

public interface UserEmailVerificationService{
  UserEmailVerification sendVerificationEmail(User user);
  User verifyEmail(UUID token);

}
