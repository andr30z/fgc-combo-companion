package com.fgc.combo.companion.repository;

import com.fgc.combo.companion.model.Playlist;
import com.fgc.combo.companion.model.User;
import java.util.Optional;
import java.util.Set;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface PlaylistRepository extends JpaRepository<Playlist, Long> {
  @EntityGraph(attributePaths = { "owner", "tags" })
  Optional<Playlist> findByIdAndOwner(Long id, User owner);

  @EntityGraph(attributePaths = { "owner", "tags" })
  Page<Playlist> findByOwner(User owner, Pageable pageable);

  Long deleteByIdAndOwner(Long id, User owner);

  @EntityGraph(attributePaths = { "owner", "tags" })	
  @Query(
    "SELECT p FROM Tag t left join t.playlist p WHERE" +
    "(?1 IS NULL OR lower(p.name) like lower(concat('%',?1,'%'))) AND (?2 IS NULL OR lower(p.description) like lower(concat('%',?2,'%'))) AND (?3 IS NULL OR t.title in (?3))"
  )
  Page<Playlist> findAllByNameAndDescriptionAndTags(
    String name,
    String description,
    Set<String> tags,
    Pageable pageable
  );
}
