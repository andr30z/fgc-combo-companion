package com.fgc.combo.companion.controller;

import java.util.Set;

import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.fgc.combo.companion.enums.ComboGameTypes;
import com.fgc.combo.companion.model.GameCharacter;
import com.fgc.combo.companion.service.GameCharactersService;
import com.fgc.combo.companion.validation.ValueOfEnum;

import jakarta.validation.constraints.NotEmpty;

@RequestMapping("/api/v1/game-characters")
@RestController
public class GameCharacterController {

  private final GameCharactersService gameCharactersService;

  public GameCharacterController(GameCharactersService gameCharactersService) {
    this.gameCharactersService = gameCharactersService;
  }

  @GetMapping
  public Set<GameCharacter> findAllByGame(
      @Validated @NotEmpty @RequestParam @ValueOfEnum(enumClass = ComboGameTypes.class, message = "must be one of: "
          + ComboGameTypes.Constants.ALL_GAME_TYPES) String game) {
    return this.gameCharactersService.listGameCharactersByGame(ComboGameTypes.valueOf(game));
  }

}
