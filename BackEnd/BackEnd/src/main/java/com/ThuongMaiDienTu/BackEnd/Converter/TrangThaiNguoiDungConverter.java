package com.ThuongMaiDienTu.BackEnd.Converter;

import com.ThuongMaiDienTu.BackEnd.Enum.TrangThaiNguoiDung;
import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;
import org.springframework.stereotype.Component;

@Converter(autoApply = true)
@Component
public class TrangThaiNguoiDungConverter implements AttributeConverter<TrangThaiNguoiDung, String> {
    @Override
    public String convertToDatabaseColumn(TrangThaiNguoiDung attribute) {
        return attribute == null ? null : attribute.getDbValue();
    }
    @Override
    public TrangThaiNguoiDung convertToEntityAttribute(String dbData) {
        return dbData == null ? null : TrangThaiNguoiDung.fromDbValue(dbData);
    }
}
