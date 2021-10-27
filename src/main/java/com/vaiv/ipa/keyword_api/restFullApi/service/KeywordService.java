package com.vaiv.ipa.keyword_api.restFullApi.service;

import java.util.List;

import com.vaiv.ipa.keyword_api.common.utils.MakeUtil;
import com.vaiv.ipa.keyword_api.restFullApi.domain.ClstDocs;
import com.vaiv.ipa.keyword_api.restFullApi.domain.IssueKeyword;
import com.vaiv.ipa.keyword_api.restFullApi.domain.NewsAnalyticsISK10;
import com.vaiv.ipa.keyword_api.restFullApi.domain.NewsAnalyticsISKManagement;
import com.vaiv.ipa.keyword_api.restFullApi.domain.NewsAnalyticsIssueKeywords;
import com.vaiv.ipa.keyword_api.restFullApi.domain.NewsAnalyticsNews;
import com.vaiv.ipa.keyword_api.restFullApi.mapper.KeywordMapper;

import org.apache.ibatis.javassist.tools.web.BadHttpRequest;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.MultiValueMap;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

@Service
@SuppressWarnings("static-access")
public class KeywordService {
    
    private static Logger logger = LoggerFactory.getLogger(KeywordService.class);
    
    @Autowired
    private KeywordMapper keywordMapper;

    public JSONObject getIssueKeyword(IssueKeyword issueKeyword) throws BadHttpRequest{
        logger.info("getIssueKeyword - "+issueKeyword.toString());
        JSONObject jsonResult = new JSONObject();
        JSONArray jsonArr = new JSONArray();
        
        if( MakeUtil.isNotNullAndEmpty(issueKeyword.getGtrYmd()) && MakeUtil.isNotNullAndEmpty(issueKeyword.getUserId())){
            try {
                List<IssueKeyword> list = keywordMapper.getIssueKeyword(issueKeyword);
                for (IssueKeyword keyword : list) {
                    if( MakeUtil.isNotNullAndEmpty(keyword) )	jsonArr.add(new JSONObject().fromObject(keyword));
                }

                jsonResult.put("error_message", "");
                jsonResult.put("return_code", "00");
                jsonResult.put("issueKeywordJointCount", keywordMapper.issueKeywordJointCount(issueKeyword));
                jsonResult.put("totalCount", jsonArr.size());
                jsonResult.put("output", jsonArr);

            } catch (Exception e) {
                jsonResult.put("error_message", e.toString());
                jsonResult.put("return_code", "99");
                jsonResult.put("output", "");
                logger.error("getIssueKeyword", e);
            }

            logger.info("getIssueKeyword result - "+jsonResult.toString());
            return jsonResult;
        }else{
            throw new BadHttpRequest();
        }
    }

    public JSONObject getTopNews(ClstDocs clstDocs) throws BadHttpRequest{
        logger.info("getTopNews - "+clstDocs.toString());
        JSONObject jsonResult = new JSONObject();
        JSONArray jsonArr = new JSONArray();
        
        if( MakeUtil.isNotNullAndEmpty(clstDocs.getGtrYmd()) && MakeUtil.isNotNullAndEmpty(clstDocs.getUserId())){
            try {
                List<ClstDocs> list = keywordMapper.getTopNews(clstDocs);
                for (ClstDocs clstDoc : list) {
                    if( MakeUtil.isNotNullAndEmpty(clstDoc) )	jsonArr.add(new JSONObject().fromObject(clstDoc));
                }
                jsonResult.put("error_message", "");
                jsonResult.put("return_code", "00");
                jsonResult.put("totalCount", jsonArr.size());
                jsonResult.put("output", jsonArr);

            } catch (Exception e) {
                jsonResult.put("error_message", e.toString());
                jsonResult.put("return_code", "99");
                jsonResult.put("output", "");
                logger.error("getTopNews", e);
            }
            
            logger.info("getTopNews result - "+jsonResult.toString());
            return jsonResult;
        }else{
            throw new BadHttpRequest();
        }
    }


    public JSONObject getIssueKeywordCount(IssueKeyword issueKeyword) throws BadHttpRequest{
        logger.info("getIssueKeywordCount - "+issueKeyword.toString());
        JSONObject jsonResult = new JSONObject();
        JSONArray jsonArr = new JSONArray();
        
        if( MakeUtil.isNotNullAndEmpty(issueKeyword.getGtrYmd()) && MakeUtil.isNotNullAndEmpty(issueKeyword.getUserId())){
            try {
                jsonResult.put("error_message", "");
                jsonResult.put("return_code", "00");
                jsonResult.put("issueKeywordRepresentCount", keywordMapper.issueKeywordRepresentCount(issueKeyword));
                jsonResult.put("issueKeywordJointCount", keywordMapper.issueKeywordJointCount(issueKeyword));
                jsonResult.put("issueKeywordCount", keywordMapper.issueKeywordCount(issueKeyword));
                jsonResult.put("totalCount", jsonArr.size());
                jsonResult.put("output", jsonArr);

            } catch (Exception e) {
                jsonResult.put("error_message", e.toString());
                jsonResult.put("return_code", "99");
                jsonResult.put("output", "");
                logger.error("getIssueKeywordCount", e);
            }
            
            logger.info("getIssueKeywordCount result - "+jsonResult.toString());
            return jsonResult;
        }else{
            throw new BadHttpRequest();
        }
    }

    // 뉴스분석 페이지 - 이슈10
    public JSONObject getNewsAnalyticsISK10(NewsAnalyticsISK10 newsAnalyticsISK10) throws BadHttpRequest{
        logger.info("getNewsAnalyticsISK10 - "+newsAnalyticsISK10.toString());
        JSONObject jsonResult = new JSONObject();
        JSONArray jsonArr = new JSONArray();
        
        if( MakeUtil.isNotNullAndEmpty(newsAnalyticsISK10.getGtrYmd()) && MakeUtil.isNotNullAndEmpty(newsAnalyticsISK10.getUserId())){
            System.out.println(newsAnalyticsISK10.getGtrYmd());
            System.out.println(newsAnalyticsISK10.getUserId());
            try {
                List<NewsAnalyticsISK10> list = keywordMapper.getNewsAnalyticsISK10(newsAnalyticsISK10);
                for (NewsAnalyticsISK10 newsAnalyticsIsk10 : list) {
                    if( MakeUtil.isNotNullAndEmpty(newsAnalyticsIsk10) ) jsonArr.add(new JSONObject().fromObject(newsAnalyticsIsk10));
                }
                jsonResult.put("error_message", "");
                jsonResult.put("return_code", "00");
                jsonResult.put("totalCount", jsonArr.size());
                jsonResult.put("output", jsonArr);

            } catch (Exception e) {
                jsonResult.put("error_message", e.toString());
                jsonResult.put("return_code", "99");
                jsonResult.put("output", "");
                logger.error("getNewsAnalyticsISK10", e);
            }
                        
            return jsonResult;
        }else{
            throw new BadHttpRequest();
        }
    }

    // 뉴스분석 페이지 - 이슈 키워드 뉴스
    public JSONObject getNewsAnalyticsIssueKeywords(NewsAnalyticsIssueKeywords newsAnalyticsIssueKeywords) throws BadHttpRequest{
        logger.info("getNewsAnalyticsIssueKeywords - "+newsAnalyticsIssueKeywords.toString());
        JSONObject jsonResult = new JSONObject();
        JSONArray jsonArr = new JSONArray();

        if( MakeUtil.isNotNullAndEmpty(newsAnalyticsIssueKeywords.getGtrYmd()) && MakeUtil.isNotNullAndEmpty(newsAnalyticsIssueKeywords.getUserId()) && MakeUtil.isNotNullAndEmpty(newsAnalyticsIssueKeywords.getIssKwd())){

            try {
                List<NewsAnalyticsIssueKeywords> list = keywordMapper.getNewsAnalyticsIssueKeywords(newsAnalyticsIssueKeywords);
                for (NewsAnalyticsIssueKeywords newsAnalyticsISK : list) {
                    if( MakeUtil.isNotNullAndEmpty(newsAnalyticsISK) )	jsonArr.add(new JSONObject().fromObject(newsAnalyticsISK));
                }
                jsonResult.put("error_message", "");
                jsonResult.put("return_code", "00");
                jsonResult.put("totalCount", jsonArr.size());
                jsonResult.put("output", jsonArr);

            } catch (Exception e) {
                jsonResult.put("error_message", e.toString());
                jsonResult.put("return_code", "99");
                jsonResult.put("output", "");
                logger.error("getNewsAnalyticsIssueKeywords", e);
            }
                        
            return jsonResult;
        }else{
            throw new BadHttpRequest();
        }
    }

    // 뉴스분석 페이지 - 뉴스10
    public JSONObject getNewsAnalyticsNews(NewsAnalyticsNews newsAnalyticsNews) throws BadHttpRequest{
        logger.info("getNewsAnalyticsNews - "+newsAnalyticsNews.toString());
        JSONObject jsonResult = new JSONObject();
        JSONArray jsonArr = new JSONArray();
        
        if( MakeUtil.isNotNullAndEmpty(newsAnalyticsNews.getGtrYmd()) && MakeUtil.isNotNullAndEmpty(newsAnalyticsNews.getUserId())){
            try {
                List<NewsAnalyticsNews> list = keywordMapper.getNewsAnalyticsNews(newsAnalyticsNews);
                for (NewsAnalyticsNews news10 : list) {
                    if( MakeUtil.isNotNullAndEmpty(news10) ) jsonArr.add(new JSONObject().fromObject(news10));
                }
                jsonResult.put("error_message", "");
                jsonResult.put("return_code", "00");
                jsonResult.put("totalCount", jsonArr.size());
                jsonResult.put("output", jsonArr);

            } catch (Exception e) {
                jsonResult.put("error_message", e.toString());
                jsonResult.put("return_code", "99");
                jsonResult.put("output", "");
                logger.error("getNewsAnalyticsNews", e);
            }
                        
            return jsonResult;
        }else{
            throw new BadHttpRequest();
        }
    }
       //뉴스분석 페이지 - 이슈키워드 관리
    public JSONObject getNewsAnalyticsISKManagement(NewsAnalyticsISKManagement newsAnalyticsISKManagement) throws BadHttpRequest{
        logger.info("getNewsAnalyticsISKManagement - "+newsAnalyticsISKManagement.toString());
        JSONObject jsonResult = new JSONObject();
        JSONArray jsonArr = new JSONArray();
        
        if( MakeUtil.isNotNullAndEmpty(newsAnalyticsISKManagement.getGtrYmd()) && MakeUtil.isNotNullAndEmpty(newsAnalyticsISKManagement.getUserId())){
            
            try {
                if( !MakeUtil.isNotNullAndEmpty(newsAnalyticsISKManagement.getExtrType()) )
                    newsAnalyticsISKManagement.setExtrType("I");
                
                List<NewsAnalyticsISKManagement> list = keywordMapper.getNewsAnalyticsISKManagement(newsAnalyticsISKManagement);
                for (NewsAnalyticsISKManagement newsManagement : list) {
                    if( MakeUtil.isNotNullAndEmpty(newsManagement) ) jsonArr.add(new JSONObject().fromObject(newsManagement));
                }
                jsonResult.put("error_message", "");
                jsonResult.put("return_code", "00");
                jsonResult.put("totalCount", jsonArr.size());
                jsonResult.put("output", jsonArr);

            } catch (Exception e) {
                jsonResult.put("error_message", e.toString());
                jsonResult.put("return_code", "99");
                jsonResult.put("output", "");
                logger.error("getNewsAnalyticsISKManagement", e);
            }
                        
            return jsonResult;
        }else{
            throw new BadHttpRequest();
        }
    }

    // 뉴스분석 페이지 - 이슈키워드 관리 수정
    public JSONObject getNewsAnalyticsISKUpdate(NewsAnalyticsISKManagement newsAnalyticsISKManagement) throws BadHttpRequest{
        logger.info("getNewsAnalyticsISKUpdate - "+newsAnalyticsISKManagement.toString());
        JSONObject jsonResult = new JSONObject();

        if( MakeUtil.isNotNullAndEmpty(newsAnalyticsISKManagement.getUserId()) 
            && MakeUtil.isNotNullAndEmpty(newsAnalyticsISKManagement.getIssKwdId())){
            try {
                // 업데이트
                keywordMapper.getNewsAnalyticsISKUpdate(newsAnalyticsISKManagement);

                jsonResult.put("error_message", "");
                jsonResult.put("return_code", "00");
                jsonResult.put("output", "success");

            } catch (Exception e) {
                jsonResult.put("error_message", e.toString());
                jsonResult.put("return_code", "99");
                jsonResult.put("output", "");
                logger.error("getNewsAnalyticsISKUpdate", e);
            }
            return jsonResult;
        }else{
            throw new BadHttpRequest();
        }
    }

    public JSONObject getIssKwdLatestDate(IssueKeyword issueKeyword) throws BadHttpRequest{
        logger.info("getIssKwdLatestDate - userId: "+issueKeyword.getUserId());
        JSONObject jsonResult = new JSONObject();
        
        if( MakeUtil.isNotNullAndEmpty(issueKeyword.getUserId())){
            try {
                String issKwdLatestDate = keywordMapper.getIssKwdLatestDate(issueKeyword);
                
                jsonResult.put("error_message", "");
                jsonResult.put("return_code", "00");
                jsonResult.put("output", issKwdLatestDate);

            } catch (Exception e) {
                jsonResult.put("error_message", e.toString());
                jsonResult.put("return_code", "99");
                jsonResult.put("output", "");
                logger.error("getIssKwdLatestDate", e);
            }
            logger.info(jsonResult.toString());
            return jsonResult; 
        }else{
            throw new BadHttpRequest();
        }
    }


}