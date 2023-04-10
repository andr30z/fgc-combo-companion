package com.fgc.combo.companion.service.impl;

import com.fgc.combo.companion.dto.CreateEmailDto;
import com.fgc.combo.companion.exception.BadRequestException;
import com.fgc.combo.companion.exception.ResourceNotFoundException;
import com.fgc.combo.companion.model.User;
import com.fgc.combo.companion.model.UserEmailVerification;
import com.fgc.combo.companion.repository.UserEmailVerificationRepository;
import com.fgc.combo.companion.repository.UserRepository;
import com.fgc.combo.companion.service.EmailService;
import com.fgc.combo.companion.service.UserEmailVerificationService;
import jakarta.transaction.Transactional;
import java.time.LocalDateTime;
import java.util.UUID;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class UserEmailVerificationServiceImpl
  implements UserEmailVerificationService {

  private final UserEmailVerificationRepository userEmailVerificationRepository;

  private final UserRepository userRepository;

  private final EmailService emailService;

  @Value("${email-verification.base-user-email-verification-frontend-url}")
  private String FRONTEND_URL;

  public UserEmailVerificationServiceImpl(
    UserEmailVerificationRepository userEmailVerificationRepository,
    EmailService emailService,
    UserRepository userRepository
  ) {
    this.userEmailVerificationRepository = userEmailVerificationRepository;
    this.emailService = emailService;
    this.userRepository = userRepository;
  }

  @Override
  @Transactional
  public UserEmailVerification sendVerificationEmail(User user) {
    //removing/invalidating old verification email request
    this.userEmailVerificationRepository.deleteByUser(user);

    UUID token = UUID.randomUUID();

    String SUBJECT = "Verify your email for FGC COMBO COMPANION";
    String CONTENT = String.format(
      "Hello, %s, \n Welcome to FGC Combo Companion! \n Please click on the link below to verify your email address: \n %s",
      user.getName(),
      FRONTEND_URL + "?token=" + token
    );
    CreateEmailDto emailDTO = CreateEmailDto
      .builder()
      .subject(SUBJECT)
      .content(CONTENT)
      .emailTo(user.getEmail())
      .build();

    this.emailService.sendEmail(emailDTO);
    LocalDateTime oneDayFromNow = LocalDateTime.now().plusDays(1);
    return userEmailVerificationRepository.save(
      UserEmailVerification
        .builder()
        .token(token)
        .expiryDate(oneDayFromNow)
        .user(user)
        .build()
    );
  }

  @Override
  public User verifyEmail(UUID token) {
    UserEmailVerification userEmailVerification =
      this.userEmailVerificationRepository.findByToken(token)
        .orElseThrow(() -> new ResourceNotFoundException("Token not found!"));

    if (userEmailVerification.isExpired()) throw new BadRequestException(
      "Token expired!"
    );

    User user = userEmailVerification.getUser();
    if (user.getEmailVerified()) throw new BadRequestException(
      "User already verified!"
    );

    log.info("Verifying user email => {}", userEmailVerification);

    user.setEmailVerified(true);
    return this.userRepository.save(user);
  }
}
