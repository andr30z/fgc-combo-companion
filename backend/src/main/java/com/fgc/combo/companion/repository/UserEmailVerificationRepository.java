package com.fgc.combo.companion.repository;

import com.fgc.combo.companion.model.User;
import com.fgc.combo.companion.model.UserEmailVerification;
import java.util.Optional;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

public interface UserEmailVerificationRepository
  extends JpaRepository<UserEmailVerification, Long> {
  Optional<UserEmailVerification> findByToken(UUID token);
  Optional<UserEmailVerification> findByUser(User user);

  @Modifying
  @Query("delete from UserEmailVerification u where u.user in ?1")
  void deleteByUser(User user);
}
