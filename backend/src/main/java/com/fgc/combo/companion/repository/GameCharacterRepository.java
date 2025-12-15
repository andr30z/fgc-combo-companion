package com.fgc.combo.companion.repository;

import java.util.Set;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.fgc.combo.companion.model.GameCharacter;

public interface GameCharacterRepository extends JpaRepository<GameCharacter, Long> {
    @Query(value = "SELECT * FROM game_characters WHERE game = CAST(:game as gametypes)", nativeQuery = true)
    Set<GameCharacter> findAllByGame(@Param("game") String game);
    
    @Query(value = "SELECT count(*) > 0 FROM game_characters WHERE game = CAST(:game as gametypes) AND code = :code", nativeQuery = true)
    boolean existsByCodeAndGame(String code, String game);

}
