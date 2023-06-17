package com.fgc.combo.companion.service;

import com.fgc.combo.companion.dto.UserProfile;

public interface ProfileService {

  UserProfile getPublicProfileData(Long userId);
}
