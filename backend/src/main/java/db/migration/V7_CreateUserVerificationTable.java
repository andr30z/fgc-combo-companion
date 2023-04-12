package db.migration;

import java.sql.Connection;
import java.sql.Statement;
import org.flywaydb.core.api.migration.BaseJavaMigration;
import org.flywaydb.core.api.migration.Context;

public class V7_CreateUserVerificationTable extends BaseJavaMigration {

  @Override
  public void migrate(Context context) throws Exception {
    Connection connection = context.getConnection();
    Statement statement = connection.createStatement();
    statement.execute(
      "DROP TYPE IF EXISTS userverificationtypes CASCADE;" +
      "CREATE TYPE userverificationtypes AS ENUM ('PASSWORD_RESET', 'EMAIL_VERIFICATION');"
    );
    statement.execute(
      "CREATE TABLE user_verifications ( " +
      "id bigint NOT NULL," +
      "token character varying(255) NOT NULL, " +
      "created_at timestamp, " +
      "user_id bigint NOT NULL, " +
      "type userverificationtypes NOT NULL, " +
      "expiry_date timestamp NOT NULL, " +
      "CONSTRAINT user_verifications_pkey PRIMARY KEY (id), " +
      "CONSTRAINT user_fk UNIQUE FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE );"
    );
    statement.execute(
      "CREATE SEQUENCE IF NOT EXISTS user_verifications_seq;"
    );

    statement.execute(
      "CREATE UNIQUE INDEX user_verification_token_unique_lower_token_idx on user_verifications (lower(token));"
    );

    statement.close();
  }
}
