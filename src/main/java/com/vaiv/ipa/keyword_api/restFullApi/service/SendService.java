package com.vaiv.ipa.keyword_api.restFullApi.service;

import java.util.List;

import com.vaiv.ipa.keyword_api.common.utils.MakeUtil;
import com.vaiv.ipa.keyword_api.restFullApi.domain.ClstData;
import com.vaiv.ipa.keyword_api.restFullApi.domain.ClstDocs;
import com.vaiv.ipa.keyword_api.restFullApi.domain.ClstMstr;
import com.vaiv.ipa.keyword_api.restFullApi.domain.IssueKeyword;
import com.vaiv.ipa.keyword_api.restFullApi.mapper.SendMapper;

import org.apache.ibatis.javassist.tools.web.BadHttpRequest;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

@Service
@SuppressWarnings("static-access")
public class SendService {

    private static Logger logger = LoggerFactory.getLogger(SendService.class);
    
    @Autowired
    private SendMapper sendMapper;

    public JSONObject getIssueKwd(IssueKeyword issueKeyword) throws Exception{
        logger.info("getIssueKwd - "+issueKeyword.toString());
        JSONObject jsonResult = new JSONObject();
        JSONArray issuekeywordArr = new JSONArray();

        if( MakeUtil.isNotNullAndEmpty(issueKeyword.getGtrYmd()) && MakeUtil.isNotNullAndEmpty(issueKeyword.getUserId()) ){
            try {
                List<IssueKeyword> issuekeywordList = sendMapper.getIssueKwd(issueKeyword);
                for (IssueKeyword kwd : issuekeywordList) {
                    if( MakeUtil.isNotNullAndEmpty(kwd) )	issuekeywordArr.add(new JSONObject().fromObject(kwd));
                }
                
                jsonResult.put("error_message", "");
                jsonResult.put("return_code", "00");
                jsonResult.put("totalCount", issuekeywordArr.size());
                jsonResult.put("output", issuekeywordArr);

            } catch (Exception e) {
                jsonResult.put("error_message", e.toString());
                jsonResult.put("return_code", "99");
                jsonResult.put("output", "");
                e.printStackTrace();
            }

            logger.info("getIssueKwd result - userId: "+issueKeyword.getUserId()+", totalCount: "+issuekeywordArr.size()+" 완료!");
            return jsonResult;
        }else{
            throw new BadHttpRequest();
        }
    }

    public JSONObject getClstData(IssueKeyword issueKeyword) throws Exception{
        logger.info(issueKeyword.toString());
        JSONObject jsonResult = new JSONObject();
        JSONArray clstDataArr = new JSONArray();

        if( MakeUtil.isNotNullAndEmpty(issueKeyword.getGtrYmd()) && MakeUtil.isNotNullAndEmpty(issueKeyword.getUserId()) ){
            try {
                List<ClstData> clstDataList = sendMapper.getClstData(issueKeyword);
                for (ClstData clstData : clstDataList) {
                    if( MakeUtil.isNotNullAndEmpty(clstData) )	clstDataArr.add(new JSONObject().fromObject(clstData));
                }
                
                jsonResult.put("error_message", "");
                jsonResult.put("return_code", "00");
                jsonResult.put("totalCount", clstDataArr.size());
                jsonResult.put("output", clstDataArr);

            } catch (Exception e) {
                jsonResult.put("error_message", e.toString());
                jsonResult.put("return_code", "99");
                jsonResult.put("output", "");
                e.printStackTrace();
            }
            logger.info(jsonResult.toString());
            return jsonResult;
        }else{
            throw new BadHttpRequest();
        }
    }

    public JSONObject getClstDocs(IssueKeyword issueKeyword) throws Exception{
        logger.info(issueKeyword.toString());
        JSONObject jsonResult = new JSONObject();
        JSONArray clstDocsArr = new JSONArray();

        if( MakeUtil.isNotNullAndEmpty(issueKeyword.getGtrYmd()) && MakeUtil.isNotNullAndEmpty(issueKeyword.getUserId()) ){
            try {
                List<ClstDocs> clstDocsList = sendMapper.getClstDocs(issueKeyword);
                for (ClstDocs clstDocs : clstDocsList) {
                    if( MakeUtil.isNotNullAndEmpty(clstDocs) )	clstDocsArr.add(new JSONObject().fromObject(clstDocs));
                }
                
                jsonResult.put("error_message", "");
                jsonResult.put("return_code", "00");
                jsonResult.put("totalCount", clstDocsArr.size());
                jsonResult.put("output", clstDocsArr);

            } catch (Exception e) {
                jsonResult.put("error_message", e.toString());
                jsonResult.put("return_code", "99");
                jsonResult.put("output", "");
                e.printStackTrace();
            }
            logger.info(jsonResult.toString());
            return jsonResult;
        }else{
            throw new BadHttpRequest();
        }
    }
    
    public JSONObject getClstMstr(IssueKeyword issueKeyword) throws Exception{
        logger.info(issueKeyword.toString());
        JSONObject jsonResult = new JSONObject();
        JSONArray clstMstrArr = new JSONArray();

        if( MakeUtil.isNotNullAndEmpty(issueKeyword.getGtrYmd()) && MakeUtil.isNotNullAndEmpty(issueKeyword.getUserId()) ){
            try {
                List<ClstMstr> clstMstrList = sendMapper.getClstMstr(issueKeyword);
                for (ClstMstr clstMstr : clstMstrList) {
                    if( MakeUtil.isNotNullAndEmpty(clstMstr) )	clstMstrArr.add(new JSONObject().fromObject(clstMstr));
                }
                
                jsonResult.put("error_message", "");
                jsonResult.put("return_code", "00");
                jsonResult.put("totalCount", clstMstrArr.size());
                jsonResult.put("output", clstMstrArr);

            } catch (Exception e) {
                jsonResult.put("error_message", e.toString());
                jsonResult.put("return_code", "99");
                jsonResult.put("output", "");
                e.printStackTrace();
            }
            logger.info(jsonResult.toString());
            return jsonResult;
        }else{
            throw new BadHttpRequest();
        }
    }    

}
