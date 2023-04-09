package db.migration;

import java.sql.Connection;
import java.sql.Statement;
import org.flywaydb.core.api.migration.BaseJavaMigration;
import org.flywaydb.core.api.migration.Context;

public class V7_CreateUserEmailVerificationTable extends BaseJavaMigration {

  @Override
  public void migrate(Context context) throws Exception {
    Connection connection = context.getConnection();
    Statement statement = connection.createStatement();

    statement.execute(
      "CREATE TABLE user_email_verifications ( " +
      "id bigint NOT NULL," +
      "token character varying(255) NOT NULL, " +
      "created_at timestamp, " +
      "user_id bigint NOT NULL, " +
      "expiry_date timestamp NOT NULL, " +
      "CONSTRAINT user_email_verifications_pkey PRIMARY KEY (id), " +
      "CONSTRAINT user_fk UNIQUE FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE );"
    );
    statement.execute(
      "CREATE SEQUENCE IF NOT EXISTS user_email_verifications_seq;"
    );

    statement.execute(
      "CREATE UNIQUE INDEX user_email_verification_token_unique_lower_token_idx on user_email_verifications (lower(token));"
    );

    statement.close();
  }
}
