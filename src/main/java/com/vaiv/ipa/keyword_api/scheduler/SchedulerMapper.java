package com.vaiv.ipa.keyword_api.scheduler;

import java.util.List;

import com.vaiv.ipa.keyword_api.restFullApi.domain.ClstData;
import com.vaiv.ipa.keyword_api.restFullApi.domain.ClstDocs;
import com.vaiv.ipa.keyword_api.restFullApi.domain.ClstMstr;
import com.vaiv.ipa.keyword_api.restFullApi.domain.CongressmanInfo;
import com.vaiv.ipa.keyword_api.restFullApi.domain.IssueKeyword;
import com.vaiv.ipa.keyword_api.restFullApi.domain.KeywordReportData;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface SchedulerMapper {

    List<CongressmanInfo> getCongressmanInfo() throws Exception;

    int getCountIssKwdOfDate(String date);    
    void deleteIssueKeyword(String date);
    void insertIssueKeyword(List<IssueKeyword> issKwdList) throws Exception;

    int getCountClstDataOfDate(String date);
    void deleteClstData(String date);
    void insertClstData(List<ClstData> clstDataList);

    int getCountClstDocsOfDate(String date);
    void deleteClstDocs(String date);
    void insertClstDocs(List<ClstDocs> clstDocsList);

    int getCountClstMstrOfDate(String date);
    void deleteClstMstr(String date);
    void insertClstMstr(List<ClstMstr> clstMstrList);

    int getCountKeywordReportDataOfUserId(KeywordReportData keywordReportData);
    void deleteKeywordReportUserId(KeywordReportData keywordReportData);
    List<IssueKeyword> getIssueKwdOfUserId(IssueKeyword issKwd);
    void insertKeywordReportData(KeywordReportData keywordReportData);
    void updateKeywordReportData(KeywordReportData keywordReportData);

    void deleteKeywordReport(String deleteDate);

    

    
    
}
