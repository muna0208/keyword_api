package com.vaiv.ipa.keyword_api.scheduler;


import java.util.List;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.vaiv.ipa.keyword_api.common.service.HttpService;
import com.vaiv.ipa.keyword_api.common.utils.MakeUtil;
import com.vaiv.ipa.keyword_api.restFullApi.domain.ClstData;
import com.vaiv.ipa.keyword_api.restFullApi.domain.ClstDocs;
import com.vaiv.ipa.keyword_api.restFullApi.domain.ClstMstr;
import com.vaiv.ipa.keyword_api.restFullApi.domain.CongressmanInfo;
import com.vaiv.ipa.keyword_api.restFullApi.domain.IssueKeyword;
import com.vaiv.ipa.keyword_api.restFullApi.domain.KeywordReportData;
import com.vaiv.ipa.keyword_api.restFullApi.domain.ReportParams;
import com.vaiv.ipa.keyword_api.restFullApi.service.PdfService;

import org.apache.ibatis.javassist.tools.web.BadHttpRequest;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

@Service
public class SchedulerService {

    private static Logger logger = LoggerFactory.getLogger(SchedulerService.class);

    List<CongressmanInfo> userList;
    private JSONObject jsonResult;
    private JSONObject httpJson, params;
    private JSONArray output;
    private ObjectMapper objMapper;
    private String url;

    @Autowired
    private SchedulerMapper schedulerMapper;

    @Autowired
    private PdfService pdfService;
    
    @Autowired
    private HttpService httpService;

    @Value("${keywordApi.url}")
    private String KEYWORD_API_URL;

    @Value("${isScheduling.reportData_top_n}")
    private int REPORTDATA_TOP_N;
    
    @Value("${aireport.secondUrl}")
    private String AIREPORT_SECOND_URL;

    /*
    *  이슈키워드 가져와서 DB에 저장
    */
    public JSONObject setIssueKwd(String date) throws Exception{
        logger.info("## setIssueKwd 시작 ##");
        jsonResult = new JSONObject();

        if( !MakeUtil.isNotNullAndEmpty(date) ) throw new BadHttpRequest();

        try {
            // 기존 데이터가 있을경우 삭제
            if( schedulerMapper.getCountIssKwdOfDate(date) > 0 ){
                schedulerMapper.deleteIssueKeyword(date);
                logger.info("기존 "+date+" 데이터 삭제 완료");
            }
            
            // 사용자(의원) 리스트 가져오기
            userList = schedulerMapper.getCongressmanInfo();

            url = KEYWORD_API_URL + "/getIssueKwd";
            params = new JSONObject();
            params.put("gtrYmd", date);
            int userCnt = 1;

            for( CongressmanInfo user : userList ){
                logger.info(userCnt+"번째 userId: "+user.getUserId()+", userNm: "+user.getUserNm()+" 이슈키워드 가져오기");
                params.put("userId", user.getUserId());

                // 데이터 가져오기
                httpJson = httpService.httpServicePOST(url, params.toString());
                output = JSONArray.fromObject(JSONObject.fromObject(httpJson.get("data")).get("output"));
                objMapper = new ObjectMapper();
                List<IssueKeyword> issKwdList = objMapper.readValue(output.toString(), new TypeReference<List<IssueKeyword>>(){});

                // issuekeyword 테이블에 저장
                if( MakeUtil.isNotNullAndEmpty(issKwdList) ){
                    schedulerMapper.insertIssueKeyword(issKwdList);
                    logger.info("userId: "+user.getUserId()+", userNm: "+user.getUserNm()+" 이슈키워드 저장 완료");
                }else{
                    jsonResult.put("error_message", "No data...");
                    jsonResult.put("return_code", "99");
                    jsonResult.put("output", "");
                    logger.info("userId: "+user.getUserId()+", userNm: "+user.getUserNm()+" 이슈키워드 가져오기 오류");
                }
                userCnt++;
            }
            
            jsonResult.put("error_message", "");
            jsonResult.put("return_code", "00");
            jsonResult.put("output", "success");
            logger.info("## setIssueKwd 완료 ##");

        } catch (Exception e) {
            jsonResult.put("error_message", e.toString());
            jsonResult.put("return_code", "99");
            jsonResult.put("output", "");
            logger.error("Error: ", e);
        }
        
        return jsonResult;
    }

    /*
    *  메인 클러스터 정보 가져와서 DB에 저장
    */    
    public JSONObject setClstData(String date) throws Exception{
        logger.info("## setClstData 시작 ##");
        jsonResult = new JSONObject();

        if( !MakeUtil.isNotNullAndEmpty(date) ) throw new BadHttpRequest();

        try {
            // 기존 데이터가 있을경우 삭제
            if( schedulerMapper.getCountClstDataOfDate(date) > 0 ){
                schedulerMapper.deleteClstData(date);
                logger.info("기존 ClstData "+date+" 데이터 삭제 완료");
            }

            // 사용자(의원) 리스트 가져오기
            if( !MakeUtil.isNotNullAndEmpty(userList) )
                userList = schedulerMapper.getCongressmanInfo();

            url = KEYWORD_API_URL + "/getClstData";
            params = new JSONObject();
            params.put("gtrYmd", date);
            int userCnt = 1;

            for( CongressmanInfo user : userList ){
                logger.info(userCnt+"번째 userId: "+user.getUserId()+", userNm: "+user.getUserNm()+" ClstData 가져오기");
                params.put("userId", user.getUserId());

                // 데이터 가져오기
                httpJson = httpService.httpServicePOST(url, params.toString());
                output = JSONArray.fromObject(JSONObject.fromObject(httpJson.get("data")).get("output"));
                objMapper = new ObjectMapper();
                List<ClstData> clstDataList = objMapper.readValue(output.toString(), new TypeReference<List<ClstData>>(){});
                
                // clst_data 테이블에 저장
                if( MakeUtil.isNotNullAndEmpty(clstDataList) ){
                    schedulerMapper.insertClstData(clstDataList);
                    logger.info("userId: "+user.getUserId()+", userNm: "+user.getUserNm()+" ClstData 저장 완료");
                }else{
                    jsonResult.put("error_message", "No data...");
                    jsonResult.put("return_code", "99");
                    jsonResult.put("output", "");
                    logger.error("userId: "+user.getUserId()+", userNm: "+user.getUserNm()+" clst_data 가져오기 오류");
                }
                userCnt++;
            }
            
            jsonResult.put("error_message", "");
            jsonResult.put("return_code", "00");
            jsonResult.put("output", "success");
            logger.info("## setClstData 완료 ##");

        } catch (Exception e) {
            jsonResult.put("error_message", e.toString());
            jsonResult.put("return_code", "99");
            jsonResult.put("output", "");
            logger.error("Error: ", e);
        }
        logger.info(jsonResult.toString());
        return jsonResult;
    }


    /*
    *  클러스터 상세정보 가져와서 DB에 저장
    */        
    public JSONObject setClstDocs(String date) throws Exception{
        logger.info("## setClstDocs 시작 ##");
        jsonResult = new JSONObject();

        if( !MakeUtil.isNotNullAndEmpty(date) ) throw new BadHttpRequest();

        try {
            // 기존 데이터가 있을경우 삭제
            if( schedulerMapper.getCountClstDocsOfDate(date) > 0 ){
                schedulerMapper.deleteClstDocs(date);
                logger.info("기존 ClstDocs "+date+" 데이터 삭제 완료");
            }

            // 사용자(의원) 리스트 가져오기
            if( !MakeUtil.isNotNullAndEmpty(userList) )
                userList = schedulerMapper.getCongressmanInfo();

            url = KEYWORD_API_URL + "/getClstDocs";
            params = new JSONObject();
            params.put("gtrYmd", date);
            int userCnt = 1;

            for( CongressmanInfo user : userList ){
                logger.info(userCnt+"번째 userId: "+user.getUserId()+", userNm: "+user.getUserNm()+" ClstDocs 가져오기");
                params.put("userId", user.getUserId());

                // 데이터 가져오기
                httpJson = httpService.httpServicePOST(url, params.toString());
                output = JSONArray.fromObject(JSONObject.fromObject(httpJson.get("data")).get("output"));
                objMapper = new ObjectMapper();
                List<ClstDocs> clstDocsList = objMapper.readValue(output.toString(), new TypeReference<List<ClstDocs>>(){});

                // clst_docs 테이블에 저장
                if( MakeUtil.isNotNullAndEmpty(clstDocsList) ){
                    schedulerMapper.insertClstDocs(clstDocsList);
                    logger.info("userId: "+user.getUserId()+", userNm: "+user.getUserNm()+" ClstDocs 저장 완료");
                }else{
                    jsonResult.put("error_message", "No data...");
                    jsonResult.put("return_code", "99");
                    jsonResult.put("output", "");
                    logger.info("userId: "+user.getUserId()+", userNm: "+user.getUserNm()+" ClstDocs 가져오기 오류");
                }
            }
            
            jsonResult.put("error_message", "");
            jsonResult.put("return_code", "00");
            jsonResult.put("output", "success");
            logger.info("## setClstDocs 완료 ##");

        } catch (Exception e) {
            jsonResult.put("error_message", e.toString());
            jsonResult.put("return_code", "99");
            jsonResult.put("output", "");
            logger.error("Error: ", e);
        }
        logger.info(jsonResult.toString());
        return jsonResult;
    }


    /*
    *  클러스터 기본정보 가져와서 DB에 저장
    */    
    public JSONObject setClstMstr(String date) throws Exception{
        logger.info("## setClstMstr 시작 ##");
        jsonResult = new JSONObject();

        if( !MakeUtil.isNotNullAndEmpty(date) ) throw new BadHttpRequest();

        try {
            // 기존 데이터가 있을경우 삭제
            if( schedulerMapper.getCountClstMstrOfDate(date) > 0 ){
                schedulerMapper.deleteClstMstr(date);
                logger.info("기존 ClstMstr "+date+" 데이터 삭제 완료");
            }

            // 사용자(의원) 리스트 가져오기
            if( !MakeUtil.isNotNullAndEmpty(userList) )
                userList = schedulerMapper.getCongressmanInfo();

            url = KEYWORD_API_URL + "/getClstMstr";
            params = new JSONObject();
            params.put("gtrYmd", date);
            int userCnt = 1;

            for( CongressmanInfo user : userList ){
                logger.info(userCnt+"번째 userId: "+user.getUserId()+", userNm: "+user.getUserNm()+" ClstMstr 가져오기");
                params.put("userId", user.getUserId());

                // 데이터 가져오기
                httpJson = httpService.httpServicePOST(url, params.toString());
                output = JSONArray.fromObject(JSONObject.fromObject(httpJson.get("data")).get("output"));
                objMapper = new ObjectMapper();
                List<ClstMstr> clstMstrList = objMapper.readValue(output.toString(), new TypeReference<List<ClstMstr>>(){});

                // clst_mstr 테이블에 저장
                if( MakeUtil.isNotNullAndEmpty(clstMstrList) ){
                    schedulerMapper.insertClstMstr(clstMstrList);
                    logger.info("userId: "+user.getUserId()+", userNm: "+user.getUserNm()+" ClstMstr 저장 완료");
                }else{
                    jsonResult.put("error_message", "No data...");
                    jsonResult.put("return_code", "99");
                    jsonResult.put("output", "");
                    logger.info("userId: "+user.getUserId()+", userNm: "+user.getUserNm()+" ClstMstr 가져오기 오류");
                }
                userCnt++;
            }
            
            jsonResult.put("error_message", "");
            jsonResult.put("return_code", "00");
            jsonResult.put("output", "success");
            logger.info("## setClstMstr 완료 ##");

        } catch (Exception e) {
            jsonResult.put("error_message", e.toString());
            jsonResult.put("return_code", "99");
            jsonResult.put("output", "");
            logger.error("Error: ", e);
        }
        logger.info(jsonResult.toString());
        return jsonResult;
    }

    /*
    *  userId 리포트 데이터 DB에 저장
    */
    public JSONObject setReportDataOfUserId(String date, String userId) throws Exception{
        logger.info("## setReportDataOfUserId date: "+date+", userId: "+userId+" 시작 ##");
        String yesterday = MakeUtil.addDate(date, "yyyyMMdd", "day", -1);
        jsonResult = new JSONObject();
        IssueKeyword issueKeyword = null;
        KeywordReportData keywordReportData = null;
        long startTime, endTime, processingTime;

        if( !MakeUtil.isNotNullAndEmpty(date) || !MakeUtil.isNotNullAndEmpty(userId) ) throw new BadHttpRequest();

        try {
            long beforeTime = System.currentTimeMillis();

            // keyword_report 저장할 데이터
            keywordReportData = new KeywordReportData();
            keywordReportData.setGtrYmd(yesterday);
            keywordReportData.setUserId(userId);

            // 상위 10개 가져오기
            issueKeyword = new IssueKeyword();
            issueKeyword.setGtrYmd(date);
            issueKeyword.setUserId(userId);
            issueKeyword.setTopN(10);

            List<IssueKeyword> issKwdList = schedulerMapper.getIssueKwdOfUserId(issueKeyword);
            
            for( IssueKeyword ik : issKwdList ){
                logger.info("userId: "+userId+", issKwd: "+ik.getIssKwd()+", subKwd: "+ik.getSubKwd()+", incKwd: "+ik.getIncKwd()+", issKwdDisp: "+ik.getIssKwdDisp());
                startTime = System.currentTimeMillis();
                keywordReportData.setIssKwd(ik.getIssKwd());
                
                getReportData(keywordReportData, "tsb1", yesterday, ik, null);
                getReportData(keywordReportData, "asb1", yesterday, ik, null);
                getReportData(keywordReportData, "stb3", yesterday, ik, null);
                getReportData(keywordReportData, "tsl1", yesterday, ik, null);
                getReportData(keywordReportData, "tsl2", yesterday, ik, null);
                getReportData(keywordReportData, "dob1", yesterday, ik, null);
                
                endTime = System.currentTimeMillis();
                processingTime = (endTime - startTime) / 1000;
                keywordReportData.setProcessingTime(""+processingTime);
                logger.info("total processingTime: "+processingTime);

                // keyword_report 에 저장
                saveKeywordReportData(keywordReportData);
            }

            long afterTime = System.currentTimeMillis();
            logger.info("시간체크 종료!!!!!! "+afterTime);
            logger.info("처리 시간(m): "+ (afterTime-beforeTime)/1000);

            jsonResult.put("total_processing_time", (afterTime-beforeTime)/1000);
            jsonResult.put("error_message", "");
            jsonResult.put("return_code", "00");
            jsonResult.put("output", "success");
            logger.info("### setReportDataOfUserId 처리완료 ###");

        } catch (Exception e) {
            jsonResult.put("error_message", e.toString());
            jsonResult.put("return_code", "99");
            jsonResult.put("output", "");
            logger.error("Error: ", e);
        }

        logger.info(jsonResult.toString());
        return jsonResult;
    }

    /*
    *  rank별 리포트 데이터 저장
    */
    public JSONObject setReportDataOfRank(String date, int rank) throws Exception{
        logger.info("## setReportDataOfRank date: "+date+", rank: "+rank+" 시작 ##");
        String today = MakeUtil.today("yyyyMMdd");
        String yesterday = MakeUtil.addDate(today, "yyyyMMdd", "day", -1);
        jsonResult = new JSONObject();
        IssueKeyword issueKeyword = null;
        KeywordReportData keywordReportData = null;
        long startTime, endTime, processingTime;

        if( !MakeUtil.isNotNullAndEmpty(date) || !MakeUtil.isNotNullAndEmpty(rank) || rank < 1 ) throw new BadHttpRequest();

        try {
            long beforeTime = System.currentTimeMillis();

            // keyword_report 저장할 데이터
            keywordReportData = new KeywordReportData();
            keywordReportData.setGtrYmd(yesterday);

            // 사용자(의원) 리스트 가져오기
            userList = schedulerMapper.getCongressmanInfo();
            int userCnt = 1;

            for( CongressmanInfo user : userList ){
                logger.info(userCnt+"번째 userId: "+user.getUserId()+", userNm: "+user.getUserNm());
                keywordReportData.setUserId(user.getUserId());
                keywordReportData.setUserNm(user.getUserNm());

                // 상위 topN 가져오기
                issueKeyword = new IssueKeyword();
                issueKeyword.setGtrYmd(today);
                issueKeyword.setUserId(user.getUserId());
                issueKeyword.setTopN(rank);

                List<IssueKeyword> issKwdList = schedulerMapper.getIssueKwdOfUserId(issueKeyword);

                if( MakeUtil.isNotNullAndEmpty(issKwdList.get(rank-1)) ){
                    IssueKeyword ik = issKwdList.get(rank-1);
                    logger.info("issKwd: "+ik.getIssKwd()+", subKwd: "+ik.getSubKwd()+", incKwd: "+ik.getIncKwd()+", issKwdDisp: "+ik.getIssKwdDisp());
                    startTime = System.currentTimeMillis();
                    keywordReportData.setIssKwd(ik.getIssKwd());
                    
                    getReportData(keywordReportData, "tsb1", yesterday, ik, null);
                    getReportData(keywordReportData, "asb1", yesterday, ik, null);
                    getReportData(keywordReportData, "stb3", yesterday, ik, null);
                    getReportData(keywordReportData, "tsl1", yesterday, ik, null);
                    getReportData(keywordReportData, "tsl2", yesterday, ik, null);
                    getReportData(keywordReportData, "dob1", yesterday, ik, null);
                    
                    endTime = System.currentTimeMillis();
                    processingTime = (endTime - startTime) / 1000;
                    keywordReportData.setProcessingTime(""+processingTime);
                    logger.info("total processingTime: "+processingTime);
    
                    // keyword_report 에 저장
                    saveKeywordReportData(keywordReportData);

                }else{
                    logger.info("userId: "+user.getUserId()+" "+rank+"번째 NoData...");
                }
                
                userCnt++;
    
                long afterTime = System.currentTimeMillis();
                logger.info("시간체크 종료!!!!!! "+afterTime);
                logger.info("처리 시간(m): "+ (afterTime-beforeTime)/1000);
    
                jsonResult.put("total_processing_time", (afterTime-beforeTime)/1000);                
                jsonResult.put("error_message", "");
                jsonResult.put("return_code", "00");
                jsonResult.put("output", "success");
                logger.info("### setReportDataOfRank 처리완료 ###");
            }

        } catch (Exception e) {
            jsonResult.put("error_message", e.toString());
            jsonResult.put("return_code", "99");
            jsonResult.put("output", "");
            logger.error("Error: ", e);
        }

        return jsonResult;
    }

    /*
    *  type별 Aireport Data 
    *  DB에 저장
    */
    public void setReportDateOfType(String type, String numberType) {
        try {
            new Thread(new Runnable(){

                @Override
                public void run() {
                    try {
                        logger.info("## setReportDateOfType "+type+", "+numberType+" ##");
                        String today = MakeUtil.today("yyyyMMdd");
                        String yesterday = MakeUtil.addDate(today, "yyyyMMdd", "day", -1);
                        IssueKeyword issueKeyword;
                        KeywordReportData keywordReportData;
                        long beforeTime = System.currentTimeMillis();

                        // 일주일 전 데이터 삭제
                        if( "tsb1".equals(type) && "odd".equals(numberType) ){
                            String deleteDate = MakeUtil.addDate(today, "yyyyMMdd", "day", -6);
                            schedulerMapper.deleteKeywordReport(deleteDate);
                            logger.info("## deleteKeywordReport "+deleteDate+" 삭제 ##");
                        }

                        // keyword_report 저장할 데이터
                        keywordReportData = new KeywordReportData();
                        keywordReportData.setGtrYmd(yesterday);

                        // 사용자(의원) 리스트 가져오기
                        userList = schedulerMapper.getCongressmanInfo();
                        int userCnt = 1;

                        for( CongressmanInfo user : userList ){
                            logger.info(userCnt+"번째 userId: "+user.getUserId()+", userNm: "+user.getUserNm());
                            keywordReportData.setUserId(user.getUserId());
                            keywordReportData.setUserNm(user.getUserNm());

                            // 상위 topN 가져오기
                            issueKeyword = new IssueKeyword();
                            issueKeyword.setGtrYmd(today);
                            issueKeyword.setUserId(user.getUserId());
                            
                            if( "9700341".equals(user.getUserId()) || "ED3728".equals(user.getUserId()) || "DA0577".equals(user.getUserId())){
                                // 보건복지부 // 박주민 의원 // 박병석 국회의장
                                issueKeyword.setExtrType(null); // 모든 키워드
                                issueKeyword.setTopN(null);

                            }else{
                                // issueKeyword.setExtrType("T"); // 대표발의
                                issueKeyword.setExtrType("I"); // 이슈키워드 
                                issueKeyword.setTopN(REPORTDATA_TOP_N);
                            }
                            
                            List<IssueKeyword> issKwdList = schedulerMapper.getIssueKwdOfUserId(issueKeyword);
                            int index = 1;
                            
                            for( IssueKeyword ik : issKwdList ){
                                keywordReportData.setIssKwd(ik.getIssKwd());
                                if( "odd".equals(numberType) && (index%2) == 1 ){ // 홀수일경우
                                    logger.info(type+" odd("+userCnt+"-"+index+") - issKwd: "+ik.getIssKwd()+", subKwd: "+ik.getSubKwd()+", incKwd: "+ik.getIncKwd()+", issKwdDisp: "+ik.getIssKwdDisp());
                                    getReportData(keywordReportData, type, yesterday, ik, null);
                
                                    // keyword_report 에 저장
                                    saveKeywordReportData(keywordReportData);

                                }else if( "even".equals(numberType) && (index%2) == 0 ){ // 짝수일때
                                    logger.info(type+" even("+userCnt+"-"+index+") - issKwd: "+ik.getIssKwd()+", subKwd: "+ik.getSubKwd()+", incKwd: "+ik.getIncKwd()+", issKwdDisp: "+ik.getIssKwdDisp());
                                    getReportData(keywordReportData, type, yesterday, ik, AIREPORT_SECOND_URL);
                
                                    // keyword_report 에 저장
                                    saveKeywordReportData(keywordReportData);
                                }
                                index++;
                            }
                            userCnt++;
                        }

                        long afterTime = System.currentTimeMillis();
                        logger.info("#### setReportDateOfType "+type+" 처리완료, 처리 시간: "+ (afterTime-beforeTime)/1000+"초 ####");

                    } catch (Exception e) {
                        logger.error("Error: ", e);
                    }
                }
                
            }).start();

        } catch (Exception e) {
            logger.error("Error: ", e);
        }
    }
    

    /*
    *  리포트 데이터 가져오기
    */
    public KeywordReportData getReportData(KeywordReportData keywordReportData, String type, String date, IssueKeyword issKwd, String aireportSecondUrl) throws Exception{
        JSONObject result = new JSONObject();
        long startTime, endTime, processingTime;
        String endDate = MakeUtil.convertDateFormat(date, "yyyyMMdd", "yyyy-MM-dd");
        String startDate = MakeUtil.addDate(endDate, "yyyy-MM-dd", "momth", -1);

        ReportParams reportParams = new ReportParams();
        reportParams.setTemplateId("report_diy");
        reportParams.setSubKwd(issKwd.getSubKwd());
        reportParams.setIncKwd(issKwd.getIncKwd());
        reportParams.setIssKwdDisp(issKwd.getIssKwdDisp());
        reportParams.setEndDate(endDate);
        reportParams.setStartDate(startDate);
        if( MakeUtil.isNotNullAndEmpty(aireportSecondUrl) )
            reportParams.setUrl(aireportSecondUrl);
        
        startTime = System.currentTimeMillis();

        switch(type){
            case "tsb1": // 언급량 추이 가져오기
                reportParams.setClassName("component_diy_tsb1");
                reportParams.setModuleName("reportlets.component_diy_tsb1");
                result = pdfService.getAiReportData(reportParams);
                keywordReportData.setTsb1Data(result.toString());
                break;
            
            case "asb1": // 연관어 클라우드 가져오기
                reportParams.setClassName("component_diy_asb1");
                reportParams.setModuleName("reportlets.component_diy_asb1");
                result = pdfService.getAiReportData(reportParams);
                keywordReportData.setAsb1Data(result.toString());
                break;

            case "stb3": // 감성분포 및 대표 감성표현 가져오기
                reportParams.setClassName("component_diy_stb3");
                reportParams.setModuleName("reportlets.component_diy_stb3");
                result = pdfService.getAiReportData(reportParams);
                keywordReportData.setStb3Data(result.toString());
                break;
            
            case "tsl1": // 장기트랜드 분석 가져오기
                reportParams.setClassName("component_diy_tsl1");
                reportParams.setModuleName("reportlets.component_diy_tsl1");
                reportParams.setStartDate(MakeUtil.addDate(endDate, "yyyy-MM-dd", "year", -1));
                result = pdfService.getAiReportData(reportParams);
                keywordReportData.setTsl1Data(result.toString());
                break;

            case "tsl2": // 변곡점 분석 가져오기
                reportParams.setClassName("component_diy_tsl2");
                reportParams.setModuleName("reportlets.component_diy_tsl2");
                reportParams.setStartDate(MakeUtil.addDate(endDate, "yyyy-MM-dd", "year", -1));
                result = pdfService.getAiReportData(reportParams);
                keywordReportData.setTsl2Data(result.toString());
                break;

            case "dob1": // 주제어 원문 가져오기
                reportParams.setClassName("component_diy_dob1");
                reportParams.setModuleName("reportlets.component_diy_dob1");
                // reportParams.setStartDate(endDate);
                reportParams.setStartDate(MakeUtil.addDate(endDate, "yyyy-MM-dd", "momth", -6));
                result = pdfService.getAiReportData(reportParams);
                keywordReportData.setDob1Data(result.toString());
                break;
                
            default:
                break;
        }
        endTime = System.currentTimeMillis();
        processingTime = (endTime - startTime) / 1000;
        keywordReportData.setProcessingTime(""+processingTime);
        logger.info("processingTime: "+processingTime);

        return keywordReportData;
    }
    

    // keyword_report 저장
    public void saveKeywordReportData(KeywordReportData keywordReportData){
        try {
            // 기존 데이터가 있으면 update
            if( schedulerMapper.getCountKeywordReportDataOfUserId(keywordReportData) > 0 ){
                logger.info(" !!!!! update - "+keywordReportData.getUserNm()+"("+keywordReportData.getUserId()+") issKwd: "+keywordReportData.getIssKwd()+" !!!!! ");
                schedulerMapper.updateKeywordReportData(keywordReportData);
            // 없으면 insert
            }else{
                logger.info(" !!!!! insert - "+keywordReportData.getUserNm()+"("+keywordReportData.getUserId()+") issKwd: "+keywordReportData.getIssKwd()+" !!!!! ");
                schedulerMapper.insertKeywordReportData(keywordReportData);
            }
            
        } catch (Exception e) {
            logger.error("저장 실패 ㅠㅠ keywordReportData: "+keywordReportData.getUserId()+", "+keywordReportData.getIssKwd(), e);
        }
    }

}
