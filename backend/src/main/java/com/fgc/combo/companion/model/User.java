package com.fgc.combo.companion.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import java.time.LocalDateTime;
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
@Table(name = "users")
public class User {

  @Id
  @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "user_seq")
  @SequenceGenerator(
    name = "user_seq",
    sequenceName = "user_seq",
    allocationSize = 1
  )
  @Column(name = "id", updatable = false)
  private Long id;

  @Column(unique = true)
  private String email;

  @Column(name = "auth_provider")
  private String authProvider;

  @Column(name = "email_verified")
  private Boolean emailVerified;

  private String name;

  @CreationTimestamp
  @Temporal(TemporalType.TIMESTAMP)
  @Column(name = "created_at")
  LocalDateTime createdAt;

  @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
  private String password;
}
