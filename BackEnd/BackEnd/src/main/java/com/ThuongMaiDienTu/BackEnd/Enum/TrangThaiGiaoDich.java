package com.ThuongMaiDienTu.BackEnd.Enum;

public enum TrangThaiGiaoDich {
    CHO_DUYET("ChoDuyet"),
    THANH_CONG("ThanhCong"),
    GIAN_LAN("GianLan");
    private final String dbValue;
    TrangThaiGiaoDich(String dbValue) {
        this.dbValue = dbValue;
    }
    public String getDbValue() {
        return dbValue;
    }
    public static TrangThaiGiaoDich fromDbValue(String value) {
        for (TrangThaiGiaoDich status : TrangThaiGiaoDich.values()) {
            if (status.getDbValue().equalsIgnoreCase(value)) {
                return status;
            }
        }
        throw new IllegalArgumentException("Không tìm thấy TrangThaiGiaoDich với giá trị: " + value);
    }
}
