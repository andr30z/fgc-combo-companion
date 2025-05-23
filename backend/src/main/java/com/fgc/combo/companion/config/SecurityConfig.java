package com.fgc.combo.companion.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import com.fgc.combo.companion.service.impl.CustomUserDetailsServiceImpl;
import com.fgc.combo.companion.validation.ValueOfEnumValidator;

import lombok.extern.slf4j.Slf4j;

@Configuration
@EnableWebSecurity
@Slf4j
public class SecurityConfig {

  private static final int PASSWORD_STRENGTH = 10;

  @Bean
  ValueOfEnumValidator valueOfEnumValidator() {
    return new ValueOfEnumValidator();
  }

  // @Autowired
  // private CustomUserDetailsServiceImpl customUserDetailsService;

  @Bean
  PasswordEncoder passwordEncoder() {
    return new BCryptPasswordEncoder(PASSWORD_STRENGTH);
  }

  @Bean
  TokenAuthenticationFilter tokenAuthenticationFilter() {
    return new TokenAuthenticationFilter();
  }

  // @Override
  // protected void configure(AuthenticationManagerBuilder auth) throws Exception
  // {
  // auth
  // .userDetailsService(customUserDetailsService)
  // .passwordEncoder(passwordEncoder());
  // }

  @Bean
  AuthenticationManager authenticationManager(
      HttpSecurity http,
      PasswordEncoder passwordEncoder,
      CustomUserDetailsServiceImpl customUserDetailsService) throws Exception {
    return http
        .getSharedObject(AuthenticationManagerBuilder.class)
        .userDetailsService(customUserDetailsService)
        .passwordEncoder(passwordEncoder)
        .and()
        .build();
  }

  @Bean
  SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
    return http
        .cors()
        .and()
        // .anonymous()
        // .disable()
        .sessionManagement()
        .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
        .and()
        .csrf()
        .disable()
        .formLogin()
        .disable()
        .httpBasic()
        .disable()
        .exceptionHandling()
        .authenticationEntryPoint(new RestAuthenticationEntryPoint())
        .and()
        .authorizeHttpRequests()
        .requestMatchers(
            "/",
            // -- Swagger UI v2
            "/v2/api-docs",
            "/swagger-resources",
            "/swagger-resources/**",
            "/configuration/ui",
            "/configuration/security",
            "/swagger-ui.html",
            "/webjars/**",
            // -- Swagger UI v3 (OpenAPI)
            "/v3/api-docs/**",
            "/swagger-ui/**",
            "/actuator",
            // other public endpoints of your API may be appended to this array

            "/error",
            "/favicon.ico",
            "/**/*.png",
            "/**/*.gif",
            "/**/*.svg",
            "/**/*.jpg",
            "/**/*.html",
            "/**/*.css",
            "/**/*.js")
        .permitAll()
        .and()
        .authorizeHttpRequests()
        .requestMatchers(
            HttpMethod.POST,
            "/api/v1/users/login",
            "/api/v1/users/refresh",
            "/api/v1/users",
            "/api/v1/users/oauth/login",
            "/api/v1/users/email-verification-solicitation",
            "/api/v1/users/password-change-solicitation")
        .permitAll()
        .requestMatchers(
            HttpMethod.GET,
            "/api/v1/users/me",
            "/api/v1/playlists/me")
        .authenticated()
        .requestMatchers(
            HttpMethod.PATCH,
            "/api/v1/users/password-change",
            "/api/v1/users/email-verification")
        .permitAll()
        .requestMatchers(
            HttpMethod.GET,
            "/api/v1/profile/{userId}",
            "/api/v1/users/verification/**",
            "/api/v1/users/{userId}",
            "/api/v1/playlists/{playlistId}",
            "/api/v1/combos/{comboId}",
            "/api/v1/combos/users/{userId}",
            "/api/v1/playlists/users/{userId}")
        .permitAll()
        .anyRequest()
        .authenticated()
        .and()
        .addFilterBefore(
            tokenAuthenticationFilter(),
            UsernamePasswordAuthenticationFilter.class)
        .build();
  }

  @Profile("default")
  @Bean
  WebMvcConfigurer corsConfigurerDev() {
    return new WebMvcConfigurer() {
      @Override
      public void addCorsMappings(CorsRegistry registry) {
        log.info("Registering DEV CORS filter...");

        registry
            .addMapping("/**")
            .allowCredentials(true)
            .allowedHeaders("*")
            .allowedMethods("*")
            .allowedOriginPatterns("*");
      }
    };
  }

  @Bean
  @Profile("production")
  WebMvcConfigurer corsConfigurer() {
    return new WebMvcConfigurer() {
      @Override
      public void addCorsMappings(CorsRegistry registry) {
        log.info("Registering PRODUCTION CORS filter...");

        registry
            .addMapping("/**")
            .allowCredentials(true)
            .allowedHeaders("*")
            .allowedMethods("*")
            .allowedOriginPatterns("https://*.fgc-combo-companion.xyz");
      }
    };
  }
}
