package com.fgc.combo.companion.utils;

import com.fgc.combo.companion.enums.ComboGameTypes;
import com.fgc.combo.companion.enums.DragonBallFighterZCharacters;
import com.fgc.combo.companion.enums.GuiltyGearStriveCharacters;
import com.fgc.combo.companion.enums.StreetFighter6Characters;
import com.fgc.combo.companion.enums.Tekken7Characters;
import java.util.Arrays;
import java.util.List;
import java.util.Map;

public class ComboCharactersValidation {

  private static final Map<ComboGameTypes, List<String>> validComboCharacters = Map.ofEntries(
    Map.entry(
      ComboGameTypes.TEKKEN_7,
      Arrays
        .asList(Tekken7Characters.values())
        .stream()
        .map(Tekken7Characters::name)
        .toList()
    ),
    Map.entry(
      ComboGameTypes.STREET_FIGHTER_6,
      Arrays
        .asList(StreetFighter6Characters.values())
        .stream()
        .map(StreetFighter6Characters::name)
        .toList()
    ),
    Map.entry(
      ComboGameTypes.GUILTY_GEAR_STRIVE,
      Arrays
        .asList(GuiltyGearStriveCharacters.values())
        .stream()
        .map(GuiltyGearStriveCharacters::name)
        .toList()
    ),
    Map.entry(
      ComboGameTypes.DB_FIGHTERZ,
      Arrays
        .asList(DragonBallFighterZCharacters.values())
        .stream()
        .map(DragonBallFighterZCharacters::name)
        .toList()
    )

  );

  public static boolean isComboCharacterValid(
    String comboCharacter,
    String comboGameType
  ) {
    try {
      return validComboCharacters
        .get(ComboGameTypes.valueOf(comboGameType))
        .contains(comboCharacter);
    } catch (Exception e) {
      //heheheboy
      return false;
    }
  }
}
