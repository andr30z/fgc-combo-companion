package db.migration;

import java.sql.Connection;
import java.sql.Statement;
import org.flywaydb.core.api.migration.BaseJavaMigration;
import org.flywaydb.core.api.migration.Context;

public class V6__CreateEmailTable extends BaseJavaMigration {

  @Override
  public void migrate(Context context) throws Exception {
    Connection connection = context.getConnection();
    Statement statement = connection.createStatement();

    statement.execute("CREATE TYPE mailstatustypes AS ENUM ('SENT', 'ERROR');");

    statement.execute(
      "CREATE TABLE emails(" +
      " id             BIGINT NOT NULL, " +
      " content        TEXT, " +
      " email_from     VARCHAR(255) NOT NULL, " +
      " email_to       VARCHAR(255) NOT NULL, " +
      " status         mailstatustypes NOT NULL, " +
      " owner_ref      VARCHAR(255), " +
      " sent_at TIMESTAMP, " +
      " subject        VARCHAR(255)," +
      " CONSTRAINT emails_pkey PRIMARY KEY (id));"
    );
    statement.execute("CREATE SEQUENCE IF NOT EXISTS emails_seq;");
    statement.close();
  }
}
