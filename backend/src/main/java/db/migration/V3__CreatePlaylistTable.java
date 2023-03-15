package db.migration;

import java.sql.Connection;
import java.sql.Statement;
import org.flywaydb.core.api.migration.BaseJavaMigration;
import org.flywaydb.core.api.migration.Context;

public class V3__CreatePlaylistTable extends BaseJavaMigration {

  @Override
  public void migrate(Context context) throws Exception {
    Connection connection = context.getConnection();
    Statement statement = connection.createStatement();
    statement.execute(
        "CREATE TABLE playlists ( " +
            "id bigint NOT NULL," +
            "description character varying(255)," +
            "name character varying(255) NOT NULL, " +
            "created_at timestamp, " +
            "user_owner_id bigint NOT NULL, " +
            "CONSTRAINT playlist_pkey PRIMARY KEY (id), " +
            "CONSTRAINT user_fk FOREIGN KEY (user_owner_id) REFERENCES users(id) );");
    statement.execute("CREATE SEQUENCE playlist_seq;");

    statement.close();

  }
}
