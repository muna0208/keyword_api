package com.vaiv.ipa.keyword_api.restFullApi.domain;

import org.apache.ibatis.type.Alias;

import lombok.Data;

@Data
@Alias("NewsAnalyticsISK10")
public class NewsAnalyticsISK10 {
    
    private String issKwd;
    private Integer rnk;
    private Integer rnkvar;
    private String isskwddisp;
    private Integer sumFreq;
    private Integer rndFreq;
    private String gtrYmd;
    private String userId;
}
