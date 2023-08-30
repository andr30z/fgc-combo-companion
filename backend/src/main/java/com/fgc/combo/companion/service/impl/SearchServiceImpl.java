package com.fgc.combo.companion.service.impl;

import com.fgc.combo.companion.dto.ComboResponseDto;
import com.fgc.combo.companion.dto.PlaylistResponseDto;
import com.fgc.combo.companion.dto.SearchAllResourcesDto;
import com.fgc.combo.companion.dto.UserDto;
import com.fgc.combo.companion.mapper.ComboMapper;
import com.fgc.combo.companion.mapper.PlaylistMapper;
import com.fgc.combo.companion.model.Combo;
import com.fgc.combo.companion.model.Playlist;
import com.fgc.combo.companion.model.User;
import com.fgc.combo.companion.repository.ComboRepository;
import com.fgc.combo.companion.repository.PlaylistRepository;
import com.fgc.combo.companion.repository.UserRepository;
import com.fgc.combo.companion.service.SearchService;
import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class SearchServiceImpl implements SearchService {

  private final UserRepository userRepository;
  private final ComboRepository comboRepository;
  private final PlaylistRepository playlistRepository;
  private final PlaylistMapper playlistMapper;
  private final ComboMapper comboMapper;

  private static final int MAX_PAGEABLE_SIZE = 15;

  public SearchServiceImpl(
    UserRepository userRepository,
    ComboRepository comboRepository,
    PlaylistRepository playlistRepository,
    PlaylistMapper playlistMapper,
    ComboMapper comboMapper
  ) {
    this.userRepository = userRepository;
    this.comboRepository = comboRepository;
    this.playlistRepository = playlistRepository;
    this.playlistMapper = playlistMapper;
    this.comboMapper = comboMapper;
  }

  @Override
  public SearchAllResourcesDto searchAllResources(
    String search,
    List<String> comboGameTypes
  ) {
    Pageable pageable = Pageable.ofSize(MAX_PAGEABLE_SIZE);
    List<User> users = this.userRepository.findAllByName(search, pageable);
    Page<Combo> combos = comboGameTypes.isEmpty()
      ? this.comboRepository.findAllBySearchParam(search, pageable)
      : this.comboRepository.findAllBySearchParamAndComboType(
          search,
          comboGameTypes,
          pageable
        );
    Page<Playlist> playlists =
      this.playlistRepository.findAllBySearchParam(search, pageable);

    return new SearchAllResourcesDto(
      users.stream().map(UserDto::new).toList(),
      this.comboMapper.toDto(combos.getContent(), ComboResponseDto.class),
      this.playlistMapper.toDto(
          playlists.getContent(),
          PlaylistResponseDto.class
        )
    );
  }
}
