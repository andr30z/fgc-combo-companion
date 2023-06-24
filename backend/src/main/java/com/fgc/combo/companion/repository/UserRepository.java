package com.fgc.combo.companion.repository;

import com.fgc.combo.companion.model.User;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface UserRepository extends JpaRepository<User, Long> {
  @Query("select u from User u where lower(u.email) = lower(?1)")
  Optional<User> findUserByEmail(String email);

  @Query("select u from User u where u.name ILIKE %?1%")
  List<User> findAllByName(String name, Pageable pageable);

  List<User> findAllByEmail(String email);

  Optional<User> findByoAuthId(String oAuthId);
}
