package com.vaiv.ipa.keyword_api.restFullApi.mapper;

import java.util.List;

import com.vaiv.ipa.keyword_api.restFullApi.domain.ClstDocs;
import com.vaiv.ipa.keyword_api.restFullApi.domain.IssueKeyword;
import com.vaiv.ipa.keyword_api.restFullApi.domain.NewsAnalyticsISK10;
import com.vaiv.ipa.keyword_api.restFullApi.domain.NewsAnalyticsISKManagement;
import com.vaiv.ipa.keyword_api.restFullApi.domain.NewsAnalyticsIssueKeywords;
import com.vaiv.ipa.keyword_api.restFullApi.domain.NewsAnalyticsNews;


import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface KeywordMapper {
    
    List<IssueKeyword> getIssueKeyword(IssueKeyword issueKeyword) throws Exception;

    List<ClstDocs> getTopNews(ClstDocs clstDocs) throws Exception;

    List<NewsAnalyticsISK10> getNewsAnalyticsISK10(NewsAnalyticsISK10 newsAnalyticsISK10) throws Exception;  //뉴스분석 페이지 - 키워드10
    
    List<NewsAnalyticsIssueKeywords> getNewsAnalyticsIssueKeywords(NewsAnalyticsIssueKeywords newsAnalyticsIssueKeywords) throws Exception; //뉴스분석 페이지 - 이슈키워드

    List<NewsAnalyticsNews> getNewsAnalyticsNews(NewsAnalyticsNews newsAnalyticsNews) throws Exception; //뉴스분석 페이지 -뉴스

    List<NewsAnalyticsISKManagement> getNewsAnalyticsISKManagement(NewsAnalyticsISKManagement newsAnalyticsISKManagement) throws Exception; //뉴스분석 페이지 - 이슈키워드 관리

    void getNewsAnalyticsISKUpdate(NewsAnalyticsISKManagement newsAnalyticsISKManagement) throws Exception;  //뉴스분석 페이지 - 이슈키워드 관리 수정

    String getIssKwdLatestDate(IssueKeyword issueKeyword);

    int issueKeywordRepresentCount(IssueKeyword issueKeyword);

    int issueKeywordJointCount(IssueKeyword issueKeyword);

    int issueKeywordCount(IssueKeyword issueKeyword);

    
}
