package com.fgc.combo.companion.repository;

import com.fgc.combo.companion.model.Combo;
import com.fgc.combo.companion.model.User;
import java.util.Optional;
import java.util.Set;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface ComboRepository extends JpaRepository<Combo, Long> {
  @EntityGraph(attributePaths = { "owner", "tags" })
  Page<Combo> findAllByOwner(User user, Pageable pageable);

  @EntityGraph(attributePaths = { "owner", "tags" })
  Optional<Combo> findByIdAndOwner(Long id, User owner);
 
  @EntityGraph(attributePaths = { "owner" })
  @Query(
    "SELECT c FROM Combo c JOIN c.tags t WHERE" +
    "(?1 IS NULL OR lower(c.name) like lower(concat('%',?1,'%'))) AND (?2 IS NULL OR lower(c.description) like lower(concat('%',?2,'%'))) AND (?3 IS NULL OR t.title in (?3))"
  
  )
  Page<Combo> findAllByNameAndDescriptionAndTags(
    String name,
    String description,
    Set<String> tags,
    Pageable pageable
  );
}
