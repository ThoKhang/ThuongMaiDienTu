package com.ThuongMaiDienTu.BackEnd.Security;

import com.ThuongMaiDienTu.BackEnd.Entity.NguoiDungEntity;
import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.stream.Collectors;

@Getter
@AllArgsConstructor
public class CustomUserDetails implements UserDetails {
    private Integer id;
    private String username;
    private String password;
    private Collection<? extends GrantedAuthority> authorities;

    public static CustomUserDetails build(NguoiDungEntity nguoiDung) {
        Collection<GrantedAuthority> authorities = nguoiDung.getVaiTros().stream()
                .map(role -> new SimpleGrantedAuthority("ROLE_" + role.getTenVaiTro().toUpperCase()))
                .collect(Collectors.toList());

        return new CustomUserDetails(
                nguoiDung.getId(),
                nguoiDung.getTenDangNhap(),
                nguoiDung.getMatKhau(),
                authorities
        );
    }

    @Override
    public boolean isAccountNonExpired() { return true; }
    @Override
    public boolean isAccountNonLocked() { return true; }
    @Override
    public boolean isCredentialsNonExpired() { return true; }
    @Override
    public boolean isEnabled() { return true; }
}