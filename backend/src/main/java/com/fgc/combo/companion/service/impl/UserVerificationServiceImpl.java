package com.fgc.combo.companion.service.impl;

import com.fgc.combo.companion.dto.CreateEmailDto;
import com.fgc.combo.companion.enums.UserVerificationTypes;
import com.fgc.combo.companion.exception.BadRequestException;
import com.fgc.combo.companion.exception.ResourceNotFoundException;
import com.fgc.combo.companion.model.User;
import com.fgc.combo.companion.model.UserVerification;
import com.fgc.combo.companion.repository.UserRepository;
import com.fgc.combo.companion.repository.UserVerificationRepository;
import com.fgc.combo.companion.service.EmailService;
import com.fgc.combo.companion.service.UserVerificationService;
import jakarta.transaction.Transactional;
import java.time.LocalDateTime;
import java.util.UUID;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class UserVerificationServiceImpl implements UserVerificationService {

  private final UserVerificationRepository UserVerificationRepository;

  private final UserRepository userRepository;

  private final EmailService emailService;

  @Value("${email-verification.base-frontend-url}")
  private String EMAIL_VERIFICATION_FRONTEND_URL;

  @Value("${password-change.base-frontend-url}")
  private String PASSWORD_CHANGE_FRONTEND_URL;

  public UserVerificationServiceImpl(
    UserVerificationRepository UserVerificationRepository,
    EmailService emailService,
    UserRepository userRepository
  ) {
    this.UserVerificationRepository = UserVerificationRepository;
    this.emailService = emailService;
    this.userRepository = userRepository;
  }

  private UserVerification createVerification(
    User user,
    CreateEmailDto createEmailDto,
    UUID token,
    UserVerificationTypes verificationTypes
  ) {
    //removing/invalidating old verification email request
    this.UserVerificationRepository.deleteByUser(user);

    this.emailService.sendEmail(createEmailDto);
    LocalDateTime oneDayFromNow = LocalDateTime.now().plusDays(1);
    UserVerification verification = UserVerification
      .builder()
      .token(token)
      .expiryDate(oneDayFromNow)
      .user(user)
      .type(verificationTypes)
      .build();
    return UserVerificationRepository.save(verification);
  }

  private UserVerification getUserVerificationWithValidations(UUID token) {
    UserVerification userVerification = getUserVerificationByToken(token);

    if (userVerification.isExpired()) throw new BadRequestException(
      "Token expired!"
    );

    User user = userVerification.getUser();
    if (user.getEmailVerified()) throw new BadRequestException(
      "User already verified!"
    );
    return userVerification;
  }

  @Override
  @Transactional
  public UserVerification sendVerificationEmail(User user) {
    UUID token = UUID.randomUUID();

    String SUBJECT = "Verify your email for FGC COMBO COMPANION";
    String CONTENT = String.format(
      "Hello, %s, \n Welcome to FGC Combo Companion! \n Please click on the link below to verify your email address: \n %s",
      user.getName(),
      EMAIL_VERIFICATION_FRONTEND_URL + "?token=" + token
    );
    return createVerification(
      user,
      CreateEmailDto
        .builder()
        .subject(SUBJECT)
        .content(CONTENT)
        .emailTo(user.getEmail())
        .build(),
      token,
      UserVerificationTypes.EMAIL_VERIFICATION
    );
  }

  @Override
  public User verifyEmail(UUID token) {
    UserVerification userVerification = getUserVerificationWithValidations(
      token
    );

    User user = userVerification.getUser();
    log.info(
      "Verifying email for user with ID => {} and email => {}",
      user.getId(),
      user.getEmail()
    );
    user.setEmailVerified(true);
    return this.userRepository.save(user);
  }

  @Override
  public UserVerification sendChangePasswordEmail(User user) {
    UUID token = UUID.randomUUID();

    String SUBJECT = "Change your password - FGC COMBO COMPANION";
    String CONTENT = String.format(
      "Hello, %s, \n Please click on the link below to reset your password: \n %s",
      user.getName(),
      PASSWORD_CHANGE_FRONTEND_URL + "?token=" + token
    );
    return createVerification(
      user,
      CreateEmailDto
        .builder()
        .subject(SUBJECT)
        .content(CONTENT)
        .emailTo(user.getEmail())
        .build(),
      token,
      UserVerificationTypes.PASSWORD_CHANGE
    );
  }

  @Override
  public User changePassword(UUID token, String newPassword) {
    UserVerification userVerification = getUserVerificationWithValidations(
      token
    );

    User user = userVerification.getUser();
    log.info(
      "Changing password for user with ID => {} and email => {}",
      user.getId(),
      user.getEmail()
    );
    BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
    user.setPassword(encoder.encode(newPassword));
    return this.userRepository.save(user);
  }

  @Override
  public UserVerification getUserVerificationByToken(UUID token) {
    return this.UserVerificationRepository.findByToken(token)
      .orElseThrow(() -> new ResourceNotFoundException("Verification not found for token: " + token));
  }
}
