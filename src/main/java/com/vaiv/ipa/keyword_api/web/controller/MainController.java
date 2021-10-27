package com.vaiv.ipa.keyword_api.web.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class MainController {
    
    @RequestMapping("/")
    public String mainpage(){
        System.out.println("## mainpage ##");
        return "test";
    }
}
