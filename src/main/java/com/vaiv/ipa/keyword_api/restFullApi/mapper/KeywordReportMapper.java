package com.vaiv.ipa.keyword_api.restFullApi.mapper;



import com.vaiv.ipa.keyword_api.restFullApi.domain.IssueKeyword;
import com.vaiv.ipa.keyword_api.restFullApi.domain.KeywordReport;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface KeywordReportMapper {

    KeywordReport getReportData(IssueKeyword issueKeyword);
    
}
