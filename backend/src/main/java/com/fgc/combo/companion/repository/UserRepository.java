package com.fgc.combo.companion.repository;

import com.fgc.combo.companion.model.User;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface UserRepository extends JpaRepository<User, Long> {
  @Query("select u from User u where lower(u.email) = lower(?1)")
  Optional<User> findUserByEmail(String email);

  List<User> findAllByEmail(String email);

  Optional<User> findByoAuthId(String oAuthId);
}
