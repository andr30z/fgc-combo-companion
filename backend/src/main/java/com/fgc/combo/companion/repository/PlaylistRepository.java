package com.fgc.combo.companion.repository;

import com.fgc.combo.companion.model.Playlist;
import com.fgc.combo.companion.model.User;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface PlaylistRepository extends JpaRepository<Playlist, Long> {
  @EntityGraph(attributePaths = { "owner", "tags" })
  Optional<Playlist> findByIdAndOwner(Long id, User owner);

  @EntityGraph(attributePaths = { "owner", "tags" })
  Page<Playlist> findByOwner(User owner, Pageable pageable);

  Long deleteByIdAndOwner(Long id, User owner);

  @EntityGraph(attributePaths = { "owner", "tags", "playlistCombos.combo" })
  @Query(
    "SELECT DISTINCT p FROM Playlist p, Tag t WHERE" +
    "?1 IS NULL OR (" +
    "lower(p.name) LIKE concat('%',lower(COALESCE(?1, p.name)),'%') " +
    "OR (t.playlist.id = p.id AND " +
    "lower(t.title) like concat('%',lower(COALESCE(?1, t.title)),'%')))"
  )
  Page<Playlist> findAllByComboNameAndTagName(
    @Param("name") String name,
    Pageable pageable
  );

  @EntityGraph(attributePaths = { "owner", "tags", "playlistCombos.combo" })
  @Query(
    "SELECT p FROM Playlist p WHERE " +
    "p.owner = ?1 AND (" +
    "p.name ILIKE concat('%',COALESCE(?2, p.name),'%') OR " +
    "p.description ILIKE concat('%',COALESCE(?2, p.description),'%') )"
  )
  Page<Playlist> findAllByOnwerAndSearchParam(
    User owner,
    String searchParam,
    Pageable pageable
  );
}
