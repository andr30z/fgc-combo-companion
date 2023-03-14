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
          "CREATE SEQUENCE IF NOT EXISTS hibernate_sequence START WITH 1 INCREMENT BY 1"
        );
        statement.execute(
          "CREATE TABLE users ( " +
          "id bigint NOT NULL," +
          "email character varying(255), " +
          "name character varying(255), " +
          "password character varying(255), " +
          "CONSTRAINT user_pkey PRIMARY KEY (id) );"
        );
        statement.execute("CREATE SEQUENCE user_seq;");
        statement.execute(
          "ALTER TABLE users ADD CONSTRAINT unique_email_users UNIQUE (email);"
        );
    
        statement.close();
   
  }
}
