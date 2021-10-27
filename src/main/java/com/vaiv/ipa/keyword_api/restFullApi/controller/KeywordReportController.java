package com.vaiv.ipa.keyword_api.restFullApi.controller;

import com.vaiv.ipa.keyword_api.common.service.RestFullExceptionService;
import com.vaiv.ipa.keyword_api.common.utils.MakeUtil;
import com.vaiv.ipa.keyword_api.restFullApi.domain.IssueKeyword;
import com.vaiv.ipa.keyword_api.restFullApi.service.KeywordReportService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javassist.tools.web.BadHttpRequest;

@RestController
@RequestMapping(value = "/assembly")
public class KeywordReportController {
    
    @Autowired
    private KeywordReportService keywordReportService;

    @Autowired
    private RestFullExceptionService restFullExceptionService;

    
    // report data 
    @PostMapping(value="/getReportData")
    public ResponseEntity<Object> getReportData(@RequestBody IssueKeyword issueKeyword){
        try {
            return new ResponseEntity<Object>(keywordReportService.getReportData(issueKeyword), HttpStatus.OK);
        } catch (BadHttpRequest e){

            return restFullExceptionService.exceptionBadRequest(MakeUtil.printErrorLogger(e, "getIssueKeyword"));
        } catch (Exception e) {
            return restFullExceptionService.exceptionFailed(MakeUtil.printErrorLogger(e, "getIssueKeyword"));
        }
    }

}
