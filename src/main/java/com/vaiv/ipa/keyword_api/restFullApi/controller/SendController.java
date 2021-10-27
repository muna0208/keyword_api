package com.vaiv.ipa.keyword_api.restFullApi.controller;

import com.vaiv.ipa.keyword_api.common.service.RestFullExceptionService;
import com.vaiv.ipa.keyword_api.common.utils.MakeUtil;
import com.vaiv.ipa.keyword_api.restFullApi.domain.IssueKeyword;
import com.vaiv.ipa.keyword_api.restFullApi.service.SendService;

import org.apache.ibatis.javassist.tools.web.BadHttpRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/assembly")
public class SendController {
    
    @Autowired
    private SendService sendService;

    @Autowired
    private RestFullExceptionService restFullExceptionService;

    // getIssueKwd 데이터 전송
    @PostMapping(value="/getIssueKwd")
    public ResponseEntity<Object> getIssueKwd(@RequestBody IssueKeyword issueKeyword){
        try {
            return new ResponseEntity<Object>(sendService.getIssueKwd(issueKeyword), HttpStatus.OK);
        } catch (BadHttpRequest e){

            return restFullExceptionService.exceptionBadRequest(MakeUtil.printErrorLogger(e, "getIssueKwd"));
        } catch (Exception e) {
            return restFullExceptionService.exceptionFailed(MakeUtil.printErrorLogger(e, "getIssueKwd"));
        }
    }

    // getClstData 데이터 전송
    @PostMapping(value="/getClstData")
    public ResponseEntity<Object> getClstData(@RequestBody IssueKeyword issueKeyword){
        try {
            return new ResponseEntity<Object>(sendService.getClstData(issueKeyword), HttpStatus.OK);
        } catch (BadHttpRequest e){

            return restFullExceptionService.exceptionBadRequest(MakeUtil.printErrorLogger(e, "getClstData"));
        } catch (Exception e) {
            return restFullExceptionService.exceptionFailed(MakeUtil.printErrorLogger(e, "getClstData"));
        }
    }

    // getClstDocs 데이터 전송
    @PostMapping(value="/getClstDocs")
    public ResponseEntity<Object> getClstDocs(@RequestBody IssueKeyword issueKeyword){
        try {
            return new ResponseEntity<Object>(sendService.getClstDocs(issueKeyword), HttpStatus.OK);
        } catch (BadHttpRequest e){

            return restFullExceptionService.exceptionBadRequest(MakeUtil.printErrorLogger(e, "getClstDocs"));
        } catch (Exception e) {
            return restFullExceptionService.exceptionFailed(MakeUtil.printErrorLogger(e, "getClstDocs"));
        }
    }

    // getClstMstr 데이터 전송
    @PostMapping(value="/getClstMstr")
    public ResponseEntity<Object> getClstMstr(@RequestBody IssueKeyword issueKeyword){
        try {
            return new ResponseEntity<Object>(sendService.getClstMstr(issueKeyword), HttpStatus.OK);
        } catch (BadHttpRequest e){

            return restFullExceptionService.exceptionBadRequest(MakeUtil.printErrorLogger(e, "getClstMstr"));
        } catch (Exception e) {
            return restFullExceptionService.exceptionFailed(MakeUtil.printErrorLogger(e, "getClstMstr"));
        }
    }            

}
