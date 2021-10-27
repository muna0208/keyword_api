package com.vaiv.ipa.keyword_api.restFullApi.controller;

import java.net.URLDecoder;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.vaiv.ipa.keyword_api.common.service.RestFullExceptionService;
import com.vaiv.ipa.keyword_api.common.utils.MakeUtil;
import com.vaiv.ipa.keyword_api.restFullApi.domain.ClstDocs;
import com.vaiv.ipa.keyword_api.restFullApi.domain.IssueKeyword;
import com.vaiv.ipa.keyword_api.restFullApi.domain.NewsAnalyticsISK10;
import com.vaiv.ipa.keyword_api.restFullApi.domain.NewsAnalyticsISKManagement;
import com.vaiv.ipa.keyword_api.restFullApi.domain.NewsAnalyticsIssueKeywords;
import com.vaiv.ipa.keyword_api.restFullApi.domain.NewsAnalyticsNews;
import com.vaiv.ipa.keyword_api.restFullApi.service.KeywordService;

import org.apache.ibatis.javassist.tools.web.BadHttpRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/assembly")
public class KeywordController {
    
    @Autowired
    private KeywordService keywordService;

    @Autowired
    private RestFullExceptionService restFullExceptionService;

    // 이슈키워드 
    @PostMapping(value="/isk1")
    public ResponseEntity<Object> getIssueKeyword(@RequestBody IssueKeyword issueKeyword){
        try {
            return new ResponseEntity<Object>(keywordService.getIssueKeyword(issueKeyword), HttpStatus.OK);
        } catch (BadHttpRequest e){

            return restFullExceptionService.exceptionBadRequest(MakeUtil.printErrorLogger(e, "getIssueKeyword"));
        } catch (Exception e) {
            return restFullExceptionService.exceptionFailed(MakeUtil.printErrorLogger(e, "getIssueKeyword"));
        }
    }

    // Top 10 뉴스
    @PostMapping(value="/top10")
    public ResponseEntity<Object> getTopNews(@RequestBody ClstDocs clstDocs){
        try {
            return new ResponseEntity<Object>(keywordService.getTopNews(clstDocs), HttpStatus.OK);
        } catch (BadHttpRequest e){
            return restFullExceptionService.exceptionBadRequest(MakeUtil.printErrorLogger(e, "getTopNews"));
        } catch (Exception e) {
            return restFullExceptionService.exceptionFailed(MakeUtil.printErrorLogger(e, "getTopNews"));
        }
    }

    // 이슈키워드 갯수
    @PostMapping(value="/getIssueKeywordCount")
    public ResponseEntity<Object> getIssueKeywordCount(@RequestBody IssueKeyword issueKeyword){
        try {
            return new ResponseEntity<Object>(keywordService.getIssueKeywordCount(issueKeyword), HttpStatus.OK);
        } catch (BadHttpRequest e){

            return restFullExceptionService.exceptionBadRequest(MakeUtil.printErrorLogger(e, "getIssueKeywordCount"));
        } catch (Exception e) {
            return restFullExceptionService.exceptionFailed(MakeUtil.printErrorLogger(e, "getIssueKeywordCount"));
        }
    }

    //뉴스분석 페이지 - 키워드10
    @GetMapping(value="/newsanalytics_isk10")
    public ResponseEntity<Object> getNewsAnalyticsISK10(Model reqParam, @ModelAttribute NewsAnalyticsISK10 newsAnalyticsISK10){
       try {
            return new ResponseEntity<Object>(keywordService.getNewsAnalyticsISK10(newsAnalyticsISK10), HttpStatus.OK);
        } catch (BadHttpRequest e){
           return restFullExceptionService.exceptionBadRequest(MakeUtil.printErrorLogger(e, "getNewsAnalyticsISK10"));
        } catch (Exception e) {
            return restFullExceptionService.exceptionFailed(MakeUtil.printErrorLogger(e, "getNewsAnalyticsISK10"));
        }
    } 

    
    // 뉴스페이지 - 키워드 뉴스
    @RequestMapping(value="/newsanalytics_isk")
        public ResponseEntity<Object> getNewsAnalyticsIssueKeywords(Model reqParam, @ModelAttribute NewsAnalyticsIssueKeywords newsAnalyticsIssueKeywords){
        try{
            return new ResponseEntity<Object>(keywordService.getNewsAnalyticsIssueKeywords(newsAnalyticsIssueKeywords), HttpStatus.OK);
        } catch (BadHttpRequest e){
            return restFullExceptionService.exceptionBadRequest(MakeUtil.printErrorLogger(e, "getNewsAnalyticsIssueKeywords"));
        }catch(Exception e){
            return restFullExceptionService.exceptionFailed(MakeUtil.printErrorLogger(e, "getNewsAnalyticsIssueKeywords"));
        }
    }

    // 뉴스페이지 - 뉴스
    @GetMapping(value="/newsanalytics_news")
    public ResponseEntity<Object> getNewsAnalyticsNews(Model reqParam, @ModelAttribute NewsAnalyticsNews newsAnalyticsNews){
        try {
            return new ResponseEntity<Object>(keywordService.getNewsAnalyticsNews(newsAnalyticsNews), HttpStatus.OK);
        } catch (BadHttpRequest e){
            return restFullExceptionService.exceptionBadRequest(MakeUtil.printErrorLogger(e, "getNewsAnalyticsNews"));
        } catch (Exception e) {
            return restFullExceptionService.exceptionFailed(MakeUtil.printErrorLogger(e, "getNewsAnalyticsNews"));
        }
    }

    //뉴스분석 페이지 - 이슈키워드 관리
    @GetMapping(value="/newsanalyticsisk_management")
    public ResponseEntity<Object> getNewsAnalyticsISKManagement(Model reqParam, @ModelAttribute NewsAnalyticsISKManagement newsAnalyticsISKManagement){
       try {
            return new ResponseEntity<Object>(keywordService.getNewsAnalyticsISKManagement(newsAnalyticsISKManagement), HttpStatus.OK);
        } catch (BadHttpRequest e){
           return restFullExceptionService.exceptionBadRequest(MakeUtil.printErrorLogger(e, "getNewsAnalyticsISKManagement"));
        } catch (Exception e) {
            return restFullExceptionService.exceptionFailed(MakeUtil.printErrorLogger(e, "getNewsAnalyticsISKManagement"));
        }
    }

      // 뉴스페이지 - 키워드 괸리 수정
    @RequestMapping(value="/newsanalyticsisk_Update")
    public ResponseEntity<Object> getNewsAnalyticsISKUpdate(Model reqParam, @ModelAttribute NewsAnalyticsISKManagement newsAnalyticsISKManagement){
        try{
            return new ResponseEntity<Object>(keywordService.getNewsAnalyticsISKUpdate(newsAnalyticsISKManagement), HttpStatus.OK);
        } catch (BadHttpRequest e){
            return restFullExceptionService.exceptionBadRequest(MakeUtil.printErrorLogger(e, "getNewsAnalyticsISKUpdate"));
        }catch(Exception e){
            return restFullExceptionService.exceptionFailed(MakeUtil.printErrorLogger(e, "getNewsAnalyticsISKUpdate"));
        }
    }

    // 이슈키워드 최근 date
    @PostMapping(value="/getIssKwdLatestDate")
    public ResponseEntity<Object> getIssKwdLatestDate(@RequestBody IssueKeyword issueKeyword){
        try {
            return new ResponseEntity<Object>(keywordService.getIssKwdLatestDate(issueKeyword), HttpStatus.OK);
        } catch (BadHttpRequest e){

            return restFullExceptionService.exceptionBadRequest(MakeUtil.printErrorLogger(e, "getIssueKeyword"));
        } catch (Exception e) {
            return restFullExceptionService.exceptionFailed(MakeUtil.printErrorLogger(e, "getIssueKeyword"));
        }
    }
}
    
 