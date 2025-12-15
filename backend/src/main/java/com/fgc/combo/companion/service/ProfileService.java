package com.fgc.combo.companion.service;

import java.util.UUID;

import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.fgc.combo.companion.dto.ComboResponseDto;
import com.fgc.combo.companion.dto.PaginationResponse;
import com.fgc.combo.companion.dto.PlaylistResponseDto;
import com.fgc.combo.companion.dto.UserProfile;
import com.fgc.combo.companion.mapper.ComboMapper;
import com.fgc.combo.companion.mapper.PlaylistMapper;
import com.fgc.combo.companion.model.User;

@Service
public class ProfileService {

  private final UserService userService;
  private final ComboService comboService;
  private final PlaylistService playlistService;
  private final ComboMapper comboMapper;
  private final PlaylistMapper playlistMapper;

  public ProfileService(
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

   
  public UserProfile getPublicProfileData(UUID userId) {
    Pageable defaultPageable = Pageable.ofSize(10);
    User user = userService.findById(userId);
    PaginationResponse<PlaylistResponseDto> playlistResponseDTO = playlistMapper.toPagination(
      playlistService.getByOwner(user, defaultPageable)
    );

    PaginationResponse<ComboResponseDto> combResponseDTO = comboMapper.toPagination(
      comboService.getByOwner(user, defaultPageable)
    );

    return new UserProfile(user, playlistResponseDTO, combResponseDTO);
  }
}
