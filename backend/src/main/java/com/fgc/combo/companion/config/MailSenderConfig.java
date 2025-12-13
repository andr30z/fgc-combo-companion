package com.fgc.combo.companion.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import brevo.ApiClient;
import brevo.auth.ApiKeyAuth;
import brevoApi.TransactionalEmailsApi;

@Configuration
public class MailSenderConfig {

  @Value("${brevo.api.key:test}")
  private String brevoKey;

  @Bean
  TransactionalEmailsApi getMailSender() {
    ApiClient defaultClient = brevo.Configuration.getDefaultApiClient();

    // Configure API key authorization: api-key
    ApiKeyAuth apiKey = (ApiKeyAuth) defaultClient.getAuthentication("api-key");
    apiKey.setApiKey(brevoKey);

    TransactionalEmailsApi apiInstance = new TransactionalEmailsApi();
    apiInstance.setApiClient(defaultClient);
    return apiInstance;
  }
}
