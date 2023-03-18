package com.fgc.combo.companion.repository;

import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

import com.fgc.combo.companion.model.Playlist;
import com.fgc.combo.companion.model.User;

public interface PlaylistRepository extends JpaRepository<Playlist, Long> {
    @EntityGraph(attributePaths = { "owner" })
    Optional<Playlist> findByIdAndOwner(Long id, User owner);

    @EntityGraph(attributePaths = { "owner" })
    Page<Playlist> findByOwner(User owner, Pageable pageable);


    Long deleteByIdAndOwner(Long id, User owner);
}
