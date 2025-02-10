package com.fgc.combo.companion.model;

import com.fgc.combo.companion.enums.ComboGameTypes;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name = "game_characters")
public class GameCharacter {

  @Id
  @Column(name = "id", updatable = false)
  private Long id;

  @Column(nullable = false)
  private String code;

  @Column(nullable = false)
  private String name;

  @Column(nullable = false)
  @Enumerated(EnumType.STRING)
  private ComboGameTypes game;

  public void setGame(String literalString) {
    this.game = ComboGameTypes.valueOf(literalString);
  }
}
