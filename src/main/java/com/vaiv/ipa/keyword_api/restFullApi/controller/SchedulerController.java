package com.vaiv.ipa.keyword_api.restFullApi.controller;

import com.vaiv.ipa.keyword_api.common.service.RestFullExceptionService;
import com.vaiv.ipa.keyword_api.common.utils.MakeUtil;
import com.vaiv.ipa.keyword_api.restFullApi.domain.IssueKeyword;
import com.vaiv.ipa.keyword_api.scheduler.SchedulerService;

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
public class SchedulerController {
    
    @Autowired
    private SchedulerService schedulerService;

    @Autowired
    private RestFullExceptionService restFullExceptionService;



    // 이슈키워드 가져와서 DB에 저장
    @PostMapping(value="/setIssueKwd")
    public ResponseEntity<Object> setIssueKwd(@RequestBody IssueKeyword issueKeyword){
        try {
            return new ResponseEntity<Object>(schedulerService.setIssueKwd(issueKeyword.getGtrYmd()), HttpStatus.OK);

        } catch (BadHttpRequest e){
            return restFullExceptionService.exceptionBadRequest(MakeUtil.printErrorLogger(e, "setIssueKwd"));

        } catch (Exception e) {
            return restFullExceptionService.exceptionFailed(MakeUtil.printErrorLogger(e, "setIssueKwd"));
        }
    }


    // 메인 클러스터 정보 가져와서 DB에 저장
    @PostMapping(value="/setClstData")
    public ResponseEntity<Object> setClstData(@RequestBody IssueKeyword issueKeyword){
        try {
            return new ResponseEntity<Object>(schedulerService.setClstData(issueKeyword.getGtrYmd()), HttpStatus.OK);

        } catch (BadHttpRequest e){
            return restFullExceptionService.exceptionBadRequest(MakeUtil.printErrorLogger(e, "setClstData"));

        } catch (Exception e) {
            return restFullExceptionService.exceptionFailed(MakeUtil.printErrorLogger(e, "setClstData"));
        }
    }


    // 클러스터 상세정보 가져와서 DB에 저장
    @PostMapping(value="/setClstDocs")
    public ResponseEntity<Object> setClstDocs(@RequestBody IssueKeyword issueKeyword){
        try {
            return new ResponseEntity<Object>(schedulerService.setClstDocs(issueKeyword.getGtrYmd()), HttpStatus.OK);

        } catch (BadHttpRequest e){
            return restFullExceptionService.exceptionBadRequest(MakeUtil.printErrorLogger(e, "setClstDocs"));

        } catch (Exception e) {
            return restFullExceptionService.exceptionFailed(MakeUtil.printErrorLogger(e, "setClstDocs"));
        }
    }

    // 클러스터 기본정보 가져와서 DB에 저장
    @PostMapping(value="/setClstMstr")
    public ResponseEntity<Object> setClstMstr(@RequestBody IssueKeyword issueKeyword){
        try {
            return new ResponseEntity<Object>(schedulerService.setClstMstr(issueKeyword.getGtrYmd()), HttpStatus.OK);

        } catch (BadHttpRequest e){
            return restFullExceptionService.exceptionBadRequest(MakeUtil.printErrorLogger(e, "setClstMstr"));

        } catch (Exception e) {
            return restFullExceptionService.exceptionFailed(MakeUtil.printErrorLogger(e, "setClstMstr"));
        }
    }


    // userId 리포트 데이터 가져와서 DB에 저장
    @PostMapping(value="/setReportDataOfUserId")
    public ResponseEntity<Object> setReportDataOfUserId(@RequestBody IssueKeyword issueKeyword){
        try {
            return new ResponseEntity<Object>(schedulerService.setReportDataOfUserId(issueKeyword.getGtrYmd(), issueKeyword.getUserId()), HttpStatus.OK);

        } catch (BadHttpRequest e){
            return restFullExceptionService.exceptionBadRequest(MakeUtil.printErrorLogger(e, "setReportDataOfUserId"));

        } catch (Exception e) {
            return restFullExceptionService.exceptionFailed(MakeUtil.printErrorLogger(e, "setReportDataOfUserId"));
        }
    }

    // rank별 리포트 데이터 저장
    @PostMapping(value="/setReportDataOfRank")
    public ResponseEntity<Object> setReportDataOfRank(@RequestBody IssueKeyword issueKeyword){
        try {
            return new ResponseEntity<Object>(schedulerService.setReportDataOfRank(issueKeyword.getGtrYmd(), issueKeyword.getRnk()), HttpStatus.OK);

        } catch (BadHttpRequest e){
            return restFullExceptionService.exceptionBadRequest(MakeUtil.printErrorLogger(e, "setReportDataOfRank"));

        } catch (Exception e) {
            return restFullExceptionService.exceptionFailed(MakeUtil.printErrorLogger(e, "setReportDataOfRank"));
        }
    }
}
