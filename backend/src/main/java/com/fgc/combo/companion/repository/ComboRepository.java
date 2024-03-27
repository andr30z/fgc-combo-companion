package com.fgc.combo.companion.repository;

import com.fgc.combo.companion.model.Combo;
import com.fgc.combo.companion.model.User;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface ComboRepository extends JpaRepository<Combo, UUID> {
  @EntityGraph(attributePaths = { "owner", "tags" })
  Page<Combo> findAllByOwner(User user, Pageable pageable);

  @EntityGraph(attributePaths = { "owner", "tags" })
  Optional<Combo> findByIdAndOwner(UUID id, User owner);

  @EntityGraph(attributePaths = { "owner", "tags" })
  @Query(
    "SELECT c FROM Combo c WHERE " +
    "c.owner = ?1 AND (" +
    "c.name ILIKE concat('%',COALESCE(?2, c.name),'%') OR " +
    "c.character ILIKE concat('%',COALESCE(?2, c.character),'%') OR " +
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
    "c.combo ILIKE concat('%',COALESCE(?1, c.combo),'%') OR " +
    "c.name ILIKE concat('%',COALESCE(?1, c.name),'%') OR " +
    "c.character ILIKE concat('%',COALESCE(?1, c.character),'%') OR " +
    "c.description ILIKE concat('%',COALESCE(?1, c.description),'%') ) order by c.createdAt DESC, c.name ASC"
  )
  Page<Combo> findAllBySearchParam(String searchParam, Pageable pageable);

  @EntityGraph(attributePaths = { "owner", "tags" })
  @Query(
    "SELECT c FROM Combo c WHERE " +
    "CAST(c.game as text) in ?2 AND " +
    "(c.combo ILIKE concat('%',COALESCE(?1, c.combo),'%') OR " +
    "c.name ILIKE concat('%',COALESCE(?1, c.name),'%') OR " +
    "c.character ILIKE concat('%',COALESCE(?1, c.character),'%') OR " +
    "c.description ILIKE concat('%',COALESCE(?1, c.description),'%') ) order by c.createdAt DESC, c.name ASC"
  )
  Page<Combo> findAllBySearchParamAndComboType(
    String searchParam,
    List<String> comboGameTypes,
    Pageable pageable
  );
}
