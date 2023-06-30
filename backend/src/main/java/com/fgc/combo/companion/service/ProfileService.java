package com.fgc.combo.companion.service;

import java.util.UUID;

import com.fgc.combo.companion.dto.UserProfile;

public interface ProfileService {

  UserProfile getPublicProfileData(UUID userId);
}
