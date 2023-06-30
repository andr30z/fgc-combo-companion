package db.migration;

import java.sql.Connection;
import java.sql.Statement;
import org.flywaydb.core.api.migration.BaseJavaMigration;
import org.flywaydb.core.api.migration.Context;

public class V5__CreateTagTable extends BaseJavaMigration {

  @Override
  public void migrate(Context context) throws Exception {
    Connection connection = context.getConnection();
    Statement statement = connection.createStatement();
    statement.execute(
      "CREATE TABLE tags ( " +
      "id bigint NOT NULL," +
      "color character varying(255) NOT NULL, " +
      "title character varying(255) NOT NULL, " +
      "combo_id uuid, " +
      "playlist_id uuid, " +
      "created_at timestamp, " +
      "CONSTRAINT tag_pkey PRIMARY KEY (id), " +
      "CONSTRAINT playlist_id FOREIGN KEY (playlist_id) REFERENCES playlists(id) ON DELETE CASCADE, " +
      "CONSTRAINT combo_fk FOREIGN KEY (combo_id) REFERENCES combos(id) ON DELETE CASCADE );"
    );
    statement.execute("CREATE SEQUENCE IF NOT EXISTS tag_seq;");

    statement.close();
  }
}
