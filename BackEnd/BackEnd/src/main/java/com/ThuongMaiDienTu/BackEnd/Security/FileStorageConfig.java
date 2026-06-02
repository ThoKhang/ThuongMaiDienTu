package com.ThuongMaiDienTu.BackEnd.Security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.io.File;
import java.nio.file.Path;
import java.nio.file.Paths;
import org.springframework.beans.factory.annotation.Value;

@Configuration
public class FileStorageConfig {

    @Value("${app.upload-dir}")
    private String relativePath;

    @Bean
    public String uploadDir() {
        Path uploadPath = Paths.get(System.getProperty("user.dir"))
                .resolve(relativePath)
                .toAbsolutePath()
                .normalize();

        File dir = uploadPath.toFile();
        if (!dir.exists()) dir.mkdirs();

        System.out.println(">>> Upload dir = " + uploadPath);  // phải thấy dòng này khi khởi động
        return uploadPath.toString();
    }
}