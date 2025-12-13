package com.fgc.combo.companion.service;

import java.util.Set;

import org.springframework.stereotype.Service;

import com.fgc.combo.companion.enums.ComboGameTypes;
import com.fgc.combo.companion.exception.BadRequestException;
import com.fgc.combo.companion.model.GameCharacter;
import com.fgc.combo.companion.repository.GameCharacterRepository;

@Service
public class GameCharactersService {

  private final GameCharacterRepository gameCharacterRepository;

  public GameCharactersService(
      GameCharacterRepository gameCharacterRepository) {
    this.gameCharacterRepository = gameCharacterRepository;
  }

  public Set<GameCharacter> listGameCharactersByGame(ComboGameTypes comboGameType) {
    return this.gameCharacterRepository.findAllByGame(comboGameType.name());
  }

  public boolean isGameCharacterValid(String comboCharacter, String comboGameType) {
    if (!this.gameCharacterRepository.existsByCodeAndGame(comboCharacter, comboGameType)) {
      throw new BadRequestException("Game Character does not exists!");
    }

    return true;
  }

}
