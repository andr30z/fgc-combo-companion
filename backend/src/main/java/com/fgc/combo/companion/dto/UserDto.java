package com.fgc.combo.companion.dto;

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
public class UserDto {

  public UserDto(User user) {
    this.id = user.getId();
    this.name = user.getName();
    this.bio = user.getBio();
    this.twitterProfileUrl = user.getTwitterProfileUrl();
    this.instagramProfileUrl = user.getInstagramProfileUrl();
    this.youtubeChannelUrl = user.getYoutubeChannelUrl();
    this.createdAt = user.getCreatedAt();
  }

  private UUID id;
  private String name;
  private String bio;
  private String twitterProfileUrl;
  private String instagramProfileUrl;
  private String youtubeChannelUrl;
  private LocalDateTime createdAt;
}
