package com.vaiv.ipa.keyword_api.restFullApi.domain;

import org.apache.ibatis.type.Alias;

import lombok.Data;

@Data
@Alias("NewsAnalyticsISKManagement")
public class NewsAnalyticsISKManagement {
    
    private Integer rNum;
    private String issKwd;
    private Integer rnk;
    private Integer rnkVar;
    private String issKwdDisp;
    private Integer sumFreq;
    private Integer rndFreq;
    private String userId;
    private String userNm;
    private String useYn;
    private String gtrYmd;
    private String docId;
    private String issKwdId;
    private String extrType;


}
