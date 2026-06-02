package com.ThuongMaiDienTu.BackEnd.Enum;

public enum TinhTrangDuyet {
    CHO_DUYET("ChoDuyet"),
    DA_DUYET("DaDuyet"),
    TU_CHOI("TuChoi"),
    DA_AN("DaAn");
    private final String dbValue;
    TinhTrangDuyet(String dbValue) {
        this.dbValue = dbValue;
    }
    public String getDbValue() {
        return dbValue;
    }
    public static TinhTrangDuyet fromDbValue(String value) {
        for (TinhTrangDuyet status : TinhTrangDuyet.values()) {
            if (status.getDbValue().equalsIgnoreCase(value)) {
                return status;
            }
        }
        throw new IllegalArgumentException("Không tìm thấy TinhTrangDuyet với giá trị: " + value);
    }
}
