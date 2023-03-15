package db.migration;

import java.sql.Connection;
import java.sql.Statement;
import org.flywaydb.core.api.migration.BaseJavaMigration;
import org.flywaydb.core.api.migration.Context;

public class V2__CreateComboTable extends BaseJavaMigration {

  @Override
  public void migrate(Context context) throws Exception {
    Connection connection = context.getConnection();
    Statement statement = connection.createStatement();
    statement.execute(
        "CREATE TABLE combos ( " +
            "id bigint NOT NULL," +
            "description character varying(255)," +
            "name character varying(255) NOT NULL, " +
            "combo text NOT NULL, " +
            "created_at timestamp, " +
            "user_owner_id bigint NOT NULL, " +
            "CONSTRAINT combo_pkey PRIMARY KEY (id), " +
            "CONSTRAINT user_fk FOREIGN KEY (user_owner_id) REFERENCES users(id) );");
    statement.execute("CREATE SEQUENCE combo_seq;");

    statement.close();

  }
}
