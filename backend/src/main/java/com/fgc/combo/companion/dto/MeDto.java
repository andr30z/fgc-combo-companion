package com.fgc.combo.companion.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fgc.combo.companion.model.User;
import java.time.LocalDateTime;
import java.util.UUID;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MeDto {

  public MeDto(User user) {
    this.id = user.getId();
    this.name = user.getName();
    this.bio = user.getBio();
    this.twitterProfileUrl = user.getTwitterProfileUrl();
    this.instagramProfileUrl = user.getInstagramProfileUrl();
    this.youtubeChannelUrl = user.getYoutubeChannelUrl();
    this.createdAt = user.getCreatedAt();
    this.updatedAt = user.getUpdatedAt();
    this.isOAuthUser = user.getOAuthId() != null;
    this.emailVerified = user.getEmailVerified();
    this.email = user.getEmail();
  }

  private UUID id;
  private String name;
  private String bio;
  private String email;
  private String twitterProfileUrl;
  private String instagramProfileUrl;
  private String youtubeChannelUrl;
  private LocalDateTime createdAt;
  private LocalDateTime updatedAt;
  private boolean emailVerified;

  @JsonProperty(value = "isOAuthUser")
  private boolean isOAuthUser;
}
