package com.ThuongMaiDienTu.BackEnd.Converter;

import com.ThuongMaiDienTu.BackEnd.Enum.TrangThaiGiaoDich;
import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;

@Converter(autoApply = true)
public class TrangThaiGiaoDichConverter implements AttributeConverter<TrangThaiGiaoDich, String> {
    @Override
    public String convertToDatabaseColumn(TrangThaiGiaoDich attribute) {
        return attribute == null ? null : attribute.getDbValue();
    }
    @Override
    public TrangThaiGiaoDich convertToEntityAttribute(String dbData) {
        return dbData == null ? null : TrangThaiGiaoDich.fromDbValue(dbData);
    }
}
