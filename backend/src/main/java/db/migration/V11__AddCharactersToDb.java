package db.migration;

import java.sql.Connection;
import java.sql.Statement;
import java.util.List;

import org.flywaydb.core.api.migration.BaseJavaMigration;
import org.flywaydb.core.api.migration.Context;

import com.fgc.combo.companion.enums.ComboGameTypes;
import com.fgc.combo.companion.enums.DragonBallFighterZCharacters;
import com.fgc.combo.companion.enums.GuiltyGearStriveCharacters;
import com.fgc.combo.companion.enums.StreetFighter6Characters;
import com.fgc.combo.companion.enums.Tekken7Characters;
import com.fgc.combo.companion.enums.Tekken8Characters;

public class V11__AddCharactersToDb extends BaseJavaMigration {
  public record Character(String code, String name) {
  }

  private static final List<Character> CHARACTERS = List.of(
      new Character("AKUMA", "Akuma"),
      new Character("ALISA", "Alisa"),
      new Character("ANNA", "Anna"),
      new Character("ARMOR_KING", "Armor King"),
      new Character("ASUKA", "Asuka"),
      new Character("BOB", "Bob"),
      new Character("BRYAN", "Bryan"),
      new Character("CLAUDIO", "Claudio"),
      new Character("DEVIL_JIN", "Devil Jin"),
      new Character("DRAGUNOV", "Dragunov"),
      new Character("EDDY", "Eddy"),
      new Character("ELIZA", "Eliza"),
      new Character("FAHKUMRAM", "Fahkumram"),
      new Character("FENG", "Feng"),
      new Character("GANRYU", "Ganryu"),
      new Character("GEESE", "Geese"),
      new Character("GIGAS", "Gigas"),
      new Character("HEIHACHI", "Heihachi"),
      new Character("HWOARANG", "Hwoarang"),
      new Character("JACK_7", "Jack 7"),
      new Character("JIN", "Jin"),
      new Character("JOSIE", "Josie"),
      new Character("JULIA", "Julia"),
      new Character("KATARINA", "Katarina"),
      new Character("KAZUMI", "Kazumi"),
      new Character("KAZUYA", "Kazuya"),
      new Character("KING", "King"),
      new Character("KUMA", "Kuma"),
      new Character("KUNIMITSU", "Kunimitsu"),
      new Character("LARS", "Lars"),
      new Character("LAW", "Law"),
      new Character("LEE", "Lee"),
      new Character("LEI", "Lei"),
      new Character("LEO", "Leo"),
      new Character("LEROY", "Leroy"),
      new Character("LIDIA", "Lidia"),
      new Character("LILI", "Lili"),
      new Character("LUCKY_CHLOE", "Lucky Chloe"),
      new Character("MARDUK", "Marduk"),
      new Character("MASTER_RAVEN", "Master Raven"),
      new Character("MIGUEL", "Miguel"),
      new Character("NEGAN", "Negan"),
      new Character("NINA", "Nina"),
      new Character("NOCTIS", "Noctis"),
      new Character("PANDA", "Panda"),
      new Character("PAUL", "Paul"),
      new Character("SHAHEEN", "Shaheen"),
      new Character("STEVE", "Steve"),
      new Character("XIAOYU", "Xiaoyu"),
      new Character("YOSHIMITSU", "Yoshimitsu"),
      new Character("ZAFINA", "Zafina"),
      new Character("KAZUYA", "Kazuya"),
      new Character("JIN", "Jin"),
      new Character("KING", "King"),
      new Character("JUN", "Jun"),
      new Character("PAUL_PHOENIX", "Paul Phoenix"),
      new Character("LAW", "Law"),
      new Character("JACK8", "Jack 8"),
      new Character("LARS", "Lars"),
      new Character("XIAOYU", "Xiaoyu"),
      new Character("NINA", "Nina"),
      new Character("LEROY", "Leroy"),
      new Character("ASUKA", "Asuka"),
      new Character("LILI", "Lili"),
      new Character("BRYAN", "Bryan"),
      new Character("HWOARANG", "Hwoarang"),
      new Character("CLAUDIO", "Claudio"),
      new Character("AZUCENA", "Azucena"),
      new Character("RAVEN", "Raven"),
      new Character("LEO", "Leo"),
      new Character("STEVE", "Steve"),
      new Character("KUMA", "Kuma"),
      new Character("YOSHIMITSU", "Yoshimitsu"),
      new Character("SHAHEEN", "Shaheen"),
      new Character("DRAGUNOV", "Dragunov"),
      new Character("FENG", "Feng"),
      new Character("PANDA", "Panda"),
      new Character("LEE", "Lee"),
      new Character("ALISA", "Alisa"),
      new Character("ZAFINA", "Zafina"),
      new Character("DEVIL_JIN", "Devil Jin"),
      new Character("VICTOR", "Victor"),
      new Character("REINA", "Reina"),
      new Character("EDDY", "Eddy"),
      new Character("LIDIA_SOBIESKA", "Lidia Sobieska"),
      new Character("HEIHACHI", "Heihachi"),
      new Character("CLIVE_ROSFIELD", "Clive Rosfield"),
      new Character("ED", "ED"),
      new Character("M_BISON", "M. Bison"),
      new Character("TERRY", "Terry"),
      new Character("BLANKA", "Blanka"),
      new Character("CAMMY", "Cammy"),
      new Character("CHUN_LI", "Chun Li"),
      new Character("DEE_JAY", "Dee Jay"),
      new Character("DHALSIM", "Dhalsim"),
      new Character("E_HONDA", "E. Honda"),
      new Character("GUILE", "Guile"),
      new Character("JAMIE", "Jamie"),
      new Character("JP", "JP"),
      new Character("JURI", "Juri"),
      new Character("KEN", "Ken"),
      new Character("KIMBERLY", "Kimberly"),
      new Character("LILY", "Lily"),
      new Character("LUKE", "Luke"),
      new Character("MANON", "Manon"),
      new Character("MARISA", "Marisa"),
      new Character("RYU", "Ryu"),
      new Character("ZANGIEF", "Zangief"),
      new Character("RASHID", "Rashid"),
      new Character("AKI", "A.K.I"),
      new Character("AKUMA", "AKUMA"),
      new Character("SOL_BADGUY", "Sol Badguy"),
      new Character("ABA", "A.B.A"),
      new Character("SLAYER", "Slayer"),
      new Character("KY_KISKE", "Ky Kiske"),
      new Character("MAY", "May"),
      new Character("FAUST", "Faust"),
      new Character("POTEMKIN", "Potemkin"),
      new Character("CHIPP_ZANUFF", "Chipp Zanuff"),
      new Character("ZATO_ONE", "Zato ONE"),
      new Character("MILLIA_RAGE", "Millia Rage"),
      new Character("AXL_LOW", "Axl Low"),
      new Character("TESTAMENT", "Testament"),
      new Character("BAIKEN", "Baiken"),
      new Character("ANJI_MITO", "Anji Mito"),
      new Character("BRIDGET", "Bridget"),
      new Character("I_NO", "I-No"),
      new Character("SIN_KISKE", "Sin Kiske"),
      new Character("LEO_WHITEFANG", "Leo Whitefang"),
      new Character("RAMLETHAL_VALENTINE", "Ramlethal Valentine"),
      new Character("JACK_O_VALENTINE", "Jack O' Valentine"),
      new Character("GIOVANNA", "Giovanna"),
      new Character("NAGORIYUKI", "Nagoriyuki"),
      new Character("GOLDLEWIS_DICKINSON", "Goldlewis Dickinson"),
      new Character("HAPPY_CHAOS", "Happy Chaos"),
      new Character("BEDMAN", "Bedman?"),
      new Character("ASUKA_R_KREUTZ", "Asuka R Kreutz"),
      new Character("JOHNNY", "Johnny"),
      new Character("ELPHELT", "Elphelt"),
      new Character("DIZZY", "Dizzy"),
      new Character("ANDROID_16", "Android 16"),
      new Character("ANDROID_17", "Android 17"),
      new Character("ANDROID_18", "Android 18"),
      new Character("ANDROID_21", "Android 21"),
      new Character("ANDROID_21_LAB_COAT", "Android 21 (Lab Coat)"),
      new Character("BARDOCK", "Bardock"),
      new Character("BEERUS", "Beerus"),
      new Character("BROLY", "Broly"),
      new Character("BROLY_DBS", "Broly (DBS)"),
      new Character("CAPTAIN_GINYU", "Captain Ginyu"),
      new Character("CELL", "Cell"),
      new Character("COOLER", "Cooler"),
      new Character("FRIEZA", "Frieza"),
      new Character("GOGETA_SS4", "Gogeta SS4"),
      new Character("GOGETA_SSGSS", "Gogeta SSGSS"),
      new Character("GOHAN_ADULT", "Gohan Adult"),
      new Character("GOHAN_TEEN", "Gohan Teen"),
      new Character("GOKU", "Goku"),
      new Character("GOKU_GT", "Goku (GT)"),
      new Character("GOKU_SSGSS", "Goku SSGSS"),
      new Character("GOKU_SUPER_SAIYAN", "Goku SUPER SAIYAN"),
      new Character("GOKU_ULTRA_INSTINCT", "Goku Ultra Instinct"),
      new Character("GOKU_BLACK", "Goku Black"),
      new Character("GOTENKS", "Gotenks"),
      new Character("HIT", "Hit"),
      new Character("JANEMBA", "Janemba"),
      new Character("JIREN", "Jiren"),
      new Character("KEFLA", "Kefla"),
      new Character("KID_BUU", "Kid Buu"),
      new Character("KRILLIN", "Krillin"),
      new Character("MAJIN_BUU", "Majin Buu"),
      new Character("MASTER_ROSHI", "Master Roshi"),
      new Character("NAPPA", "Nappa"),
      new Character("PICCOLO", "Piccolo"),
      new Character("SUPER_BABY_2", "Super Baby 2"),
      new Character("TIEN", "Tien"),
      new Character("TRUNKS", "Trunks"),
      new Character("VEGETA", "Vegeta"),
      new Character("VEGETA_SSGSS", "Vegeta SSGSS"),
      new Character("VEGETA_SUPER_SAIYAN", "Vegeta Super Saiyan"),
      new Character("VEGITO_SSGSS", "Vegito SSGSS"),
      new Character("VIDEL", "Videl"),
      new Character("YAMCHA", "Yamcha"),
      new Character("ZAMASU_FUSED", "Zamasu (Fused)"));

  private <C extends Enum<C>, G extends Enum<G>> String createCombosToSql(C[] characters, G gameName) {
    String sql = "insert into game_characters (code, name, game) values ";
    for (int i = 0; i < characters.length; i++) {
      final String characterName = characters[i].name();
      var character = CHARACTERS.stream().filter(c -> c.code().equals(characterName)).findFirst()
          .orElseThrow(() -> new RuntimeException("Character: " + characterName + " not found"));
      sql += "( '" + character.code() + "', '" + character.name().replaceAll("'", "''") + "', '" + gameName.name() + "')";
      if (i != characters.length - 1) {
        sql += ",";
      }
    }
    return sql;

  }

  @Override
  public void migrate(Context context) throws Exception {
    Connection connection = context.getConnection();
    Statement statement = connection.createStatement();

    String sqlTekken7 = this.createCombosToSql(Tekken7Characters.values(), ComboGameTypes.TEKKEN_7);
    // throw new RuntimeException(sqlTekken7);
    statement.execute(sqlTekken7);

    String sqlTekken8 = this.createCombosToSql(Tekken8Characters.values(),
        ComboGameTypes.TEKKEN_8);
    statement.execute(sqlTekken8);

    String sqlSf6 = this.createCombosToSql(StreetFighter6Characters.values(),
        ComboGameTypes.STREET_FIGHTER_6);
    statement.execute(sqlSf6);

    String sqlGuiltyGearStrive = this.createCombosToSql(
        GuiltyGearStriveCharacters.values(),
        ComboGameTypes.GUILTY_GEAR_STRIVE);
    statement.execute(sqlGuiltyGearStrive);

    String sqlDbFighterZ = this.createCombosToSql(
        DragonBallFighterZCharacters.values(),
        ComboGameTypes.DB_FIGHTERZ);
    statement.execute(sqlDbFighterZ);

    statement.close();
  }
}
