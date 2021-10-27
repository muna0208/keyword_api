package com.vaiv.ipa.keyword_api.restFullApi.domain;

import org.apache.ibatis.type.Alias;

import lombok.Data;

@Data
@Alias("clstData")
public class ClstData {

    private String gtrYmd;
    private String userId;
    private Integer clstIdx;
    private String clstName;
    private Integer clstSize;
    private Double clstSimilarity;
    
}
