package com.ThuongMaiDienTu.BackEnd.Service;

import com.ThuongMaiDienTu.BackEnd.Entity.NguoiDungEntity;
import com.ThuongMaiDienTu.BackEnd.Repository.NguoiDungRepository;
import com.ThuongMaiDienTu.BackEnd.Security.CustomUserDetails;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    private NguoiDungRepository nguoiDungRepository;

    @Override
    public UserDetails loadUserByUsername(String usernameOrEmail) throws UsernameNotFoundException {
        NguoiDungEntity nguoiDung = nguoiDungRepository.findByTenDangNhap(usernameOrEmail)
                .or(() -> nguoiDungRepository.findByEmail(usernameOrEmail))
                .orElseThrow(() -> new UsernameNotFoundException("Không tìm thấy người dùng với username hoặc email: " + usernameOrEmail));
        return CustomUserDetails.build(nguoiDung);
    }
}