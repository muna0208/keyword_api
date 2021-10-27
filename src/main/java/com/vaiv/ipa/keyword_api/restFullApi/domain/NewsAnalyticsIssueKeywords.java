package com.vaiv.ipa.keyword_api.restFullApi.domain;

import org.apache.ibatis.type.Alias;

import lombok.Data;

@Data
@Alias("NewsAnalyticsIssueKeywords")
public class NewsAnalyticsIssueKeywords {
    
    private String issKwd;
    private Integer rnk;
    private Integer rnkvar;
    private Integer freq;
    private String isskwddisp;
    private String docid;
    private String docdate;
    private String title;
    private String url;
    private String content;
    private String writername;
    private double docsimilarity;
    private String gtrYmd;
    private String userId;
    private String userNm;
    private String useYn;

}
