package com.vaiv.ipa.keyword_api.restFullApi.domain;

import org.apache.ibatis.type.Alias;

import lombok.Data;

@Data
@Alias("NewsAnalyticsNews")
public class NewsAnalyticsNews {
    
    private String docId;
    private Integer docIdx;
    private String docDate;
    private String title;
    private String url;
    private String content;
    private double docSimilarity;
    private String writername;
    private String gtrYmd;
    private String userId;
    private String issKwd;
}
