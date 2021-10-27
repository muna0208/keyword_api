package com.vaiv.ipa.keyword_api.restFullApi.domain;

import org.apache.ibatis.type.Alias;

import lombok.Data;

@Data
@Alias("congressmanInfo")
public class CongressmanInfo {
    private String gtrYmd;
    private String userId;
    private String userNm;
    private String stfTyNm;
    private String deptCd;
    private String deptNm;
    private String blngCmtCd;
    private String blngCmtNm;
    private String blngPlptCd;
    private String plptNm;
    private String gclCd;
    private String gclNm;
    private String regnCd;
    private String regnNm;
    private String rgDtm;
    private String chgDtm;
    private String delYn;
    private String chgYn;
}
