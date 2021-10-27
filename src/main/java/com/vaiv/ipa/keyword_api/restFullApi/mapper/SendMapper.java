package com.vaiv.ipa.keyword_api.restFullApi.mapper;

import java.util.List;

import com.vaiv.ipa.keyword_api.restFullApi.domain.ClstData;
import com.vaiv.ipa.keyword_api.restFullApi.domain.ClstDocs;
import com.vaiv.ipa.keyword_api.restFullApi.domain.ClstMstr;
import com.vaiv.ipa.keyword_api.restFullApi.domain.IssueKeyword;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface SendMapper {

    List<IssueKeyword> getIssueKwd(IssueKeyword issueKeyword) throws Exception;

    List<ClstData> getClstData(IssueKeyword issueKeyword) throws Exception;

    List<ClstDocs> getClstDocs(IssueKeyword issueKeyword) throws Exception;

    List<ClstMstr> getClstMstr(IssueKeyword issueKeyword) throws Exception;
    
}
