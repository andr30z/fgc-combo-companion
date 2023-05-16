package com.fgc.combo.companion.enums;

public enum ComboGameTypes {
  TEKKEN_7,
  SFV,
  STREET_FIGHTER_6,
  GUILTY_GEAR_STRIVE,
  KOF_XV;

  public static class Constants {

    public static final String TEKKEN_7 = "TEKKEN_7";
    public static final String SFV = "SFV";
    public static final String STREET_FIGHTER_6 = "STREET_FIGHTER_6";
    public static final String GUILTY_GEAR_STRIVE = "GUILTY_GEAR_STRIVE";
    public static final String KOF_XV = "KOF_XV";

    public static final String ALL_GAME_TYPES =
      TEKKEN_7 +
      ", " +
      SFV +
      ", " +
      GUILTY_GEAR_STRIVE +
      ", " +
      KOF_XV +
      ", " +
      STREET_FIGHTER_6;
  }
}
