package com.ThuongMaiDienTu.BackEnd.Service;

import com.ThuongMaiDienTu.BackEnd.DTO.Response.VendorDashboardResponse;

public interface VendorDashboardService {
    VendorDashboardResponse getVendorDashboard(Integer idDoiTac);
}
