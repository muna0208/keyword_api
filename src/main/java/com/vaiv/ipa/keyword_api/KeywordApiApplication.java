package com.vaiv.ipa.keyword_api;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class KeywordApiApplication {

	public static void main(String[] args) {
		SpringApplication.run(KeywordApiApplication.class, args);
	}

}
