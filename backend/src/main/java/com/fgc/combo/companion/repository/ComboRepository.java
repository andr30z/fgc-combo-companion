package com.fgc.combo.companion.repository;

import com.fgc.combo.companion.model.Combo;
import com.fgc.combo.companion.model.User;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ComboRepository extends JpaRepository<Combo, Long> {
  @EntityGraph(attributePaths = { "owner", "tags" })
  Page<Combo> findAllByOwner(User user, Pageable pageable);

  @EntityGraph(attributePaths = { "owner", "tags" })
  Optional<Combo> findByIdAndOwner(Long id, User owner);
}
