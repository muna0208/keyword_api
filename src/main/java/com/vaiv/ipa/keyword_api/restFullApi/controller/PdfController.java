package com.vaiv.ipa.keyword_api.restFullApi.controller;

import java.io.FileNotFoundException;

import com.vaiv.ipa.keyword_api.common.service.RestFullExceptionService;
import com.vaiv.ipa.keyword_api.common.utils.MakeUtil;
import com.vaiv.ipa.keyword_api.restFullApi.domain.ReportParams;
import com.vaiv.ipa.keyword_api.restFullApi.service.PdfService;

import org.apache.ibatis.javassist.tools.web.BadHttpRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/assembly")
public class PdfController {
    
    @Autowired
    private PdfService pdfService;

    @Autowired
    private RestFullExceptionService restFullExceptionService;

    // report pdf 파일 전송
    @RequestMapping(value = "/downloadUrlPDF")
    public ResponseEntity<Object> downloadUrlPDF(@RequestBody ReportParams reportParams){
        try {
            Resource resource = pdfService.downloadUrlPDF(reportParams);
            return ResponseEntity.ok()
                        .contentType(MediaType.parseMediaType("application/octet-stream"))
                        .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + resource.getFilename() + "\"")
                        .body(resource);
                
        } catch (BadHttpRequest e){
            return restFullExceptionService.exceptionBadRequest(MakeUtil.printErrorLogger(e, "downloadUrlPDF"));

        } catch (FileNotFoundException e){
            return restFullExceptionService.exceptionFailed(MakeUtil.printErrorLogger(e, "downloadUrlPDF"));

        } catch (Exception e) {
            return restFullExceptionService.exceptionFailed(MakeUtil.printErrorLogger(e, "downloadUrlPDF"));
        }finally{
            // 파일 삭제
            // pdfService.removePDF(reportParams);
        }
    }

    // PDF 생성용 보고서를 만들기 위해 생성 데이터
    @RequestMapping(value="/getSnsData")
    public ResponseEntity<Object> getSnsData(@ModelAttribute ReportParams reportParams){
        try {
            return new ResponseEntity<Object>(pdfService.getSnsData(reportParams), HttpStatus.OK);
        } catch (BadHttpRequest e){

            return restFullExceptionService.exceptionBadRequest(MakeUtil.printErrorLogger(e, "getSnsData"));
        } catch (Exception e) {
            return restFullExceptionService.exceptionFailed(MakeUtil.printErrorLogger(e, "getSnsData"));
        }
    }

}
