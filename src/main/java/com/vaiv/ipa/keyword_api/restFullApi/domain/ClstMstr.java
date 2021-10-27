package com.vaiv.ipa.keyword_api.restFullApi.domain;

import org.apache.ibatis.type.Alias;

import lombok.Data;

@Data
@Alias("clstMstr")
public class ClstMstr {
    
    private String gtrYmd;
    private String userId;
    private String userNm;
    private String cmtCd;
    private String cmtNm;
    private Integer totalDocs;
    private Integer sampleDocs;
    private String regDt;

}
