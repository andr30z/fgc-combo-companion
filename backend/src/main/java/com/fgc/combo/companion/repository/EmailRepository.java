package com.fgc.combo.companion.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.fgc.combo.companion.model.Email;

public interface EmailRepository extends JpaRepository<Email, Long> {
    
}
