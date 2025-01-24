package com.fgc.combo.companion.repository;

import java.util.Set;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.fgc.combo.companion.enums.ComboGameTypes;
import com.fgc.combo.companion.model.GameCharacter;
import com.fgc.combo.companion.model.User;

public interface GameCharacterRepository extends JpaRepository<GameCharacter, Long> {
  Set<GameCharacter> findAllByGame(String game);
}
