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
import java.util.concurrent.ConcurrentHashMap;
import java.util.List;
import java.util.stream.Collectors;
import com.ThuongMaiDienTu.BackEnd.DTO.Response.JwtResponse;

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

    // Bộ nhớ tạm lưu mã OTP
    private final ConcurrentHashMap<String, OtpData> otpMap = new ConcurrentHashMap<>();

    private static class OtpData {
        String code;
        long expiryTime;

        OtpData(String code, long expiryTime) {
            this.code = code;
            this.expiryTime = expiryTime;
        }
    }

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

    @Override
    public void sendOtp(String email) {
        log.info("Yêu cầu gửi OTP cho email: {}", email);
        if (!nguoiDungRepository.existsByEmail(email)) {
            throw new RuntimeException("Email này chưa được đăng ký trong hệ thống!");
        }
        
        // Tạo OTP 6 chữ số ngẫu nhiên
        String otp = String.valueOf((int) ((Math.random() * 900000) + 100000));
        
        // Hết hạn sau 5 phút
        long expiryTime = System.currentTimeMillis() + (5 * 60 * 1000);
        otpMap.put(email, new OtpData(otp, expiryTime));
        
        log.info("================================================");
        log.info("MÃ OTP ĐĂNG NHẬP CHO EMAIL {}: ===> {} <===", email, otp);
        log.info("================================================");
    }

    @Override
    public JwtResponse verifyOtpAndLogin(String email, String otp) {
        log.info("Yêu cầu xác thực OTP cho email: {}", email);
        OtpData otpData = otpMap.get(email);
        
        if (otpData == null || System.currentTimeMillis() > otpData.expiryTime) {
            throw new RuntimeException("Mã OTP đã hết hạn hoặc không tồn tại!");
        }
        
        if (!otpData.code.equals(otp)) {
            throw new RuntimeException("Mã OTP không chính xác!");
        }
        
        // OTP chính xác -> Xóa mã OTP sau khi dùng
        otpMap.remove(email);
        
        NguoiDungEntity nguoiDung = nguoiDungRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy thông tin người dùng!"));
                
        CustomUserDetails userDetails = CustomUserDetails.build(nguoiDung);
        Authentication authentication = new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
        
        String token = jwtUtils.generateJwtToken(authentication);
        List<String> roles = userDetails.getAuthorities().stream()
                .map(item -> item.getAuthority())
                .collect(Collectors.toList());
                
        return new JwtResponse(token, userDetails.getId(), userDetails.getUsername(), roles);
    }
}
