package com.fgc.combo.companion.service.impl;

import org.springframework.stereotype.Service;

import com.fgc.combo.companion.dto.CreatePlaylistDTO;
import com.fgc.combo.companion.dto.PlaylistResponseDTO;
import com.fgc.combo.companion.mapper.PlaylistMapper;
import com.fgc.combo.companion.model.User;
import com.fgc.combo.companion.repository.PlaylistRepository;
import com.fgc.combo.companion.service.PlaylistService;
import com.fgc.combo.companion.service.UserService;

@Service
public class PlaylistServiceImpl implements PlaylistService {

    private final PlaylistRepository playlistRepository;
    private final PlaylistMapper playlistMapper;
    private final UserService userService;

    public PlaylistServiceImpl(PlaylistRepository playlistRepository, PlaylistMapper playlistMapper,
            UserService userService) {
        this.playlistRepository = playlistRepository;
        this.playlistMapper = playlistMapper;
        this.userService = userService;
    }

    @Override
    public PlaylistResponseDTO create(CreatePlaylistDTO playlistDTO) {
        User current = userService.me();

        throw new UnsupportedOperationException("Unimplemented method 'create'");
    }

}
