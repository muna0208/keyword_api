package com.vaiv.ipa.keyword_api.scheduler;

import com.vaiv.ipa.keyword_api.common.utils.MakeUtil;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import net.sf.json.JSONObject;

@Component
public class Scheduler {

    @Value("${isScheduling.issKwd}")
    private Boolean IS_SCHEDULING_ISS_KWD;

    @Value("${isScheduling.reportData}")
    private Boolean IS_SCHEDULING_REPORT_DATA;

    private static Logger logger = LoggerFactory.getLogger(Scheduler.class);
    private int INTERVAL =3600000;   // 60분

    @Autowired
    private SchedulerService schedulerService;


    // 이슈키워드 가져와서 DB에 저장
    @Scheduled(cron = "0 0 7 * * *") // 매일 7시 실행
    public void setIssueKwd(){
        if( IS_SCHEDULING_ISS_KWD ){
            try {
                JSONObject result = schedulerService.setIssueKwd(MakeUtil.today("yyyyMMdd"));
                if( "99".equals(""+result.get("return_code")) ){
                    logger.error(""+result.get("error_message"));
    
                    Thread.sleep(INTERVAL); // 60분
                    logger.info("setIssueKwd 다시 시도...");
                    setIssueKwd();
                }
            } catch (Exception e) {
                logger.error("Error: ", e);
            }
        }
    }
    
/*  뉴스분석 사용 안함
    // 메인 클러스터 정보 가져와서 DB에 저장
    @Scheduled(cron = "0 5 7 * * *") // 매일 7시 5분 실행
    public void setClstData(){
        if( IS_SCHEDULING_ISS_KWD ){
            try {
                JSONObject result = schedulerService.setClstData(MakeUtil.today("yyyyMMdd"));
                if( "99".equals(""+result.get("return_code")) ){
                    logger.error(""+result.get("error_message"));
    
                    Thread.sleep(INTERVAL); // 60분
                    logger.info("setClstData 다시 시도...");
                    setClstData();
                }
            } catch (Exception e) {
                logger.error("Error: ", e);
            }
        }        
    }

    // 클러스터 상세정보 가져와서 DB에 저장
    @Scheduled(cron = "0 10 7 * * *") // 매일 7시 10분 실행
    public void setClstDocs(){
        if( IS_SCHEDULING_ISS_KWD ){
            try {
                JSONObject result = schedulerService.setClstDocs(MakeUtil.today("yyyyMMdd"));
                if( "99".equals(""+result.get("return_code")) ){
                    logger.error(""+result.get("error_message"));
    
                    Thread.sleep(INTERVAL); // 60분
                    logger.info("setClstDocs 다시 시도...");
                    setClstDocs();
                }
            } catch (Exception e) {
                logger.error("Error: ", e);
            }
        }        
    }

    // 클러스터 기본정보 가져와서 DB에 저장
    @Scheduled(cron = "0 15 7 * * *") // 매일 7시 15분 실행
    public void setClstMstr(){
        if( IS_SCHEDULING_ISS_KWD ){
            try {
                JSONObject result = schedulerService.setClstMstr(MakeUtil.today("yyyyMMdd"));
                if( "99".equals(""+result.get("return_code")) ){
                    logger.error(""+result.get("error_message"));
    
                    Thread.sleep(INTERVAL); // 60분
                    logger.info("setClstMstr 다시 시도...");
                    setClstMstr();
                }
            } catch (Exception e) {
                logger.error("Error: ", e);
            }
        }
    }
*/
    
    @Scheduled(cron = "0 20 7 * * *") // 매일 7시 20분 실행
    public void setComponentDiyOdd(){
        if( IS_SCHEDULING_REPORT_DATA ){
            try {
                schedulerService.setReportDateOfType("tsb1", "odd"); // 언급량 추이
                Thread.sleep(60000); // 1분
                schedulerService.setReportDateOfType("asb1", "odd"); // 연관어 클라우드
                Thread.sleep(60000); // 1분
                schedulerService.setReportDateOfType("stb3", "odd"); // 감성분포 및 감성분포 추이
                Thread.sleep(60000); // 1분
                schedulerService.setReportDateOfType("tsl1", "odd"); // 장기 트렌드 분석
                Thread.sleep(60000); // 1분
                schedulerService.setReportDateOfType("tsl2", "odd"); // 변곡점 분석
                Thread.sleep(60000); // 1분
                schedulerService.setReportDateOfType("dob1", "odd"); // 주제어 원문

            } catch (InterruptedException e) {
                logger.error("setComponentDiyOdd", e);
            }
        } 
    }

    @Scheduled(cron = "0 25 7 * * *") // 매일 7시 25분 실행
    public void setComponentDiyEven(){
        if( IS_SCHEDULING_REPORT_DATA ){
            try {
                schedulerService.setReportDateOfType("tsb1", "even"); // 언급량 추이
                Thread.sleep(60000); // 1분
                schedulerService.setReportDateOfType("asb1", "even"); // 연관어 클라우드
                Thread.sleep(60000); // 1분
                schedulerService.setReportDateOfType("stb3", "even"); // 감성분포 및 감성분포 추이
                Thread.sleep(60000); // 1분
                schedulerService.setReportDateOfType("tsl1", "even"); // 장기 트렌드 분석
                Thread.sleep(60000); // 1분
                schedulerService.setReportDateOfType("tsl2", "even"); // 변곡점 분석
                Thread.sleep(60000); // 1분
                schedulerService.setReportDateOfType("dob1", "even"); // 주제어 원문

            } catch (InterruptedException e) {
                logger.error("setComponentDiyEven", e);
            }            
        } 
    }

}
