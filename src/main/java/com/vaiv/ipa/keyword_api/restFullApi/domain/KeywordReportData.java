package com.vaiv.ipa.keyword_api.restFullApi.domain;

import org.apache.ibatis.type.Alias;

import lombok.Data;

@Data
@Alias("keywordReportData")
public class KeywordReportData {
    
    private String gtrYmd;
    private String userId;
    private String issKwd;
    private String tsb1Data; // 언급량 추이
    private String asb1Data; // 연관어 클라우드
    private String stb3Data; // 감성분포 및 대표 감성표현
    private String tsl1Data; // 장기 트렌드 분석
    private String tsl2Data; // 변곡점 분석
    private String dob1Data; // 주제어 원문
    private String useYn;
    private String userNm;
    private String regDt;
    private String processingTime;
    

}
