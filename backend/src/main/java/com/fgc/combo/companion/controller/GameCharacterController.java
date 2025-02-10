package com.fgc.combo.companion.controller;

import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.fgc.combo.companion.dto.ListOfCharactersDto;
import com.fgc.combo.companion.enums.ComboGameTypes;
import com.fgc.combo.companion.service.GameCharactersService;
import com.fgc.combo.companion.validation.ValueOfEnum;

@RequestMapping("/api/v1/game-characters")
@RestController
@Validated
public class GameCharacterController {

  private final GameCharactersService gameCharactersService;

  public GameCharacterController(GameCharactersService gameCharactersService) {
    this.gameCharactersService = gameCharactersService;
  }

  @GetMapping
  public ListOfCharactersDto findAllByGame(
      @RequestParam(required = true) @ValueOfEnum(enumClass = ComboGameTypes.class, message = "game must be one of: "
          + ComboGameTypes.Constants.ALL_GAME_TYPES) String game) {
    ComboGameTypes comboGameType = ComboGameTypes.valueOf(game);
    return new ListOfCharactersDto(
        this.gameCharactersService.listGameCharactersByGame(comboGameType));
  }

}
