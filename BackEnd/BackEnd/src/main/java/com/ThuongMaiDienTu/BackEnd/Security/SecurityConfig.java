package com.ThuongMaiDienTu.BackEnd.Security;

import com.ThuongMaiDienTu.BackEnd.Jwt.JwtAuthFilter;
import com.ThuongMaiDienTu.BackEnd.Service.CustomUserDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;
import org.springframework.http.HttpMethod;

@Configuration
@EnableMethodSecurity
public class SecurityConfig {

    @Autowired
    CustomUserDetailsService userDetailsService;

    @Autowired
    JwtAuthFilter jwtAuthFilter;

    @Bean
    public DaoAuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider(userDetailsService);
        authProvider.setPasswordEncoder(passwordEncoder());
        return authProvider;
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authConfig) throws Exception {
        return authConfig.getAuthenticationManager();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public UrlBasedCorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(Arrays.asList("http://localhost:3000"));
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        configuration.setAllowedHeaders(Arrays.asList("Authorization", "Content-Type", "Accept"));
        configuration.setExposedHeaders(Arrays.asList("Authorization"));
        configuration.setAllowCredentials(true);
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration); 
        return source;
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http.cors(cors -> cors.configurationSource(corsConfigurationSource()))
                .csrf(csrf -> csrf.disable())
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests(auth ->
                    auth
                        .requestMatchers("/api/auth/**").permitAll()
                        .requestMatchers("/register-user").permitAll()
                        .requestMatchers("/register-vendor").permitAll()
                        .requestMatchers("/error").permitAll()
                        .requestMatchers(HttpMethod.POST, "/api/sanpham/*/view").permitAll()
                        
                        // Các API đặc thù của Admin và Đối tác (Đặt trước để tránh khớp nhầm mẫu tổng quát)
                        .requestMatchers("/api/admin/**").hasAnyRole("ADMIN")
                        .requestMatchers("/api/vendor/**").hasAnyRole("DOITAC", "ADMIN")
                        .requestMatchers("/api/sanpham/partner").hasAnyRole("DOITAC", "ADMIN")
                        .requestMatchers(HttpMethod.PUT, "/api/sanpham/*/stock").hasAnyRole("DOITAC", "ADMIN")
                        .requestMatchers(HttpMethod.PUT, "/api/sanpham/*/status").hasAnyRole("DOITAC", "ADMIN")
                        .requestMatchers(HttpMethod.PUT, "/api/sanpham/*").hasAnyRole("DOITAC", "ADMIN")
                        .requestMatchers(HttpMethod.DELETE, "/api/sanpham/*").hasAnyRole("DOITAC", "ADMIN")
                        
                        // API công khai của sản phẩm (Đặt sau)
                        .requestMatchers(HttpMethod.GET, "/api/sanpham/**").permitAll()
                        .requestMatchers("/api/trangchu/**","/api/danh-muc/**","/api/tintuc/**").permitAll()
                        
                        .anyRequest().authenticated()
                );

        http.authenticationProvider(authenticationProvider());
        http.addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }
}