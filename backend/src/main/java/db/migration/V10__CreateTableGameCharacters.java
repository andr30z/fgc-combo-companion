package db.migration;

import java.sql.Connection;
import java.sql.Statement;
import org.flywaydb.core.api.migration.BaseJavaMigration;
import org.flywaydb.core.api.migration.Context;

public class V10__CreateTableGameCharacters extends BaseJavaMigration {

  @Override
  public void migrate(Context context) throws Exception {
    Connection connection = context.getConnection();
    Statement statement = connection.createStatement();

    String template = """
        CREATE TABLE game_characters(
         id SERIAL NOT NULL,
         code TEXT NOT NULL,
         name TEXT NOT NULL,
         game gametypes NOT NULL,
         CONSTRAINT game_chars_pkey PRIMARY KEY (id)
        );
        """;

    statement.execute(template);
    statement.close();
  }
}
