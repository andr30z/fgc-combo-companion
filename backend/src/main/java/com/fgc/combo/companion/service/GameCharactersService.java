package com.fgc.combo.companion.service;

import java.util.Set;

import com.fgc.combo.companion.enums.ComboGameTypes;
import com.fgc.combo.companion.model.GameCharacter;

public interface GameCharactersService {
  Set<GameCharacter> listGameCharactersByGame(ComboGameTypes game);
}
