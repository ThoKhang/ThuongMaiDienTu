package com.ThuongMaiDienTu.BackEnd;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class BackEndApplication {
    public static void main(String[] args) {
        System.out.println(">>> user.dir = " + System.getProperty("user.dir"));
        SpringApplication.run(BackEndApplication.class, args);
    }
}