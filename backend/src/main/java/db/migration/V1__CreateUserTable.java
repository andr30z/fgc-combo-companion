package db.migration;

import java.sql.Connection;
import java.sql.Statement;
import org.flywaydb.core.api.migration.BaseJavaMigration;
import org.flywaydb.core.api.migration.Context;

public class V1__CreateUserTable extends BaseJavaMigration {

  @Override
  public void migrate(Context context) throws Exception {
    Connection connection = context.getConnection();
    Statement statement = connection.createStatement();
    statement.execute(
      "CREATE EXTENSION pgcrypto;"
    );
    statement.execute(
      "CREATE SEQUENCE IF NOT EXISTS hibernate_sequence START WITH 1 INCREMENT BY 1;"
    );

    statement.execute("CREATE TYPE oauthtypes AS ENUM ('GOOGLE');");

    statement.execute(
      "CREATE TABLE users ( " +
      "id uuid DEFAULT gen_random_uuid() NOT NULL," +
      "email character varying(255) NOT NULL, " +
      "name character varying(255) NOT NULL, " +
      "bio text, " +
      "instagram_profile_url character varying(255), " +
      "twitter_profile_url character varying(255), " +
      "youtube_channel_url character varying(255), " +
      "password character varying(255), " +
      "auth_provider oauthtypes, " +
      "oauth_id character varying(255), " +
      "email_verified BOOL NOT NULL, " +
      "created_at timestamp, " +
      "updated_at timestamp, " +
      "CONSTRAINT user_pkey PRIMARY KEY (id) );"
    );
    statement.execute(
      "ALTER TABLE users ADD CONSTRAINT unique_email_users UNIQUE (email);"
    );
    statement.execute(
      "CREATE UNIQUE INDEX users_unique_lower_email_idx on users (lower(email));"
    );

    statement.close();
  }
}
