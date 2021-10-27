package com.vaiv.ipa.keyword_api.restFullApi.service;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import com.vaiv.ipa.keyword_api.common.service.HttpService;
import com.vaiv.ipa.keyword_api.common.utils.MakeUtil;
import com.vaiv.ipa.keyword_api.restFullApi.domain.ReportParams;

import org.apache.ibatis.javassist.tools.web.BadHttpRequest;
import org.json.simple.parser.ParseException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;


@Service
public class PdfService {
    private static Logger logger = LoggerFactory.getLogger(PdfService.class);

    @Autowired
    private HttpService httpService;
    
    @Value("${pdf.make-pdf-script}")
    private String MAKE_PDF_SCRIPT;

    @Value("${pdf.pdf-dir}")
    private String PDF_DIR;

    @Value("${aireport.url}")
    private String AIREPORT_URL;

    @Value("${aireport.methond}")
    private String AIREPORT_METHOD;

	@Value("${aireport.params.filterExc}")
	private String REPORT_PARAMS_FILTEREXC;

	@Value("${aireport.params.sourceList}")
	private String REPORT_PARAMS_SOURCELIST;

	@Value("${aireport.params.period}")
	private String REPORT_PARAMS_PERIOD;

	@Value("${aireport.params.perSource}")
	private String REPORT_PARAMS_PERSOURCE;

	@Value("${aireport.params.categorySet}")
	private String REPORT_PARAMS_CATEGORY_SET;

	@Value("${aireport.params.groups}")
	private String REPORT_PARAMS_GROUPS;

    public Resource downloadUrlPDF(ReportParams reportParams) throws BadHttpRequest, MalformedURLException, FileNotFoundException{
        logger.info("  ##  downloadUrlPDF  ## ");
		logger.info(reportParams.toString());
        Resource resource = null;
        if( MakeUtil.isNotNullAndEmpty(reportParams.getUrl()) ){
            //pdf 생성
            String url = reportParams.getUrl();
            String params = "";
            String fileName = "";
            String fName = url.substring(url.indexOf("//")+2).replace("www.", "");

            if( fName.indexOf(".") > -1) fileName = "AIReport_"+fName.substring(0, fName.indexOf("."))+".pdf";
            else                        fileName = "AIReport_"+fName+".pdf";


            if( MakeUtil.isNotNullAndEmpty(reportParams.getSubKwd()) 
                && MakeUtil.isNotNullAndEmpty(reportParams.getGtrYmd()) ){

                params = "?issKwdDisp="+reportParams.getIssKwdDisp().replace(" ", "%20")
							+ "&issKwd="+reportParams.getIssKwd().replace(" ", "%20")
							+ "&subKwd="+reportParams.getSubKwd().replace(" ", "%20")
							+ "&incKwd="+reportParams.getIncKwd().replace(" ", "%20")
							+ "&userId="+reportParams.getUserId()
							+ "&gtrYmd="+reportParams.getGtrYmd()
							+ "&userNm="+reportParams.getUserNm().replace(" ", "%20");

                fileName = "AIReport_"+reportParams.getGtrYmd()+"_"+reportParams.getUserId()+".pdf";
            }
            
            
            String filePath = PDF_DIR+"/output/"+fileName;

            logger.info(fileName+" 생성 준비...");

            // shell script 실행
			logger.info("MAKE_PDF_SCRIPT : "+MAKE_PDF_SCRIPT);
			logger.info("url : "+url);
			logger.info("params : "+params);
			logger.info("PDF_DIR : "+PDF_DIR);
			logger.info("fileName : "+fileName);
            executeShell(new String[]{ MAKE_PDF_SCRIPT, url, params, PDF_DIR, fileName });

            logger.info(fileName+" 생성 완료!!!");

            // pdf 전송
            logger.info(fileName+" 전송 준비...");
            File file = new File(filePath);
            
            logger.info("file path..."+filePath);

            if( file.exists() ){
                resource = new UrlResource(file.toURI());
                logger.info(fileName+"을 전송 완료.");

            }else{
                logger.error(fileName+"이 존재하지 않아 전송을 못하였습니다.");
                throw new FileNotFoundException();
            }

        }else{
            logger.error("BadHttpRequest");
            throw new BadHttpRequest();
        }

        return resource;
    }

    // pdf 파일 삭제
    public void removePDF(ReportParams reportParams){
        Path filePath = Paths.get(PDF_DIR+"/output/AIReport_"+reportParams.getGtrYmd()+"("+reportParams.getUserId()+").pdf");
        logger.info(filePath + " 파일 삭제 준비");
        try {
            if (Files.exists(filePath)) {
                Files.delete(filePath);
                logger.info(filePath + " 파일 삭제 완료");
            }
        } catch (Exception e) {
            logger.error(filePath + " 파일 삭제 실패");
            e.printStackTrace();
        }
    }

    // shell script 실행
    public void executeShell(String[] command) {
        ProcessBuilder pb = new ProcessBuilder(command);

        pb.inheritIO();
        Process process;

		try {
            process = pb.start();
            process.waitFor();
		} catch (Exception e) {
			e.printStackTrace();
		}
    }


	// PDF 생성용 보고서를 만들기 위해 생성데이터
	public JSONObject getSnsData(ReportParams reportParams) throws Exception{
		JSONObject result = null;
		
		// keywordAPI 호출
		if( "component_diy_tsb1".equals(reportParams.getClassName())
				|| "component_diy_asb1".equals(reportParams.getClassName())
				|| "component_diy_stb3".equals(reportParams.getClassName())
				|| "component_diy_tsl1".equals(reportParams.getClassName())
				|| "component_diy_tsl2".equals(reportParams.getClassName())
				|| "component_diy_dob1".equals(reportParams.getClassName()) ) {
			
			result = getKeywordReportData(reportParams);
		
			// aiReport 호출
			if( "error".equals(result.get("result")) ) {
				logger.info(" AAA getAiReportData: "+reportParams.getClassName()+" AAA" );
				result = getAiReportData(reportParams);
			}else {
				logger.info(" KKK getKeywordReportData: "+reportParams.getClassName()+" KKK" );
			}
			
		// aiReport 호출
		}else {
			result = getAiReportData(reportParams);
		}
		
		return result;
	}

	/**
	 * keyword_api 호출
	 * @param reportParams
	 * @return
	 * JSONObject
	 */
	private JSONObject getKeywordReportData(ReportParams reportParams) {
		String url = "http://localhost:2020/assembly/getReportData";
		JSONObject result = new JSONObject();
		JSONObject params = new JSONObject();
		try {
			params.put("gtrYmd", MakeUtil.addDate(reportParams.getGtrYmd(), "yyyyMMdd", "day", -1));
			params.put("userId", reportParams.getUserId());
			params.put("issKwd", reportParams.getIssKwd());
			params.put("className", reportParams.getClassName());
			
			JSONObject httpResult = httpService.httpPOST(url, params.toString().replace("\\", ""));
			
			// data가 있을경우
			if( "success".equals(httpResult.get("result")) && !"".equals(httpResult.get("data")) ) {
				result = (JSONObject) httpResult.get("data");
				logger.info(" !!! getKeywordReportData "+reportParams.getClassName()+" !!!" );

			}else{
				result.put("result", "error");
			}
			
		} catch (Exception e) {
			logger.error("getKeywordReportData("+reportParams.getClassName()+") Error", e);
		}
		return result;
	}

    public JSONObject getAiReportData(ReportParams reportParams){
		String url = "";
		if( MakeUtil.isNotNullAndEmpty(reportParams.getUrl()) )	
			url = reportParams.getUrl()+AIREPORT_METHOD;
		else 
			url = AIREPORT_URL+AIREPORT_METHOD;

		JSONObject result = new JSONObject();
		JSONObject params = null;
		
		try {
			params = new JSONObject();
			params.put("module_name", reportParams.getModuleName());
			params.put("class_name", reportParams.getClassName());
			params.put("template_id", reportParams.getTemplateId());
			
			JSONObject topic = new JSONObject();
			String subKwd = reportParams.getSubKwd();
			
			// 연관어 클라우드, 감성 분포 및 대표 감성 표현 OR조건
			if( "component_diy_asb1".equals(reportParams.getClassName()) 
					|| "component_diy_stb3".equals(reportParams.getClassName()) ) {
				subKwd = subKwd != null ? subKwd.replace(" ", "||") : "";
				subKwd = subKwd.replace("&middot;", "||").replace(",", "||");

			// 나머지는 AND조건
			}else{
				subKwd = subKwd != null ? subKwd.replace(" ", "&&") : "";
				subKwd = subKwd.replace("&middot;", "&&").replace(",", "&&");
			}
			
			topic.put("keyword", subKwd);
			topic.put("synonyms", "");
			topic.put("filter_exc", Arrays.asList(REPORT_PARAMS_FILTEREXC.split(",")));

			// 인용문은 OR조건(incKwd가 빈값)
			if( MakeUtil.isNotNullAndEmpty(reportParams.getIncKwd()) )
				topic.put("filter_inc", Arrays.asList(reportParams.getIncKwd().split(",")));
			else topic.put("filter_inc", "");
			
			JSONObject input = new JSONObject();
			List<String> dateRange = new ArrayList<String>();
			dateRange.add(reportParams.getStartDate());
			dateRange.add(reportParams.getEndDate());
			input.put("topic", topic);
			input.put("date_range", dateRange);
			input.put("source_list", Arrays.asList(REPORT_PARAMS_SOURCELIST.split(",")));
			
			ArrayList<String> news = new ArrayList<String>(Arrays.asList(REPORT_PARAMS_SOURCELIST.split(",")));
			news.remove("blog");
			news.remove("community");
			news.remove("twitter");

			/****** 이슈키워드, top10뉴스 ******/
			if( "component_assembly_isk1".equals(reportParams.getClassName()) 
				|| "component_assembly_top10".equals(reportParams.getClassName())) {
				input = new JSONObject();
				input.put("userId", reportParams.getUserId());
				input.put("gtrYmd", reportParams.getGtrYmd());
				
			/****** 언급량 추이 ******/
			}else if( "component_diy_tsb1".equals(reportParams.getClassName()) ) {
				input.put("period", REPORT_PARAMS_PERIOD);
				input.put("per_source", REPORT_PARAMS_PERSOURCE);
				
			/****** 연관어 클라우드 ******/
			}else if( "component_diy_asb1".equals(reportParams.getClassName()) ) {
				JSONObject groups = new JSONObject();
				JSONArray jsonArr = new JSONArray();
				List<String> groupList = Arrays.asList(REPORT_PARAMS_GROUPS.split("-"));
				
				for( String group : groupList ) {
					jsonArr.add(JSONObject.fromObject(group));
				}
				groups.put("category_set", REPORT_PARAMS_CATEGORY_SET);
				groups.put("groups", jsonArr);
				input.put("groups", groups);
				input.put("source_list", news);
				

			/****** 감성 분포 및 대표 감성 표현 ******/
			}else if( "component_diy_stb3".equals(reportParams.getClassName()) ) {
				input.put("source_list", news);

			/****** 장기 시계열추이 ******/
			}else if( "component_diy_tsl1".equals(reportParams.getClassName()) ) {
				input.put("per_source", REPORT_PARAMS_PERSOURCE);
				
			/****** 변곡점 분석 ******/
			}else if( "component_diy_tsl2".equals(reportParams.getClassName()) ) {
				input.put("source_list", news);
				input.put("period", "week");
			
			/****** 주제어 원문 ******/
			}else if( "component_diy_dob1".equals(reportParams.getClassName()) ) {
				input = new JSONObject();
				input.put("topic", topic);
				ArrayList<String> sourceList = new ArrayList<String>(Arrays.asList(REPORT_PARAMS_SOURCELIST.split(",")));
				sourceList.remove("twitter");
				input.put("source_list", sourceList);
				List<Object> titles = new ArrayList<Object>();
				JSONObject title = new JSONObject();
				title.put("level", "subsection");
				title.put("num", "");
				title.put("title", reportParams.getSubKwd()+" - 원문 분석");
				titles.add(title);
				input.put("titles", titles);
				List<Object> sentences = new ArrayList<Object>();
				sentences.add("다음은 "+reportParams.getSubKwd()+"에 나타난 원문입니다.");
				input.put("sentences", sentences);
				input.put("from_date", reportParams.getStartDate());
				input.put("to_date", reportParams.getEndDate());
				input.put("assoc_list", "");
				input.put("top_n", 10);
				input.put("display_n", 2);
			}
			
			params.put("input", input);
			logger.info(reportParams.getClassName()+" ==> "+topic.toString());
            result = httpService.httpPOST(url, params.toString().replace("\\", ""));
			
			if( "99".equals(result.get("return_code")) ) {
				result.put("result", "error");
			}else {
				result.put("result", "success");
			}
			
		} catch (Exception e) {
			result.put("result", "error");
			result.put("errorMessage", e.toString());	
			logger.error("getAireportData Error", e);
		}
		return result;	
    }



}
