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
  Page<Playlist> findAllByNameContainingIgnoreCaseOrTagsTitleInIgnoreCase(
    String name,
    Set<String> tagTitle,
    Pageable pageable
  );
  // @Query("SELECT DISTINCT p FROM Playlist p, Tag t WHERE" +
  // "(:name IS NULL OR lower(p.name) like lower(concat('%',:name,'%'))) AND" +
  // " (:description IS NULL OR lower(p.description) like
  // lower(concat('%',:description,'%')))"
  // + " AND (:tagTitles IS NULL OR (t.playlist = p AND lower(t.title) in
  // :tagTitles))")
  // Page<Playlist> findAllByNameAndDescriptionAndTags(
  // @Param("tagTitles") Set<String> tags,
  // @Param("name") String name,
  // Pageable pageable);
}
