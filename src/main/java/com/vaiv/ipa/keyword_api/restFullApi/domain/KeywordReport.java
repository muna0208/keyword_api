package com.vaiv.ipa.keyword_api.restFullApi.domain;

import org.apache.ibatis.type.Alias;

import lombok.Data;

@Data
@Alias("keywordReport")
public class KeywordReport {
    
    private String gtrYmd;
    private String userId;
    private String issKwd;
    private String userNm;
    private String tsb1Data;
    private String asb1Data;
    private String stb3Data;
    private String tsl1Data;
    private String tsl2Data;
    private String dob1Data;
    private String processingTime;
    private String useYn;
    private String regDt;
    private String mdfDt;
    
}
