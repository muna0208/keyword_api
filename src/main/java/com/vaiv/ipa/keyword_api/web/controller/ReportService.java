package com.vaiv.ipa.keyword_api.web.controller;

import com.vaiv.ipa.keyword_api.common.service.HttpService;
import com.vaiv.ipa.keyword_api.restFullApi.domain.ReportParams;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import net.sf.json.JSONObject;

@Service
public class ReportService {
    
    private static Logger logger = LoggerFactory.getLogger(ReportService.class);

    @Value("${legisReport.url}")
    private String LEGIS_REPORT_URL;

    @Value("${legisReport.method}")
    private String LEGIS_REPORT_METHOD;

    @Value("${legisReport.isUsed}")
    private boolean LEGIS_REPORT_IS_USERD;

    @Autowired
    private HttpService httpService;
    
    public JSONObject getLegisReport(ReportParams reportParams) {
        JSONObject result = null;
        String url = LEGIS_REPORT_URL + LEGIS_REPORT_METHOD;
        
        try {
            if( LEGIS_REPORT_IS_USERD ){
                url += "?userId="+reportParams.getUserId();
                JSONObject httpResult = httpService.httpGET(url);
                result = JSONObject.fromObject(httpResult.get("data"));

            }else{
                result = new JSONObject();
                result.put("agenda", "[]");
                result.put("pressRelease", "[]");
                result.put("processingStatus", "[]");
            }           

        } catch (Exception e) {
            logger.error("Error ", e);
        }

        return result;
    }


}
