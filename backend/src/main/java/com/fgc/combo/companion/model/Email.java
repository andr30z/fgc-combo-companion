package com.fgc.combo.companion.model;

import com.fgc.combo.companion.enums.MailStatus;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;
import java.time.LocalDateTime;

import org.hibernate.annotations.ColumnTransformer;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@NoArgsConstructor
@AllArgsConstructor
@ToString
@Getter
@Setter
@Entity
@Table(name = "emails")
public class Email {

  @Id
  @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "emails_seq")
  @SequenceGenerator(
    name = "emails_seq",
    sequenceName = "emails_seq",
    allocationSize = 1
  )
  @Column(name = "id", updatable = false)
  private Long id;

  private String emailFrom;
  private String emailTo;
  private String subject;

  @Column(columnDefinition = "TEXT")
  private String content;

  private LocalDateTime sendDateMail;

  @Column(name = "status")
  @Enumerated(EnumType.STRING)
  @ColumnTransformer(write = "?::mailstatustypes")
  private MailStatus status;
}
