package com.fgc.combo.companion.repository;

import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.fgc.combo.companion.model.Combo;
import com.fgc.combo.companion.model.User;

public interface ComboRepository extends JpaRepository<Combo, Long> {
    Page<Combo> findAllByOwner(User user, Pageable pageable);

    Optional<Combo> findByIdAndOwner(Long id, User owner);
}
