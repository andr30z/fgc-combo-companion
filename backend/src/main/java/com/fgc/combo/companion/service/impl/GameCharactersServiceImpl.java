package com.fgc.combo.companion.service.impl;

import java.util.Set;

import org.springframework.stereotype.Service;

import com.fgc.combo.companion.enums.ComboGameTypes;
import com.fgc.combo.companion.model.GameCharacter;
import com.fgc.combo.companion.repository.GameCharacterRepository;
import com.fgc.combo.companion.service.GameCharactersService;

@Service
public class GameCharactersServiceImpl implements GameCharactersService {

  private final GameCharacterRepository gameCharacterRepository;

  public GameCharactersServiceImpl(
      GameCharacterRepository gameCharacterRepository
  ) {
    this.gameCharacterRepository = gameCharacterRepository;
  }

  @Override
  public Set<GameCharacter> listGameCharactersByGame(ComboGameTypes comboGameType) {
    return this.gameCharacterRepository.findAllByGame(comboGameType.name());
  }

}
