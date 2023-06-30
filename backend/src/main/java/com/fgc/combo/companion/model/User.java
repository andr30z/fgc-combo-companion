package com.fgc.combo.companion.model;

import java.time.LocalDateTime;
import java.util.UUID;

import org.hibernate.annotations.ColumnTransformer;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fgc.combo.companion.enums.OAuthTypes;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Table(name = "users")
public class User {

  @Id
  @GeneratedValue(strategy = GenerationType.UUID)
  @Column(name = "id", updatable = false)
  private UUID id;

  @Column(unique = true)
  private String email;

  @Column(name = "auth_provider")
  @Enumerated(EnumType.STRING)
  @ColumnTransformer(write = "?::oauthtypes")
  private OAuthTypes authProvider;

  @Column(name = "email_verified")
  private Boolean emailVerified;

  private String name;

  @Column(name = "oauth_id")
  private String oAuthId;

  @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
  private String password;

  private String bio;

  @Column(name = "twitter_profile_url")
  private String twitterProfileUrl;

  @Column(name = "instagram_profile_url")
  private String instagramProfileUrl;

  @Column(name = "youtube_channel_url")
  private String youtubeChannelUrl;

  @UpdateTimestamp
  @Temporal(TemporalType.TIMESTAMP)
  @Column(name = "updated_at")
  LocalDateTime updatedAt;

  @CreationTimestamp
  @Temporal(TemporalType.TIMESTAMP)
  @Column(name = "created_at")
  LocalDateTime createdAt;

  public void setAuthProvider(String authProvider) {
    this.authProvider =
      authProvider == null ? null : OAuthTypes.valueOf(authProvider);
  }
}
