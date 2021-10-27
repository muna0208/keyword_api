package com.vaiv.ipa.keyword_api.common.utils;

import java.io.ByteArrayOutputStream;
import java.io.PrintStream;
import java.lang.reflect.Field;
import java.net.URLEncoder;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.Comparator;
import java.util.Date;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Random;
import java.util.UUID;

import javax.servlet.http.HttpServletRequest;

import org.joda.time.DateTime;
import org.joda.time.Days;
import org.joda.time.format.DateTimeFormat;
import org.joda.time.format.DateTimeFormatter;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.jdbc.support.JdbcUtils;
import org.thymeleaf.util.StringUtils;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;


public class MakeUtil {
	
	private static Logger logger = LoggerFactory.getLogger(MakeUtil.class);

	/**
	 * 객체를 GET방식의 파라미터로 변환
	 * @param vo
	 * @return
	 * @throws Exception
	 */
	public static String objToGetParam(Object obj) throws Exception{
		if( isNotNullAndEmpty(obj) ){
			StringBuffer result = new StringBuffer();
			String temp = "";
			Field field = null;
			int size = obj.getClass().getDeclaredFields().length;
			
			for (int i = 0; i < size; i++) {
				field = obj.getClass().getDeclaredFields()[i];
				field.setAccessible(true);
				String value = URLEncoder.encode(""+field.get(obj),"UTF-8");
				
				if( i < size-1 ){
					temp = field.getName() + "=" + value + "&";
				}else{
					temp = field.getName() + "=" + value;	
				}
				result.append(temp);
			}
			return result.toString();
		}
		return "";
	}
	
	/**
	 * Json의 value를 HTML TagFilter 변환
	 * @param json
	 * @return
	 * @throws Exception
	 */
	public static JSONObject parsingToHtmlTagFilterOfJson(JSONObject json) throws Exception{
		JSONObject resultJson = new JSONObject();
		Iterator<?> keys = json.keys();

		while( keys.hasNext() ){
			String key = (String) keys.next();
			if( json.get(key) instanceof String ){
				String value = (String) json.get(key);
				value = parsingToHtmlTagFilter(value); // HTMLTagFilter 변환
				resultJson.put(key, value);
			}else{
				resultJson.put(key, json.get(key));
			}
		}	
		return resultJson;
	}
	
	/**
	 * HTMLTagFilter 변환
	 * @param value
	 * @return
	 */
	public static String parsingToHtmlTagFilter(String value) throws RuntimeException{
		String result = "";

		if( isNotNullAndEmpty(value) ){
			result = value.replaceAll("&lt;", "<").replaceAll("&gt;", ">").replaceAll("&amp;", "&")
					      .replaceAll("&quot;", "\"").replaceAll("&apos;", "\'");
		}	
		return result;
	}
	
	/**
	 * Json "" TagFilter 변환
	 * @param value
	 * @return
	 * @throws RuntimeException
	 */
	public static String parsingToJsonTagFilter(String value) throws RuntimeException{
		String result = "";

		if( isNotNullAndEmpty(value) ){
			result = value.replaceAll("&quot;", "\"").replaceAll("amp;", "&");
		}	
		return result;
	}
	
	/**
	 * Null일경우 공백 반환
	 * @param str
	 * @param defaultValue
	 * @return
	 */
	public static Object nvl(Object str){ return nvl(str, ""); }
	public static Object nvl(Object str, String defaultValue){
		Object val = "" ;
		
		if(str == null){
			val = defaultValue ;
		} else if("".equals(str.toString().trim())) {
			val = defaultValue ;
		} else if("null".equals(str.toString())) {
			val = defaultValue ;
		} else if("[null]".equals(str.toString())) {
			val = defaultValue ;
		} else if("undefined".equals(str.toString())) {
			val = defaultValue ;
		} else if("[]".equals(str.toString())) {
			val = defaultValue ;
		} else if("{}".equals(str.toString())) {
			val = defaultValue ;
		} else if("None".equals(str.toString())) {
			val = "None" ;
		}else{
			return str;
		}
		return val;
	}
	
	/**
	 * Null 또는 공백 체크
	 * @param str
	 * @return
	 */
	public static boolean isNotNullAndEmpty(Object str){
		if(str == null){
			return false;
		} else if("''".equals(str.toString().trim())) {
			return false;
		} else if("".equals(str.toString().trim())) {
			return false;
		} else if("null".equals(str.toString())) {
			return false;
		} else if("[null]".equals(str.toString())) {
			return false;
		} else if("undefined".equals(str.toString())) {
			return false;
		} else if("[]".equals(str.toString())) {
			return false;
		} else if("{}".equals(str.toString())) {
			return false;
		}else{
			return true;			
		}
	}
	
	/**
	 * List 체크
	 * @param list
	 * @return
	 */
	public static boolean isNotNullAndEmpty(@SuppressWarnings("rawtypes") List list){
		if(list == null){
			return false;
		} else if(list.size() < 1) {
			return false;
		}else{
			return true;
		}
	}
	
	
	/**
	 * 숫자일 경우 true 반환
	 * @param value
	 * @return
	 */
	public static boolean isNumberCheck(String value){
		try {
			Double.parseDouble(value);
			return true;
		} catch (NumberFormatException e) {
			return false;
		}
	}
	
	/**
	 * UUID 추출
	 * @return
	 */
	public static String getUUID(){
		String result = "";
		UUID uuid = UUID.randomUUID();
		result = uuid+"";
		return result;
	}
	
	/**
	 * 클라이언트 IP 추출
	 * @param request
	 * @return
	 */
	public static String getClientIp(HttpServletRequest request){
		if( isNotNullAndEmpty(request) ){
			String clientIp = request.getHeader("X-FORWARDED-FOR");
			
			if( clientIp == null || clientIp.length() == 0 )	
				clientIp = request.getHeader("Proxy-Client-IP");
			
			if( clientIp == null || clientIp.length() == 0 )
				clientIp = request.getHeader("WL-Proxy-Client-IP");
			
			if( clientIp == null || clientIp.length() == 0 )
				clientIp = request.getRemoteAddr();
			
			return clientIp;	
		}else{
			return null;
		}
	}
	
	/**
	 * Excepttion Logger 찍기
	 * @param e
	 * @param name
	 * @return
	 */
	public static String printErrorLogger(Throwable e, String name){
		String log = makeStackTrace(e);
		logger.error("Error "+name+" : "+log);
		return log;
	}
	
	/**
	 * Exception 로그 String으로 변환
	 * @param t
	 * @return
	 */
	public static String makeStackTrace(Throwable t){
		if( t == null )	return "";
		
		try {
			ByteArrayOutputStream bout = new ByteArrayOutputStream();
			t.printStackTrace(new PrintStream(bout));
			bout.flush();
			
			return new String(bout.toByteArray());
			
		} catch (Exception e) {
			return "";
		}
	}
	
	
	/**
	 * JSONArray json print
	 * @param jsonArr
	 * @param log
	 * @throws Exception
	 */
	@SuppressWarnings("static-access")
	public static void printForJsonArr(JSONArray jsonArr, boolean log) throws Exception{
		JSONObject json = null;
		Gson gson = new GsonBuilder().setPrettyPrinting().create();
		for (int i = 0; i < jsonArr.size(); i++) {
			json = new JSONObject();
			json = new JSONObject().fromObject(jsonArr.get(i));
			
			if( log ) logger.info(i+" "+gson.toJson(json));
			else System.out.println(i+" "+gson.toJson(json));
		}
	}
	
	/**
	 * JsonArray key값으로 sorting
	 * @param jsonArr
	 * @param key
	 * @param priority
	 * @return
	 * @throws Exception
	 */
	@SuppressWarnings("unchecked")
	public static JSONArray sortJsonArr(JSONArray jsonArr, final String key, final String priority) throws RuntimeException{
		// sorting
		Comparator<JSONObject> comparatorJson = new Comparator<JSONObject>(){
			public int compare(final JSONObject o1, final JSONObject o2 ){
				
				String c1 = ""+MakeUtil.nvl(o1.get(key));
				String c2 = ""+MakeUtil.nvl(o2.get(key));
				
				if( "desc".equals(priority) ){
					return c2.compareTo(c1);
				}else{
					return c1.compareTo(c2);	
				}
			}
		};
		
		Collections.sort(jsonArr, comparatorJson);
		return jsonArr;
	}
	
	/**
	 * 페이징 처리
	 * @param searchData
	 * @return
	 */
//	public static SearchParam searchPaging(SearchParam searchData){
//		int strPageIndex = searchData.getPageIndex();
//		int strPageRow = searchData.getPageRow();
//		int nPageIndex = 0;
//		int nPageRow = 10;
//		
//		if( strPageIndex > 0){
//			nPageIndex = strPageIndex-1;
//		}
//		if( strPageRow > 0 ){
//			nPageRow = strPageRow;
//		}
//		searchData.setStart((nPageIndex * nPageRow) + 1);
//		searchData.setEnd((nPageIndex * nPageRow) + nPageRow);
//		
//		return searchData;
//	}
	
	
	/**
	 * Object의 value값이 Null일경우 공백 반환
	 * @param obj
	 * @return
	 */
	public static Object nvlObj(Object obj){
		if( MakeUtil.isNotNullAndEmpty(obj) && obj instanceof JSONObject ){
			obj = nvlJson((JSONObject)obj);
			
		}else if( MakeUtil.isNotNullAndEmpty(obj) && obj instanceof JSONArray ){
			obj = nvlJsonArray((JSONArray)obj);
			
		}else{
			logger.info("nvlObj instanceof "+obj.getClass().getName());
		}
		return obj;
	}
	
	
	/**
	 * JSONObject의 value값이 Null일경우 공백 반환
	 * @param jsonObj
	 * @return
	 */
	@SuppressWarnings("static-access")
	public static JSONObject nvlJson(JSONObject jsonObj){
		JSONObject resultJson = new JSONObject();
		if( MakeUtil.isNotNullAndEmpty(jsonObj) && jsonObj instanceof JSONObject ){
			try {
				String key;
				Object value;
				String sValue;
				Iterator<?> it = jsonObj.keys();
				
				while( it.hasNext() ){
					key = (String)it.next();
					value = jsonObj.get(key);
					sValue = StringUtils.trim(jsonObj.get(key));

					if( MakeUtil.isNotNullAndEmpty(value) ) {

						if( value instanceof JSONArray ){
							resultJson.put(key, nvlJsonArray((JSONArray)value));

						}else if( value instanceof JSONObject ){
							resultJson.put(key, nvlJson((JSONObject)value));
							
						}else if( "[".equals(sValue.substring(0,1)) 
								&& "]".equals(sValue.substring(sValue.length()-1,sValue.length()))
								&& sValue.contains("{") 
								&& sValue.contains("}") ) {
							resultJson.put(key, nvlJsonArray(new JSONArray().fromObject(value)));
						
						}else if( "{".equals(sValue.substring(0,1))  
								&& "}".equals(sValue.substring(sValue.length()-1,sValue.length()))) {
							resultJson.put(key, nvlJson(new JSONObject().fromObject(value)));
							
						}else{
							resultJson.put(key, nvl(value));
						}
						
					}else {
//						resultJson.put(key, nvl(value));
					}
				}
			} catch (Exception e) {
				printErrorLogger(e, "nvlJson");
			}
		}
		return resultJson;
}
	
	/**
	 * JSONArray의 value값이 Null일경우 공백 반환
	 * @param jsonArr
	 * @return
	 */
	@SuppressWarnings("static-access")
	public static JSONArray nvlJsonArray(JSONArray jsonArr){
		JSONArray moveJsonArr = new JSONArray();
		if( MakeUtil.isNotNullAndEmpty(jsonArr) && jsonArr instanceof JSONArray ){
			JSONObject json = null;
			
			try {
				Object value; 
				for (int i = 0; i < jsonArr.size(); i++) {
					value = jsonArr.get(i);
//					System.out.println(value);
					if( MakeUtil.isNotNullAndEmpty(value) && value instanceof JSONArray ){
						moveJsonArr.add(nvlJsonArray((JSONArray)value));
						
					}else if( MakeUtil.isNotNullAndEmpty(value) && value instanceof JSONObject ){
						json = new JSONObject().fromObject(value);
						moveJsonArr.add(nvlJson(json));
						
					}else{
						moveJsonArr.add(value);
					}
					
				}
			} catch (Exception e) {
				printErrorLogger(e, "nvlJsonArray");
			}
		}
		return moveJsonArr;
}
	
	/**
	 * JSONArray에서 value값 중복 체크
	 * @param jsonArr
	 * @param key
	 * @param value
	 * @return
	 */
	public static boolean chkDuplicationKey(JSONArray jsonArr, String key, String value) throws Exception {
		if( isNotNullAndEmpty(key) && isNotNullAndEmpty(value) ){
			JSONObject json = new JSONObject();
			for (int i = 0; i < jsonArr.size(); i++) {
				json = JSONObject.fromObject(jsonArr.get(i));
				if( value.equals(json.get(key)+"") )
					return true;
			}	
		}
		return false;
	}
	
	/**
	 * 구분자(separator)에 맞게 String을 List로 담기
	 * separator default는 ,
	 * @param param
	 * @return
	 */
	public static List<String> parsingStringToList(String param) throws Exception {
		return parsingStringToList(param, ",");
	}
	/**
	 * 구분자(separator)에 맞게 String을 List로 담기
	 * @param param
	 * @param separator
	 * @return
	 */
	public static List<String> parsingStringToList(String param, String separator) throws Exception {
		List<String> list = new ArrayList<String>();
		if( isNotNullAndEmpty(param) ){
			if( param.contains(separator) ){
				list = Arrays.asList(param.split(separator));
			}else{
				list.add(param);
			}
		}
		return list;
	}
	
	/**
	 * 날짜 차이 비교
	 * @param begin
	 * @param end
	 * @return
	 * @throws Exception
	 */
	public static long diffOfDate(String begin, String end) throws Exception {
		return diffOfDate(begin, end, "date");
	}
	
	/**
	 * 날짜 / 시간 / 분 / 초 차이 비교
	 * @param begin
	 * @param end
	 * @param option : date, time, minute, second
	 * @return
	 * @throws Exception
	 */
	public static long diffOfDate(String begin, String end, String option) throws Exception {
		SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		long diffDays = 0;
		
		Date beginDate = formatter.parse(begin);
		Date endDate = formatter.parse(end);

		long diff = endDate.getTime() - beginDate.getTime();
		
		/* long diffDays = diff / (시 * 분 * 초 * milisecond); */
		if( "time".equals(option) ) {
			diffDays = diff / (60 * 60 * 1000);
		}else if( "minute".equals(option) ) {
			diffDays = diff / (60 * 1000);
		}else if( "second".equals(option) ) {
			diffDays = diff / (1000);	
		}else{
			diffDays = diff / (24 * 60 * 60 * 1000);
		}

		return diffDays;
	}
	
	/**
	 * 시간 : 분 : 초 차이값 봔환
	 * @param begin
	 * @param end
	 * @return
	 * @throws Exception
	 */
	public static String diffOfDateAll(String begin, String end) throws Exception{
		SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		String diffResult = "";
		long diffTime = 0;
		long diffMinute = 0;
		long diffSecond = 0;
		
		Date beginDate = formatter.parse(begin);
		Date endDate = formatter.parse(end);

		long diff = endDate.getTime() - beginDate.getTime();
		
		/* long diffDays = diff / (시 * 분 * 초 * milisecond); */
		diffTime = diff / (60 * 60 * 1000); 				// 시간차이
		diffMinute = diff / (60 * 1000) - (60*diffTime);	// 분 차이
		diffSecond = diff / (1000) - (60*diffMinute);		// 초 차이
		
		diffResult += (diffTime>9?diffTime:"0"+diffTime) + ":";
		diffResult += (diffMinute>9 ? diffMinute : "0"+diffMinute) + ":";
		diffResult += diffSecond>9 ? diffSecond : "0"+diffSecond;
		
		return diffResult;
	}
	
	/**
	 * List<Map<String, Object>>를 JSONArray로 변환
	 * @param list
	 * @return
	 * @throws Exception
	 */
	@SuppressWarnings("static-access")
	public static JSONArray parsingListToJsonarray(List<Map<String, Object>> list) throws Exception {
		JSONArray jsonArr = new JSONArray();
		
		for (Map<String, Object> map : list) {
			if( MakeUtil.isNotNullAndEmpty(map) )	jsonArr.add(new JSONObject().fromObject(map));
		}
		
		return jsonArr;
	}
	
	/**
	 * 랜덤 문자열 생성
	 * @param size
	 * @return
	 * @throws Exception
	 */
	public static String getRandomString(int size) throws Exception {
		StringBuffer result = new StringBuffer();
		Random rnd = new Random();
		for (int i = 0; i < size; i++) {
			int rIndex = rnd.nextInt(3);
			switch( rIndex ) {
			case 0: // a~z
				result.append((char) ((int)(rnd.nextInt(26)) + 97) );
				break;
			case 1: // A~Z
				result.append((char) ((int)(rnd.nextInt(26)) + 65) );
				break;
			case 2: // 0~9
				result.append((rnd.nextInt(10)));
				break;
			}
		}
		
		return result.toString();
	}
	
	
	/**
	 * JSONObject key 값을 변환(snake_case를 camelCase로 변환) 
	 * @param json
	 * @return
	 */
	@SuppressWarnings("static-access")
	public static JSONObject convertJsonSnakeCaseKeyToCamelCaseKey(JSONObject json) {
		JSONObject camelCaseJson = new JSONObject();
		String key;
		Object value;
		
		Iterator<?> it = json.keys();
		while( it.hasNext() ) {
			key = (String) it.next();
			value = json.get(key);
			
			if( isJSONArray(value) ) {
				value = convertJsonArraySnakeCaseKeyToCamelCaseKey(new JSONArray().fromObject(value));
			
			}else if( isJSONObject(value) ) {
				value = convertJsonSnakeCaseKeyToCamelCaseKey(new JSONObject().fromObject(value));
			}
			
			if( key.contains("_") ) {
				camelCaseJson.put(JdbcUtils.convertUnderscoreNameToPropertyName(key), value.toString());
			}else {
				camelCaseJson.put(key, value.toString());
			}
		}
		
		return camelCaseJson;
	}
	
	/**
	 * JSONArray key 값을 변환(snake_case를 camelCase로 변환) 
	 * @param jsonArr
	 * @return
	 */
	@SuppressWarnings("static-access")
	public static JSONArray convertJsonArraySnakeCaseKeyToCamelCaseKey(JSONArray jsonArr) {
		JSONArray camelCaseJsonArr = new JSONArray();
		for (int i = 0; i < jsonArr.size(); i++) {

			try {
				if( isNumeric(jsonArr.get(i)) ) {
					camelCaseJsonArr.add(jsonArr.get(i));
				}else {
					JSONObject json = convertJsonSnakeCaseKeyToCamelCaseKey(new JSONObject().fromObject(jsonArr.get(i)));
					camelCaseJsonArr.add(json);	
				}
				
			} catch (Exception e) {
				camelCaseJsonArr.add(jsonArr.get(i));
			}
		}
		return camelCaseJsonArr;
	}
	
	
	/**
	 * JSONObject 체크
	 * @param value
	 * @return
	 */
	@SuppressWarnings("static-access")
	public static boolean isJSONObject(Object value) {
		try {
			
			if( value instanceof JSONArray )	return true;
			
			if( isNumeric(value) )	return false;
			
			if( value instanceof Boolean )	return false;
			
			new JSONObject().fromObject(value);
			return true;
		} catch (Exception e) {
			return false;
		}
	}
	
	/**
	 * JSONArray 체크
	 * @param value
	 * @return
	 */
	@SuppressWarnings("static-access")
	public static boolean isJSONArray(Object value) {
		try {
			if( value instanceof JSONArray )	return true;
			
			if( isNumeric(value) )	return false;
			
			if( value instanceof Boolean )	return false;
			
			new JSONArray().fromObject(value);
			return true;
		} catch (Exception e) {
			return false;
		}
	}
	
	/**
	 * 숫자 체크
	 * @param value
	 * @return
	 */
	public static boolean isNumeric(Object value) {
		try {
			Double.parseDouble(value+"");
			return true;
		} catch (Exception e) {
			return false;
		}
	}
	
	/**
	 * @param text
	 * @return
	 * @throws Exception
	 */
	public static String replaceNone(String text) throws Exception{
		String result = "";
		result = text.replaceAll("None", "'None'");
		return result;
	}


	/**
	 * 오늘 날짜 구하기
	 * @param dateFormat
	 * @return
	 * @throws Exception
	 */
	public static String today(String dateFormat){
		String today = "";
		try{
			DateTime dt = new DateTime();
			today = dt.toString(dateFormat);
		} catch (Exception e){
			e.printStackTrace();
		}
		return today;
	}

	/**
	 * 날짜 형식 변경 ( yyyyMMdd => yyyy-MM-dd )
	 * @param date
	 * @param beforFormat
	 * @param afterFormat
	 * @return
	 * @throws Exception
	 */
	public static String convertDateFormat(String date, String beforFormat, String afterFormat){
		String newDate = "";
		try {
			SimpleDateFormat beforeFm = new SimpleDateFormat(beforFormat);
			SimpleDateFormat afterFm = new SimpleDateFormat(afterFormat);

			Date formatDate = beforeFm.parse(date);
			newDate = afterFm.format(formatDate);

		} catch (ParseException e) {
			e.printStackTrace();
		}
		return newDate;
	}

	/**
	 * 원하는 날짜에 원하는 일 수 더한 날짜 구하기
	 * @param dateFormat: output 원하는 데이터 포맷 (ex. yyyy-MM-dd)
	 * @param searchDate: 더하려는 날짜 (dataFormat 과 같아야 함)
	 * @param option: year, month, day
	 * @param i: 더하려는 일수
	 * @return
	 * @throws Exception
	 */
	public static String addDate(String searchDate, String dateFormat, String option, int i) {
		DateTimeFormatter dtf = DateTimeFormat.forPattern(dateFormat);
		DateTime jodatime = null;

		try{
			if( "year".equals(option) ){
				jodatime = dtf.parseDateTime(searchDate).plusYears(i);

			}else if( "momth".equals(option) ){
				jodatime = dtf.parseDateTime(searchDate).plusMonths(i);

			}else{
				jodatime = dtf.parseDateTime(searchDate).plusDays(i);
			}
			
		} catch (Exception e) {
			e.printStackTrace();
		}
		   
		return dtf.print(jodatime);
	}

	/**
	 * 날짜 차이 구하기 (startDate, endDate 의 차이 구함 - dateFormat 형식이여야 함)
	 * @param dateFormat: output 원하는 데이터 포맷 (ex. yyyy-MM-dd)
	 * @param startDate
	 * @param endDate
	 * @return
	 * @throws Exception
	 */
   public static long diffDate(String dateFormat, String startDate, String endDate) {
		DateTimeFormatter dtf = DateTimeFormat.forPattern(dateFormat);
		DateTime startTime = dtf.parseDateTime(startDate);
		DateTime endTime = dtf.parseDateTime(endDate); 
   
		Days checkDays = Days.daysBetween(startTime, endTime);
		long checkCnt = checkDays.getDays(); 
   
		return checkCnt;
	}


	
	
}
