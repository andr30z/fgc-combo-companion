package com.fgc.combo.companion.service.impl;

import com.fgc.combo.companion.dto.CreateEmailDto;
import com.fgc.combo.companion.enums.MailStatus;
import com.fgc.combo.companion.model.Email;
import com.fgc.combo.companion.repository.EmailRepository;
import com.fgc.combo.companion.service.EmailService;
import java.time.LocalDateTime;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.BeanUtils;
import org.springframework.mail.MailException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Slf4j
@Service
public class EmailServiceImpl implements EmailService {

  private final JavaMailSender javaMailSender;
  private final EmailRepository emailRepository;

  public EmailServiceImpl(
    EmailRepository emailRepository,
    JavaMailSender javaMailSender
  ) {
    this.emailRepository = emailRepository;
    this.javaMailSender = javaMailSender;
  }

  @Override
  public Email sendEmail(CreateEmailDto emailDto) {
    var email = new Email();

    BeanUtils.copyProperties(emailDto, email);
    email.setSendDateMail(LocalDateTime.now());
    try {
      var simpleMailMessage = new SimpleMailMessage();
      simpleMailMessage.setFrom(email.getEmailFrom());
      simpleMailMessage.setTo(email.getEmailTo());
      simpleMailMessage.setSubject(email.getSubject());
      simpleMailMessage.setText(email.getContent());
      this.javaMailSender.send(simpleMailMessage);
      email.setStatus(MailStatus.SENT.name());
    } catch (MailException mailException) {
      email.setStatus(MailStatus.ERROR.name());
      log.error("Failed to send email", mailException);
    }
    return this.emailRepository.save(email);
  }
}
