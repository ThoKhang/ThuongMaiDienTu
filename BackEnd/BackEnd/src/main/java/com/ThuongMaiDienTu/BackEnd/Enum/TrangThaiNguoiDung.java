package com.ThuongMaiDienTu.BackEnd.Enum;

public enum TrangThaiNguoiDung {
    HOAT_DONG("HoatDong"),
    KHOA("Khoa");
    private final String dbValue;
    TrangThaiNguoiDung(String dbValue) {
        this.dbValue = dbValue;
    }
    public String getDbValue() {
        return dbValue;
    }
    public static TrangThaiNguoiDung fromDbValue(String value) {
        for (TrangThaiNguoiDung status : TrangThaiNguoiDung.values()) {
            if (status.getDbValue().equalsIgnoreCase(value)) {
                return status;
            }
        }
        throw new IllegalArgumentException("Không tìm thấy TrangThaiNguoiDung: " + value);
    }
}
