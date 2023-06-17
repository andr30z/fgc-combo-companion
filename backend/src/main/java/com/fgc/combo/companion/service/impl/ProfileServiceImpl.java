package com.fgc.combo.companion.service.impl;

import com.fgc.combo.companion.dto.ComboResponseDTO;
import com.fgc.combo.companion.dto.PaginationResponse;
import com.fgc.combo.companion.dto.PlaylistResponseDTO;
import com.fgc.combo.companion.dto.UserProfile;
import com.fgc.combo.companion.mapper.ComboMapper;
import com.fgc.combo.companion.mapper.PlaylistMapper;
import com.fgc.combo.companion.model.User;
import com.fgc.combo.companion.service.ComboService;
import com.fgc.combo.companion.service.PlaylistService;
import com.fgc.combo.companion.service.ProfileService;
import com.fgc.combo.companion.service.UserService;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class ProfileServiceImpl implements ProfileService {

  private final UserService userService;
  private final ComboService comboService;
  private final PlaylistService playlistService;
  private final ComboMapper comboMapper;
  private final PlaylistMapper playlistMapper;

  public ProfileServiceImpl(
    UserService userService,
    ComboService comboService,
    PlaylistService playlistService,
    ComboMapper comboMapper,
    PlaylistMapper playlistMapper
  ) {
    this.userService = userService;
    this.comboService = comboService;
    this.playlistService = playlistService;
    this.comboMapper = comboMapper;
    this.playlistMapper = playlistMapper;
  }

  @Override
  public UserProfile getPublicProfileData(Long userId) {
    Pageable defaultPageable = Pageable.ofSize(10);
    User user = userService.findById(userId);
    PaginationResponse<PlaylistResponseDTO> playlistResponseDTO = playlistMapper.toPagination(
      playlistService.getByOwner(user, defaultPageable)
    );

    PaginationResponse<ComboResponseDTO> combResponseDTO = comboMapper.toPagination(
      comboService.getByOwner(user, defaultPageable)
    );

    return new UserProfile(user, playlistResponseDTO, combResponseDTO);
  }
}
