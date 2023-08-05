package com.fgc.combo.companion.utils;

import static org.junit.jupiter.api.Assertions.assertAll;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;

import com.fgc.combo.companion.enums.ComboGameTypes;
import com.fgc.combo.companion.enums.GuiltyGearStriveCharacters;
import com.fgc.combo.companion.enums.StreetFighter6Characters;
import com.fgc.combo.companion.enums.Tekken7Characters;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.junit.jupiter.MockitoExtension;

@ExtendWith(MockitoExtension.class)
public class ComboCharactersValidationTests {

  private <E extends Enum<E>> boolean assertAllCharactersAreFromGame(
    E[] characterList,
    ComboGameTypes gameType
  ) {
    for (E character : characterList) {
      if (
        !ComboCharactersValidation.isComboCharacterValid(
          character.name(),
          gameType.name()
        )
      ) {
        return false;
      }
    }
    return true;
  }

  @Test
  public void assertThatAllCharactersAreFromCorrectGameType() {
    assertAll(
      "Characters are valid",
      () ->
        assertTrue(
          this.assertAllCharactersAreFromGame(
              Tekken7Characters.values(),
              ComboGameTypes.TEKKEN_7
            )
        ),
      () ->
        assertTrue(
          this.assertAllCharactersAreFromGame(
              StreetFighter6Characters.values(),
              ComboGameTypes.STREET_FIGHTER_6
            )
        ),
      () ->
        assertTrue(
          this.assertAllCharactersAreFromGame(
              GuiltyGearStriveCharacters.values(),
              ComboGameTypes.GUILTY_GEAR_STRIVE
            )
        )
    );
  }

  @Test
  public void assertThatCharactersAreNotFromGameType() {
    assertAll(
      "Characters are invalid",
      () ->
        assertFalse(
          this.assertAllCharactersAreFromGame(
              StreetFighter6Characters.values(),
              ComboGameTypes.GUILTY_GEAR_STRIVE
            )
        ),
      () ->
        assertFalse(
          this.assertAllCharactersAreFromGame(
              GuiltyGearStriveCharacters.values(),
              ComboGameTypes.STREET_FIGHTER_6
            )
        )
    );
  }
}
