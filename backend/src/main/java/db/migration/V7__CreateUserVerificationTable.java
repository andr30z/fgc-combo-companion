package db.migration;

import java.sql.Connection;
import java.sql.Statement;
import org.flywaydb.core.api.migration.BaseJavaMigration;
import org.flywaydb.core.api.migration.Context;

public class V7__CreateUserVerificationTable extends BaseJavaMigration {

  @Override
  public void migrate(Context context) throws Exception {
    Connection connection = context.getConnection();
    Statement statement = connection.createStatement();
    statement.execute(
      "DROP TYPE IF EXISTS userverificationtypes CASCADE; " +
      "CREATE TYPE userverificationtypes AS ENUM ('PASSWORD_CHANGE', 'EMAIL_VERIFICATION'); "
    );
    statement.execute(
      "CREATE TABLE user_verifications ( " +
      "id bigint NOT NULL, " +
      "token UUID NOT NULL, " +
      "created_at timestamp, " +
      "user_id uuid NOT NULL, " +
      "type userverificationtypes NOT NULL, " +
      "expiry_date timestamp NOT NULL, " +
      "CONSTRAINT user_verifications_pkey PRIMARY KEY (id), " +
      "CONSTRAINT user_fk FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE );"
    );
    statement.execute("CREATE SEQUENCE IF NOT EXISTS user_verifications_seq;");

    statement.execute(
      "ALTER TABLE user_verifications ADD CONSTRAINT unique_users_verifications_user_id UNIQUE (user_id);"
    );
    statement.execute(
      "CREATE UNIQUE INDEX user_verification_token_unique_lower_token_idx on user_verifications (token);"
    );

    statement.close();
  }
}
