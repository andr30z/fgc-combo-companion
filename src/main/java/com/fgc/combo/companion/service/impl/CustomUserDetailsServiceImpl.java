package com.fgc.combo.companion.service.impl;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.fgc.combo.companion.dto.CustomUserDetails;
import com.fgc.combo.companion.exception.ResourceNotFoundException;
import com.fgc.combo.companion.model.User;
import com.fgc.combo.companion.repository.UserRepository;

@Service
public class CustomUserDetailsServiceImpl implements UserDetailsService {
    private final UserRepository userRepository;

    public CustomUserDetailsServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String s) throws UsernameNotFoundException {
        User user =
                userRepository.findUserByEmail(s).orElseThrow(() -> new ResourceNotFoundException("User not found with email " + s));
        return new CustomUserDetails(user);
    }
}