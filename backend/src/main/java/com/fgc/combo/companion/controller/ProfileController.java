package com.fgc.combo.companion.controller;

import com.fgc.combo.companion.dto.UserProfile;
import com.fgc.combo.companion.service.ProfileService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/profile")
public class ProfileController {

  private final ProfileService profileService;

  public ProfileController(ProfileService profileService) {
    this.profileService = profileService;
  }

  @GetMapping("/{userId}")
  public UserProfile getProfileData(@PathVariable Long userId) {
    return this.profileService.getPublicProfileData(userId);
  }
}
