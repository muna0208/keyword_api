package com.vaiv.ipa.keyword_api.restFullApi.domain;

import java.util.List;

import org.apache.ibatis.type.Alias;

import lombok.Data;
import net.sf.json.JSONArray;

@Data
@Alias("reportParams")
public class ReportParams {
	
	private String className;
	private String moduleName;
	private String templateId;
	
	private String keyword;
	private List<String> synonyms;
	private List<String> filterInc;
	private List<String> filterExc;
	private List<String> dateRange;
	private String startDate;
	private String endDate;
	private List<String> sourceList;
	private String period;
	private String perSource;
	
	private String userId;
	private String userNm;
	private String gtrYmd;
	
	private String searchVal;
	private String searchGb;
	
    private String url;
	private String issKwd;
	private String subKwd;
	private String incKwd;
	private String issKwdDisp;

    private JSONArray agenda;
	private JSONArray pressRelease;
	private JSONArray processingStatus;
}
