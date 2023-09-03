package db.migration;

import java.sql.Connection;
import java.sql.Statement;
import org.flywaydb.core.api.migration.BaseJavaMigration;
import org.flywaydb.core.api.migration.Context;

public class V9__AddDbFighterzToGameTypes extends BaseJavaMigration {

  @Override
  public void migrate(Context context) throws Exception {
    Connection connection = context.getConnection();
    Statement statement = connection.createStatement();

    statement.execute(
      "ALTER TYPE gametypes ADD VALUE 'DB_FIGHTERZ';"
    );

    statement.close();
  }
}
