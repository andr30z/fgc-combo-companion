package com.fgc.combo.companion.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.fgc.combo.companion.model.Playlist;

public interface PlaylistRepository extends JpaRepository<Playlist, Long> {

}
