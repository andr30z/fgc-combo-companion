package com.fgc.combo.companion.service;

import com.fgc.combo.companion.model.User;
import com.fgc.combo.companion.model.UserVerification;
import java.util.UUID;

public interface UserVerificationService {
  UserVerification sendVerificationEmail(User user);
  UserVerification sendChangePasswordEmail(User user);

  UserVerification getUserVerificationByToken(UUID token);
  User verifyEmail(UUID token);
  User changePassword(UUID token, String newPassword);
}
