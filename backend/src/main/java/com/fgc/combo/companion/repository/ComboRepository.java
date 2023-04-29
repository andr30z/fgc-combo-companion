package com.fgc.combo.companion.repository;

import com.fgc.combo.companion.model.Combo;
import com.fgc.combo.companion.model.User;
import java.util.Optional;
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

  @EntityGraph(attributePaths = { "owner", "tags" })
  @Query(
    "SELECT c FROM Combo c WHERE " +
    "c.owner = ?1 AND (" +
    "c.name ILIKE concat('%',COALESCE(?2, c.name),'%') OR " +
    "c.description ILIKE concat('%',COALESCE(?2, c.description),'%') )"
  )
  Page<Combo> findAllByOwnerAndSearchParam(
    User owner,
    String searchParam,
    Pageable pageable
  );

  @EntityGraph(attributePaths = { "owner", "tags" })
  @Query(
    "SELECT c FROM Combo c WHERE (" +
    "c.name ILIKE concat('%',COALESCE(?1, c.name),'%') OR " +
    "c.description ILIKE concat('%',COALESCE(?1, c.description),'%') )"
  )
  Page<Combo> findAllBySearchParam(String searchParam, Pageable pageable);
}
