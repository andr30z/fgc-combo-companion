package db.migration;

import java.sql.Connection;
import java.sql.Statement;
import org.flywaydb.core.api.migration.BaseJavaMigration;
import org.flywaydb.core.api.migration.Context;

public class V4__CreatePlaylistComboRelation extends BaseJavaMigration {

  @Override
  public void migrate(Context context) throws Exception {
    Connection connection = context.getConnection();
    Statement statement = connection.createStatement();
    statement.execute(
      "CREATE TABLE playlist_combo ( " +
      "id uuid DEFAULT gen_random_uuid() NOT NULL," +
      "position integer NOT NULL, " +
      "added_at timestamp, " +
      "combo_id uuid NOT NULL, " +
      "playlist_id uuid NOT NULL, " +
      "CONSTRAINT playlist_combo_pkey PRIMARY KEY (id), " +
      "CONSTRAINT playlist_id FOREIGN KEY (playlist_id) REFERENCES playlists(id) ON DELETE CASCADE, " +
      "CONSTRAINT combo_fk FOREIGN KEY (combo_id) REFERENCES combos(id) ON DELETE CASCADE );"
    );
    statement.execute("CREATE SEQUENCE IF NOT EXISTS playlist_combo_seq;");

    statement.close();
  }
}
