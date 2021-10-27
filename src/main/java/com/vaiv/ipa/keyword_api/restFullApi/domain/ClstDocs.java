package com.vaiv.ipa.keyword_api.restFullApi.domain;

import org.apache.ibatis.type.Alias;

import lombok.Data;

@Data
@Alias("clstDocs")
public class ClstDocs {

    private String gtrYmd;
    private String userId;
    private Integer clstIdx;
    private String docId;
    private Integer docIdx;
    private String docDate;
    private String title;
    private String content;
    private String url;
    private Double docSimilarity;
    private String writerName;
    
    private String summary;    
}
