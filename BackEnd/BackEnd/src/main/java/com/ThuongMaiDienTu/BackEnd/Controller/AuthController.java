package com.ThuongMaiDienTu.BackEnd.Controller;

import com.ThuongMaiDienTu.BackEnd.DTO.Request.DoiTacLienKetRequest;
import com.ThuongMaiDienTu.BackEnd.DTO.Request.LoginRequest;
import com.ThuongMaiDienTu.BackEnd.DTO.Request.NguoiDungRequest;
import com.ThuongMaiDienTu.BackEnd.DTO.Response.JwtResponse;
import com.ThuongMaiDienTu.BackEnd.Jwt.JwtUtils;
import com.ThuongMaiDienTu.BackEnd.Mapper.NguoiDungMapper;
import com.ThuongMaiDienTu.BackEnd.Security.CustomUserDetails;
import com.ThuongMaiDienTu.BackEnd.Service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*") // Hỗ trợ frontend gọi API
@RequiredArgsConstructor
public class AuthController {

    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    JwtUtils jwtUtils;
    private final AuthService authService;
    private final NguoiDungMapper nguoiDungMapper;

    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@RequestBody LoginRequest loginRequest) {

        // Thực hiện xác thực (kiểm tra username & password)
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getTenDangNhap(), loginRequest.getMatKhau()));

        SecurityContextHolder.getContext().setAuthentication(authentication);
        
        // Tạo JWT Token
        String jwt = jwtUtils.generateJwtToken(authentication);
        
        CustomUserDetails userDetails = (CustomUserDetails) authentication.getPrincipal();
        List<String> roles = userDetails.getAuthorities().stream()
                .map(item -> item.getAuthority())
                .collect(Collectors.toList());

        return ResponseEntity.ok(new JwtResponse(
                jwt,
                userDetails.getId(),
                userDetails.getUsername(),
                roles));
    }
    @PostMapping("register-user")
    public ResponseEntity<?> UserRegister(@RequestBody NguoiDungRequest  nguoiDungRequest) {
        String token = authService.nguoiDungRegister(nguoiDungRequest);
        HttpHeaders headers = new HttpHeaders();
        headers.add(HttpHeaders.AUTHORIZATION, "Bearer " + token);
        return ResponseEntity.status(HttpStatus.CREATED).headers(headers).body("Đăng ký người dùng thành công!");
    }
    @PostMapping("register-vendor")
    public ResponseEntity<?> VendorRegister(@RequestBody DoiTacLienKetRequest doiTacLienKetRequest) {
        return ResponseEntity.status(HttpStatus.CREATED).body(authService.doiTacRegister(doiTacLienKetRequest));
    }
}