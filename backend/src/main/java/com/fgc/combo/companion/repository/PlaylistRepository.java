package com.fgc.combo.companion.repository;

import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.fgc.combo.companion.model.Playlist;
import com.fgc.combo.companion.model.User;

public interface PlaylistRepository extends JpaRepository<Playlist, Long> {
        @EntityGraph(attributePaths = { "owner", "tags" })
        Optional<Playlist> findByIdAndOwner(Long id, User owner);

        @EntityGraph(attributePaths = { "owner", "tags" })
        Page<Playlist> findByOwner(User owner, Pageable pageable);

        Long deleteByIdAndOwner(Long id, User owner);

        @EntityGraph(attributePaths = { "owner", "tags" })
        @Query("SELECT DISTINCT p FROM Playlist p, Tag t WHERE" +
                        ":name IS NULL OR (" +
                        "lower(p.name) LIKE lower(concat('%',COALESCE(:name, p.name),'%'))" +
                        "OR ((t.playlist = p AND "
                        + "lower(t.title) like lower(concat('%',COALESCE(:name, t.title),'%')))))")
        Page<Playlist> findAllByComboNameAndTagName(
                        @Param("name") String name,
                        Pageable pageable);

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
