package com.fgc.combo.companion.dto;

import java.util.Set;

import com.fgc.combo.companion.model.GameCharacter;

public record ListOfCharactersDto(Set<GameCharacter> characters) {

}
