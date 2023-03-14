package com.fgc.combo.companion.repository;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.fgc.combo.companion.model.User;

public interface UserRepository extends JpaRepository<User, Long> {
  @Query("select u from User u where u.email = ?1")
  Optional<User> findUserByEmail(String email);
}
