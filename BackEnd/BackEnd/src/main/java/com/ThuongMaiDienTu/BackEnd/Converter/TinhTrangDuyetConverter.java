package com.ThuongMaiDienTu.BackEnd.Converter;

import com.ThuongMaiDienTu.BackEnd.Enum.TinhTrangDuyet;
import com.ThuongMaiDienTu.BackEnd.Enum.TrangThaiNguoiDung;
import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;

@Converter(autoApply = true)
public class TinhTrangDuyetConverter implements AttributeConverter<TinhTrangDuyet, String> {
    @Override
    public String convertToDatabaseColumn(TinhTrangDuyet attribute) {
        return attribute == null ? null : attribute.getDbValue();
    }
    @Override
    public TinhTrangDuyet convertToEntityAttribute(String dbData) {
        return dbData == null ? null : TinhTrangDuyet.fromDbValue(dbData);
    }
}

