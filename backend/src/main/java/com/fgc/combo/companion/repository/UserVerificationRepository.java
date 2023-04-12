package com.fgc.combo.companion.repository;

import com.fgc.combo.companion.model.User;
import com.fgc.combo.companion.model.UserVerification;
import java.util.Optional;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

public interface UserVerificationRepository
  extends JpaRepository<UserVerification, Long> {
  Optional<UserVerification> findByToken(UUID token);
  Optional<UserVerification> findByUser(User user);

  @Modifying
  @Query("delete from UserVerification u where u.user in ?1")
  void deleteByUser(User user);
}
