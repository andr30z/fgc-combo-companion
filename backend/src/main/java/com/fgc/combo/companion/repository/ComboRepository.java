package com.fgc.combo.companion.repository;

import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.fgc.combo.companion.model.Combo;
import com.fgc.combo.companion.model.User;

public interface ComboRepository extends JpaRepository<Combo, Long> {
  @EntityGraph(attributePaths = { "owner", "tags" })
  Page<Combo> findAllByOwner(User user, Pageable pageable);

  @EntityGraph(attributePaths = { "owner", "tags" })
  Optional<Combo> findByIdAndOwner(Long id, User owner);

  @EntityGraph(attributePaths = { "owner" })
  @Query("SELECT DISTINCT c FROM Combo c, Tag t WHERE" +
      ":name IS NULL OR (" +
      "lower(c.name) LIKE lower(concat('%',COALESCE(:name, c.name),'%'))" +
      "OR ((t.combo = c AND "
      + "lower(t.title) like lower(concat('%',COALESCE(:name, t.title),'%')))))")
  Page<Combo> findAllByComboNameAndTagName(
      @Param("name") String name,
      Pageable pageable);
}
