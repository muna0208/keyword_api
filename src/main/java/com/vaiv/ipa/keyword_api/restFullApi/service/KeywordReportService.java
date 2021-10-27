package com.vaiv.ipa.keyword_api.restFullApi.service;

import com.vaiv.ipa.keyword_api.common.utils.MakeUtil;
import com.vaiv.ipa.keyword_api.restFullApi.domain.IssueKeyword;
import com.vaiv.ipa.keyword_api.restFullApi.domain.KeywordReport;
import com.vaiv.ipa.keyword_api.restFullApi.mapper.KeywordReportMapper;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javassist.tools.web.BadHttpRequest;
import net.sf.json.JSONObject;

@Service
@SuppressWarnings("static-access")
public class KeywordReportService {

    private static Logger logger = LoggerFactory.getLogger(KeywordReportService.class);
    
    @Autowired
    private KeywordReportMapper keywordReportMapper;

    public JSONObject getReportData(IssueKeyword issueKeyword) throws Exception{
        logger.info("getReportData - "+issueKeyword.toString());
        JSONObject jsonResult = null;
        
        if( MakeUtil.isNotNullAndEmpty(issueKeyword.getGtrYmd()) 
            && MakeUtil.isNotNullAndEmpty(issueKeyword.getUserId())
            && MakeUtil.isNotNullAndEmpty(issueKeyword.getClassName())
            && MakeUtil.isNotNullAndEmpty(issueKeyword.getIssKwd()) ){

            jsonResult = new JSONObject();
            jsonResult.put("result", "success");
            jsonResult.put("data", "");
            KeywordReport keywordReport = keywordReportMapper.getReportData(issueKeyword);

            if( MakeUtil.isNotNullAndEmpty(keywordReport) ){
                if( "component_diy_tsb1".equals(issueKeyword.getClassName()) && MakeUtil.isNotNullAndEmpty(keywordReport.getTsb1Data())){
                    jsonResult.put("result", "success");    
                    jsonResult.put("data", new JSONObject().fromObject(keywordReport.getTsb1Data()));
    
                }else if( "component_diy_asb1".equals(issueKeyword.getClassName()) && MakeUtil.isNotNullAndEmpty(keywordReport.getTsb1Data())){
                    jsonResult.put("result", "success");    
                    jsonResult.put("data", new JSONObject().fromObject(keywordReport.getAsb1Data()));
    
                }else if( "component_diy_stb3".equals(issueKeyword.getClassName()) && MakeUtil.isNotNullAndEmpty(keywordReport.getStb3Data())){
                    jsonResult.put("result", "success");
                    jsonResult.put("data", new JSONObject().fromObject(keywordReport.getStb3Data()));
    
                }else if( "component_diy_tsl1".equals(issueKeyword.getClassName()) && MakeUtil.isNotNullAndEmpty(keywordReport.getTsl1Data())){
                    jsonResult.put("result", "success");
                    jsonResult.put("data", new JSONObject().fromObject(keywordReport.getTsl1Data()));
    
                }else if( "component_diy_tsl2".equals(issueKeyword.getClassName()) && MakeUtil.isNotNullAndEmpty(keywordReport.getTsl2Data())){
                    jsonResult.put("result", "success");
                    jsonResult.put("data", new JSONObject().fromObject(keywordReport.getTsl2Data()));
    
                }else if( "component_diy_dob1".equals(issueKeyword.getClassName()) && MakeUtil.isNotNullAndEmpty(keywordReport.getDob1Data())){
                    jsonResult.put("result", "success");
                    jsonResult.put("data", new JSONObject().fromObject(keywordReport.getDob1Data()));
                }
                logger.info("getReportData "+issueKeyword.getClassName()+" 전송!!! ");
                
            }else{
                logger.info("getReportData "+issueKeyword.getClassName()+" 없음... ");
            }
            
            return jsonResult;
        }else{
            throw new BadHttpRequest();
        }
    }
    
}
