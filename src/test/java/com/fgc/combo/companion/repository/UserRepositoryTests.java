package com.fgc.combo.companion.repository;

import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import com.fgc.combo.companion.model.User;

@DataJpaTest
class UserRepositoryTests {

  @Autowired
  private UserRepository userRepository;

  @Test
  void itShouldFindUserByEmail() {
    //give
    String userMail = "testemail@gmail.com";
    User user = User
      .builder()
      .name("Test")
      .password("testepassword")
      .email(userMail)
      .build();
    userRepository.save(user);

    //when
    var userByEmail = userRepository.findUserByEmail(userMail);

    //then
    Assertions.assertThat(userByEmail).isNotEmpty();
  }
}
