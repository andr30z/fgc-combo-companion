package com.fgc.combo.companion.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import java.time.LocalDateTime;
import java.util.UUID;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Table(name = "user_email_verifications")
public class UserEmailVerification {

  @Id
  @GeneratedValue(
    strategy = GenerationType.SEQUENCE,
    generator = "user_email_verifications_seq"
  )
  @SequenceGenerator(
    name = "user_email_verifications_seq",
    sequenceName = "user_email_verifications_seq",
    allocationSize = 1
  )
  private Long id;

  private UUID token;

  @OneToOne(targetEntity = User.class, fetch = FetchType.EAGER)
  @JoinColumn(nullable = false, name = "user_id")
  private User user;

  @Column(nullable = false, name = "expiry_date")
  private LocalDateTime expiryDate;

  @CreationTimestamp
  @Temporal(TemporalType.TIMESTAMP)
  @Column(name = "created_at")
  LocalDateTime createdAt;

  public boolean isExpired() {
    return LocalDateTime.now().isAfter(expiryDate);
  }
}
