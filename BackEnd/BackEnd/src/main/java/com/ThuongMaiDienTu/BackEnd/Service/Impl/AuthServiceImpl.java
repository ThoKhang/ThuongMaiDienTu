package com.ThuongMaiDienTu.BackEnd.Service.Impl;

import com.ThuongMaiDienTu.BackEnd.DTO.Request.DoiTacLienKetRequest;
import com.ThuongMaiDienTu.BackEnd.DTO.Request.NguoiDungRequest;
import com.ThuongMaiDienTu.BackEnd.DTO.Response.DoiTacLienKetResponse;
import com.ThuongMaiDienTu.BackEnd.DTO.Response.NguoiDungResponse;
import com.ThuongMaiDienTu.BackEnd.Entity.DoiTacLienKetEntity;
import com.ThuongMaiDienTu.BackEnd.Entity.NguoiDungEntity;
import com.ThuongMaiDienTu.BackEnd.Entity.VaiTroEntity;
import com.ThuongMaiDienTu.BackEnd.Enum.TinhTrangDuyet;
import com.ThuongMaiDienTu.BackEnd.Enum.TrangThaiNguoiDung;
import com.ThuongMaiDienTu.BackEnd.Jwt.JwtUtils;
import com.ThuongMaiDienTu.BackEnd.Mapper.DoiTacLienKetMapper;
import com.ThuongMaiDienTu.BackEnd.Mapper.NguoiDungMapper;
import com.ThuongMaiDienTu.BackEnd.Repository.DoiTacLienKetRepository;
import com.ThuongMaiDienTu.BackEnd.Repository.NguoiDungRepository;
import com.ThuongMaiDienTu.BackEnd.Repository.VaiTroRepository;
import com.ThuongMaiDienTu.BackEnd.Security.CustomUserDetails;
import com.ThuongMaiDienTu.BackEnd.Service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class AuthServiceImpl implements AuthService {
    private final NguoiDungRepository nguoiDungRepository;
    private final DoiTacLienKetRepository doiTacLienKetRepository;
    private final VaiTroRepository vaiTroRepository;
    private final NguoiDungMapper nguoiDungMapper;
    private final DoiTacLienKetMapper doiTacMapper;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtils jwtUtils;
    @Override
    public String nguoiDungRegister(NguoiDungRequest nguoiDungRequest) {
        log.info("Bắt đầu đăng ký người dùng mới: {}", nguoiDungRequest.getTenDangNhap());
        if(nguoiDungRepository.existsByTenDangNhap(nguoiDungRequest.getTenDangNhap()))
            throw new RuntimeException("Tên đăng nhập đã tồn tại!");
        if (nguoiDungRepository.existsByEmail(nguoiDungRequest.getEmail()))
            throw new RuntimeException("Email đã được sử dụng!");
        NguoiDungEntity nguoiDung = nguoiDungMapper.toEntity(nguoiDungRequest);
        nguoiDung.setMatKhau(passwordEncoder.encode(nguoiDung.getMatKhau()));
        nguoiDung.setTrangThai(TrangThaiNguoiDung.HOAT_DONG);
        nguoiDungRepository.save(nguoiDung);
        CustomUserDetails userDetails = CustomUserDetails.build(nguoiDung);
        Authentication authentication = new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
        return jwtUtils.generateJwtToken(authentication);
    }

    @Override
    public DoiTacLienKetResponse doiTacRegister(DoiTacLienKetRequest doiTacLienKetRequest) {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        log.info("Bắt đầu đăng ký người bán mới: {}", doiTacLienKetRequest.getTenCongTy());
        NguoiDungEntity currentUser = nguoiDungRepository.findByTenDangNhap(username).orElseThrow(() -> new RuntimeException("Không tìm thấy thông tin người dùng xác thực!"));
        if (doiTacLienKetRepository.existsById(currentUser.getId()))
            throw new RuntimeException("Tài khoản này đã đăng ký đối tác/người bán rồi!");
        DoiTacLienKetEntity doiTac = doiTacMapper.toEntity(doiTacLienKetRequest);
        doiTac.setIdNguoiDung(currentUser.getId());
        doiTac.setTrangThaiDuyet(TinhTrangDuyet.CHO_DUYET);
        doiTacLienKetRepository.save(doiTac);
        VaiTroEntity roleDoiTac = vaiTroRepository.findByTenVaiTro("DoiTac").orElseThrow(() -> new RuntimeException("Lỗi hệ thống: Không tìm thấy Role DoiTac"));
        currentUser.getVaiTros().add(roleDoiTac);
        nguoiDungRepository.save(currentUser);
        return doiTacMapper.toResponse(doiTac);
    }
}
