package com.vaiv.ipa.keyword_api.restFullApi.domain;

import org.apache.ibatis.type.Alias;

import lombok.Data;

@Data
@Alias("issueKeyword")
public class IssueKeyword {
    
    private String gtrYmd;
    private String userId;
    private String userNm;
    private String issKwd;
    private Integer rnk;
    private Integer freq;
    private String useYn;
    private String issKwdDisp;
    private String docId;
    private String extrType;
    private Integer rnkVar;
    private String regDt;
    private String issKwdId;
    private String subKwd;
    private String incKwd;

    // Pdf 사용
    private String url;

    private Integer topN;
    private String className;
}
