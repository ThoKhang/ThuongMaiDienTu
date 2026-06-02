package com.ThuongMaiDienTu.BackEnd.DTO.Response;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class DoiTacResponse {
    private Integer id;
    private String tenDoiTac;
    private String email;
    private String soDienThoai;
    private Double tyLeHoaHong;
    private String apiEndpoint;
    
    private String trangThai; 
    private String trangThaiDuyet; 
    
    private String ngayHopTac;
    private Long tongSoDonHang;
    private Double tongHoaHongTichLuy;
}