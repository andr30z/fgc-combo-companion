package db.migration;

import java.sql.Connection;
import java.sql.Statement;
import org.flywaydb.core.api.migration.BaseJavaMigration;
import org.flywaydb.core.api.migration.Context;

public class V8__AddComboCharacterAndTotalComboDamage extends BaseJavaMigration {

  @Override
  public void migrate(Context context) throws Exception {
    Connection connection = context.getConnection();
    Statement statement = connection.createStatement();

    //NO WAY I'LL CREATE DB TYPES FOR ALL CHARACTERS
    statement.execute(
      "ALTER TABLE combos ADD COLUMN character VARCHAR(255);"
    );

    statement.execute(
      "ALTER TABLE combos ADD COLUMN total_damage VARCHAR(255);"
    );

    statement.close();
  }
}
