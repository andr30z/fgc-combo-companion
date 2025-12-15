package com.fgc.combo.companion.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

import com.fgc.combo.companion.dto.CreateEmailDto;
import com.fgc.combo.companion.enums.MailStatus;
import com.fgc.combo.companion.model.Email;
import com.fgc.combo.companion.repository.EmailRepository;

import brevo.ApiException;
import brevoApi.TransactionalEmailsApi;
import brevoModel.SendSmtpEmail;
import brevoModel.SendSmtpEmailSender;
import brevoModel.SendSmtpEmailTo;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class EmailService {

	private final TransactionalEmailsApi transactionalEmailsApi;
	private final EmailRepository emailRepository;

	public EmailService(
			EmailRepository emailRepository,
			TransactionalEmailsApi transactionalEmailsApi) {
		this.emailRepository = emailRepository;
		this.transactionalEmailsApi = transactionalEmailsApi;
	}

	 
	public Email sendEmail(CreateEmailDto emailDto) {
		var email = new Email();

		BeanUtils.copyProperties(emailDto, email);
		email.setSendDateMail(LocalDateTime.now());
		try {
			var simpleMailMessage = new SendSmtpEmail();
			simpleMailMessage.sender(new SendSmtpEmailSender().email(email.getEmailFrom()));
			simpleMailMessage.to(List.of(new SendSmtpEmailTo().email(email.getEmailTo())));
			simpleMailMessage.setSubject(email.getSubject());
			simpleMailMessage.setTextContent(email.getContent());
			this.transactionalEmailsApi.sendTransacEmail(simpleMailMessage);
			email.setStatus(MailStatus.SENT.name());
		} catch (ApiException mailException) {
			email.setStatus(MailStatus.ERROR.name());
			log.error("Failed to send email", mailException);
			mailException.printStackTrace();
			log.info(mailException.getResponseBody());
		}
		return this.emailRepository.save(email);
	}
}
