package com.fgc.combo.companion.config;

import java.util.Properties;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.JavaMailSenderImpl;

@Configuration
public class MailSenderConfig {

  private static final int GMAIL_SMTP_PORT = 587;

  @Value("${spring.mail.host}")
  private String host;

  @Value("${spring.mail.username}")
  private String username;

  @Value("${spring.mail.password}")
  private String password;

  @Bean
  JavaMailSender getJavaMailSender() {
    JavaMailSenderImpl mailSender = new JavaMailSenderImpl();
    mailSender.setHost(host);
    mailSender.setPort(GMAIL_SMTP_PORT);

    mailSender.setUsername(username);
    mailSender.setPassword(password);

    System.out.println(
      "--------------------------------------------------------"
    );
    System.out.println(username + "  -  " + password);
    System.out.println(
      "--------------------------------------------------------"
    );
    Properties props = mailSender.getJavaMailProperties();
    props.put("mail.transport.protocol", "smtp");
    props.put("mail.smtp.auth", "true");
    props.put("mail.smtp.starttls.enable", "true");
    return mailSender;
  }
}
