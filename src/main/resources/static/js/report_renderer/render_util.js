
// 브라우저 검사
if (typeof BrowserChecker !== 'object') {
    var BrowserChecker = {
        check: navigator.userAgent.toLowerCase()
    };

    BrowserChecker = {
          ie: /*@cc_on true || @*/
            false,
            ie6: BrowserChecker.check.indexOf('msie 6') != -1,
            ie7: BrowserChecker.check.indexOf('msie 7') != -1,
            ie8: BrowserChecker.check.indexOf('msie 8') != -1,
            edge: BrowserChecker.check.indexOf('Edge') != -1,
            opera: !! window.opera,
            safari: BrowserChecker.check.indexOf('safari') != -1,
            safari3: BrowserChecker.check.indexOf('applewebkit/5') != -1,
            mac: BrowserChecker.check.indexOf('mac') != -1,
            chrome: BrowserChecker.check.indexOf('chrome') != -1,
            firefox: BrowserChecker.check.indexOf('firefox') != -1
    };
};

// Object.keys가 정의되어 있지 않은 경우 추가
if (!Object.keys) {
    Object.keys = function (obj) {
        var arr = [],
            key;
        for (key in obj) {
            if (obj.hasOwnProperty(key)) {
                arr.push(key);
            }
        }
        return arr;
    };
}

// 폰트 크기가 주어졌을 때 문자열이 가로로 몇 픽셀을 차지하는지 구하는 함수
if (typeof String.prototype.width_in_pixel !== 'function') {
  if(BrowserChecker.ie6 || BrowserChecker.ie7 || BrowserChecker.ie8) {
    String.prototype.width_in_pixel = function(font) {
      var font_size = parseInt(font);
      var p, len=0;
      
      for (var i=0; i<this.length; i++) {
        if (this.charCodeAt(i)<0x7F)
          len+=1;
        else len+=2;
      }

      return len*font_size/2;
    };
  }
  else {
    String.prototype.width_in_pixel = function(font) {
      var f = font || '12px arial';
      var o = $('<div>' + this + '</div>')
          .css({'position': 'absolute', 'float': 'left', 'white-space': 'nowrap', 'visibility': 'hidden', 'font': f})
          .appendTo($('body'));
      var w = o.width();
  
      o.remove();
  
      return w;
    };
  }
}

var RenderUtil = {

  // 단일 색상표
  color_table_simple: [
    "#c85556",
    "#d3892e",
    "#e8c81d",
    "#a3a42f",
    "#83a36c",
    "#3c9047",
    "#43baae",
    "#3684a7",
    "#8091c0",
    "#696298",
    "#b175ac",
    "#942727",
    "#965a25",
    "#a78a00",
    "#6b6d1b",
    "#5a714b",
    "#0c6116",
    "#31877e",
    "#1e5e7c",
    "#48577e",
    "#413c63",
    "#743d6d"
  ],
  // amcharts light 테마 색상표
  color_table_light: [
    "#67b7dc",
    "#fdd400",
    "#84b761",
    "#cc4748",
    "#cd82ad",
    "#2f4074",
    "#448e4d",
    "#b7b83f",
    "#b9783f",
    "#b93e3d",
    "#913167"
  ],

  // amchart default 테마 색상표
  color_table_amchart: [
    "#FF0F00",
    "#FF6600",
    "#FF9E01",
    "#FCD202",
    "#F8FF01",
    "#B0DE09",
    "#04D215",
    "#0D8ECF",
    "#0D52D1",
    "#2A0CD0",
    "#8A0CCF",
    "#CD0D74",
    "#754DEB",
    "#DDDDDD",
    "#999999",
    "#333333",
    "#000000",
    "#57032A",
    "#CA9726",
    "#990000",
    "#4B0C25"  
  ],

  // 연관어용 단일 색상표
  assoc_color_table_simple: [
    ["#000000", "#000000"],
    ["#c85556", "#c85556"],
    ["#d3892e", "#d3892e"],
    ["#e8c81d", "#e8c81d"],
    ["#a3a42f", "#a3a42f"],
    ["#83a36c", "#83a36c"],
    ["#3c9047", "#3c9047"],
    ["#43baae", "#43baae"],
    ["#3684a7", "#3684a7"],
    ["#8091c0", "#8091c0"],
    ["#696298", "#696298"],
    ["#b175ac", "#b175ac"],
    ["#942727", "#942727"],
    ["#965a25", "#965a25"],
    ["#a78a00", "#a78a00"],
    ["#6b6d1b", "#6b6d1b"],
    ["#5a714b", "#5a714b"],
    ["#0c6116", "#0c6116"],
    ["#31877e", "#31877e"],
    ["#1e5e7c", "#1e5e7c"],
    ["#48577e", "#48577e"],
    ["#413c63", "#413c63"],
    ["#743d6d", "#743d6d"]
  ],
  // 연관어용 amcharts light 테마 색상표
  assoc_color_table_light: [
    ["#000000", "#000000"],
    ["#67b7dc", "#67b7dc"],
    ["#fdd400", "#fdd400"],
    ["#84b761", "#84b761"],
    ["#cc4748", "#cc4748"],
    ["#cd82ad", "#cd82ad"],
    ["#2f4074", "#2f4074"],
    ["#448e4d", "#448e4d"],
    ["#b7b83f", "#b7b83f"],
    ["#b9783f", "#b9783f"],
    ["#b93e3d", "#b93e3d"],
    ["#913167", "#913167"]
  ],
  // 연관어용 gradient 효과가 들어간 색상표
  assoc_color_table_gradient: [
    ["#000000", "#000000"],
    ["#c10e00", "#df5649"],
    ["#987600", "#c4ac3b"],
    ["#1f7f41", "#62af82"],
    ["#0e6894", "#5ca3c0"],
    ["#c94c00", "#e08a3e"],
    ["#3e4aa9", "#808bcf"],
    ["#782caa", "#ab74d2"],
    ["#597400", "#99ac50"],
    ["#a0234e", "#c86688"],
    ["#6c6b6b", "#a5a5a5"],
    ["#c83461", "#f55a89"]
  ],

  settingOptionsWithDefaultOptions: function (unit, defaultOptions) {
    var options = $.extend({}, defaultOptions);
    if (unit.options == null || unit.options == "") {
      console.error("unit.options 값이 존재 하지 않습니다 (Default-options 적용)");
    } else {
      Object.keys(unit.options).forEach(function(key) {
        options[key] = unit.options[key];
      })
    }
    unit.options = options;
    return;
  },

  checkChartData: function(unit, chartDataField) {
    if (!unit.data) {
        return false;
    }
    var field = unit.options[chartDataField]
    var chartData = unit.data[field]
      if (!chartData || chartData.length == 0) {
        return false;
    }
    return true;
  },

  call_xlsx_download: function (action_url, data) {
    var $form = $("<form></form>").attr({"method": "POST", "action": action_url});
    for (var k in data) {
      var $input = $("<input></input>").attr({"type": "hidden", "name": k}).val(data[k]);
      $form.append($input);
    }
    $(document.body).append($form);
    $form.submit();
    $form.remove();
  },

  addReportDownloadButton: function (url_prefix, $dom, report_id, with_toc) {
	  if( with_toc == undefined || with_toc == null) with_toc = true;
    var $btn = $("<a></a>").attr({"href": "#"}).addClass("download");
    $dom.append($btn);
    $btn.click(function (e) {
      e.preventDefault();
      RenderUtil.call_xlsx_download(url_prefix + "report2xlsx", {"report_id": report_id, "with_toc": with_toc});
    });
  },

  addUnitsDownloadButton: function (url_prefix, $dom, units, with_toc) {
	  if( with_toc == undefined || with_toc == null) with_toc = false;
    var $btn = $("<a></a>").attr({"href": "#"}).addClass("download");
    $dom.append($btn);
    $btn.click(function (e) {
      e.preventDefault();
      RenderUtil.call_xlsx_download(url_prefix + "units2xlsx", {"units": JSON.stringify(units), "with_toc": with_toc});
    });
  },

  getQueryVariable: function (url, variable) {
    var a = document.createElement("a");
    a.href = url;
    var vars = url.replace(/^\?/, '').split('&');
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split('=');
        if (decodeURIComponent(pair[0]) == variable) {
            return decodeURIComponent(pair[1]);
        }
    }
    return undefined;
  },

  // 네이버 이미지 URL을 외부에서 사용할 수 있도록 보정하기
  fixNaverImage: function (url, width, height) {
	  if( width == undefined || width == null) width = 0;
	  if( height == undefined || height == null) height = 0;
	  
    if (url.indexOf("search.pstatic.net") >= 0) {
        var src = RenderUtil.getQueryVariable(url, "src");
        if (src)
            url = src;
    }
    if (width)
        return "https://search.pstatic.net/common?type=f&size=" + width + "x" + height + "&quality=100&direct=true&src=" + encodeURIComponent(url);
    else return "https://search.pstatic.net/common?src=" + encodeURIComponent(url);
  }
}


/*차트 렌더링*/
var render = function (viewer, jsonData) {
    var report = {};
    report.component = {};
    report.component.rendering_data = jsonData;

    ComponentSettingRenderer.$viewer = viewer;
    ComponentSettingRenderer.viewerRender(report);
//    엑셀 다운로드 버튼
//    RenderUtil.addUnitsDownloadButton($("#xlsx_url_prefix").val(), viewer, report.component.rendering_data, true);
}

/* ********************************************************************************************************************* */
/* ****************************************************** snsData ****************************************************** */
/* ********************************************************************************************************************* */

/*Top10 뉴스*/
var componentAssemblyTop10 = function(userId, gtrYmd){
	console.log("Top10 뉴스 호출");
    var params = {};
	params["userId"] = userId;
	params["gtrYmd"] = gtrYmd;
	params["templateId"] = "report_diy";
	params["className"] = "component_assembly_top10";
	params["moduleName"] = "reportlets.component_assembly_top10";
	
	ajaxToSnsData("/assembly/getSnsData", params, "POST", true, "top10", "Top10 뉴스");
}



/*언급량 추이*/
var componentDiyTsb1 = function(isLoading){
	console.log("언급량 추이 호출");
	if( isLoading )	loadingRenderere("tsb1");
    var params = snsDataParam("lastMonth");
	params["className"] = "component_diy_tsb1";
	params["moduleName"] = "reportlets.component_diy_tsb1";
	
	ajaxToSnsData("/assembly/getSnsData", params, "POST", true, "tsb1", "언급량 추이");
}

/*연관어 클라우드*/
var componentDiyAsb1 = function(isLoading){
	console.log("연관어 클라우드 호출");
	if( isLoading )	loadingRenderere("asb1");
    var params = snsDataParam("lastMonth");
	params["className"] = "component_diy_asb1";
	params["moduleName"] = "reportlets.component_diy_asb1";
	
	ajaxToSnsData("/assembly/getSnsData", params, "POST", true, "asb1", "연관어 클라우드");
}

/*감성 분포 및 대표 감성 표현*/
var componentAssemblyStb3 = function(isLoading){
	console.log("감성 분포 및 대표 감성 표현 호출");
	if( isLoading )	loadingRenderere("stb3");
	var params = snsDataParam("lastMonth");
	params["className"] = "component_diy_stb3";
	params["moduleName"] = "reportlets.component_diy_stb3";

	ajaxToSnsData("/assembly/getSnsData", params, "POST", true, "stb3", "감성 분포 및 대표 감성 표현");	
}

/*장기 시계열추이*/
var componentDiyTsl1 = function(isLoading){
	console.log("장기 시계열추이 호출");
	if( isLoading )	loadingRenderere("tsl1");
	var params = snsDataParam("lastYear");
	params["className"] = "component_diy_tsl1";
	params["moduleName"] = "reportlets.component_diy_tsl1";

	ajaxToSnsData("/assembly/getSnsData", params, "POST", true, "tsl1", "장기 시계열추이");
}

/*변곡점 분석*/
var componentDiyTsl2 = function(isLoading){
	console.log("변곡점 분석 호출");
	if( isLoading )	loadingRenderere("tsl2");
	var params = snsDataParam("lastYear");
	params["className"] = "component_diy_tsl2";
	params["moduleName"] = "reportlets.component_diy_tsl2";

	ajaxToSnsData("/assembly/getSnsData", params, "POST", true, "tsl2", "변곡점 분석");
}

/* 주제어 원문 */
var componentDiyDob1 = function(isLoading){
	console.log("주제어 원문 호출");
	if( isLoading )	loadingRenderere("dob1");
	var params = snsDataParam("lastSixMonth");
	params["className"] = "component_diy_dob1";
	params["moduleName"] = "reportlets.component_diy_dob1";
	// params["startDate"] = fnComnGetDate("yesterday");
	// params["endDate"] = fnComnGetDate("yesterday");
	params["issKwdDisp"] = $("#issKwdDisp").val();

	ajaxToSnsData("/assembly/getSnsData", params, "POST", true, "dob1", "주제어 원문");
}


/* snsData 공통 파라미터*/
var snsDataParam = function(period){
	var dateRange = fnComnGetDate(period);
    var params = {
    	"templateId": "report_diy",
		"issKwd" : $("#issKwd").val(),
		"subKwd" : $("#subKwd").val(),
		"incKwd" : $("#incKwd").val(),
		"userId" : $("#userId").val(),
		"gtrYmd" : $("#gtrYmd").val(),
		"startDate": dateRange.searchStartDate,
		"endDate": dateRange.searchEndDate
    }
    return params;
}

/* ajax */
var ajaxToSnsData = function(url, params, type, async, divId, subject){
	$.ajax({
		url: url,
		data: params,
		type: type,
		async: async,
		success: function(response){
			snsRenderer(response, divId, subject);		 // SNS데이터 렌더링
		},
		error: function(response){
			errorRenderer(divId);
			console.error("["+subject+" Error]");
			console.error(response);
		}
	});
}

/* SNS데이터 렌더링 */
var snsRenderer = function(response, divId, subject){
	console.log(response);
	var $viewer = $("#"+divId).empty();
	var data = response;
	
	if( data.result == "success" ){
		
		if( data.return_code == "00" ){
			console.log(data.output);
		    render($viewer, data.output);
		    console.log(subject+"분석 완료");
		    
			if( divId == "isk1" ){
				var output = data.output;
				var maxData = null;
		        for( var i in output[2].data ){
		        	if( maxData == null || maxData.value < output[2].data[i].value )
		        		maxData = output[2].data[i];
		        }
		        setKeywordData(maxData);
				getSnsData();
			}
		
		}else if( data.return_code == "99" ){
			errorRenderer(divId);
			$viewer.html("<div class='align_center' style='margin-top:100px;'><img src='/images/error.png'></img></div>");
			console.error("["+subject+" Error] \n errorMessage: "+data.error_message);
			
			
		}else{
			errorRenderer(divId);
			$viewer.html("<div class='align_center' style='margin-top:100px;'><img src='/images/error.png'></img></div>");
			console.error("["+subject+" 차트 실패] \n errorMessage: "+data.response);
		}
	}else{
		errorRenderer(divId);
		if( data.return_code == "99" )	console.error("["+subject+" Error] \n errorMessage: "+data.error_message);
		else	console.error("["+subject+" Error ] \n errorMessage: "+data.errorMessage);
	}
}

/* 네이버 데이터 렌더링 */
var naverRenderer = function(response, divId, subject){
	console.log(JSON.parse(response));
	var data = JSON.parse(response).data;
	var reportParams = JSON.parse(response).reportParams;
	
	if( data.result == "success" ){
		var item = data.items[0];
		var html = "<h3>"+reportParams.searchVal+" - 용어 설명("+fnReplaceHtmlTag(item.title)+") </h3>";
		html += item.description + "<a href="+item.link+" target='_blank' style='background-color:#81d665; color: white; padding: 1px; margin: 10px; float: right;'>"+item.link+"</a>"

		
		$("#"+divId).html(html);
		console.log(subject+"분석 완료");
	}else{
		errorRenderer(divId);
		if( data.return_code == "99" )	console.error("["+subject+" Error] \n errorMessage: "+data.error_message);
		else	console.error("["+subject+" Error ] \n errorMessage: "+data.errorMessage);
	}
}

/*에러 렌터링 */
var errorRenderer = function(divId){
	var errHtml = "<div class='align_center' style='margin-top:100px;'><img src='/images/error.png'></img></div>";
	$("#"+divId).html(errHtml);
}

/*로딩바 렌더링*/
var loadingRenderere = function(divId){
	$("#"+divId).empty();
	$("#"+divId).show();
	var html ="<div class='loading'><img src='/images/ajax_loading_image.gif'></img></div><div class='loadingBox'></div>";
	$("#"+divId).html(html);
}



/* ********************************************************************************************************************* */
/* ************************************************** common util ****************************************************** */
/* ********************************************************************************************************************* */

/**
 * POST 방식 페이지 이동
 * @param url
 * @param keyList
 * @param valueList
 * @returns
 */
function fnComnMovePage(url, keyList, valueList){
	var form = $('<form></form>');
    form.prop('action', url);
    form.prop('method', 'POST');
    form.appendTo('body');
    
    for( var i in keyList ){
    	if( fnComnNotNullAndEmpty(keyList[i]) ){
    		form.append('<input type="hidden" name="'+keyList[i]+'" value="' + valueList[i] + '">');
    	}
    }
	form.submit();
}

/**
 * Popup 페이지 이동
 * @param url
 * @param option
 * @param keyList
 * @param valueList
 * @returns
 */
function fnComnMovePopupPage(url, option, keyList, valueList){
	var form = $('<form></form>');
    form.prop('action', url);
    form.prop('method', 'POST');
    form.prop('target', 'movePoupuPage');
    form.appendTo('body');
    
    if( !fnComnNotNullAndEmpty(option) )
		option = "width=1024,height=768, toolbar=no, menubar=no, scrollbars=no, resizable=yes";
    
    for( var i in keyList ){
    	if( fnComnNotNullAndEmpty(keyList[i]) )
    		form.append('<input type="hidden" name="'+keyList[i]+'" value="' + valueList[i] + '">');
    }
    
    
    if( !fnComnNotNullAndEmpty(option) )
    	window.open(url, "movePoupuPage", option);
    else
    	window.open(url, "movePoupuPage");
    	
	form.submit();
}

/**
 * Get방식 페이지 이동
 * @param url
 * @param seq
 * @param option
 */
function fnComnGetMovePage(url, param1, param2){
	
	if( fnComnNotNullAndEmpty(param1) )	url += "?param1="+encodeURIComponent(param1);
	if( fnComnNotNullAndEmpty(param2) )	url += "&param2="+encodeURIComponent(param2);
	
	location.href = url;
}

/**
 * Null 또는 공백 또는 undefined일 아닐 경우 true 반환
 * @param val
 * @returns {Boolean}
 */
function fnComnNotNullAndEmpty(val) {
	if (typeof val == 'undefined')	return false;
	else if (val == null)	return false;
	else if (val == "null")	return false;
	else if ($.trim(val) == "")	return false;
	else if (val.length < 1)	return false;
	else return true;
}

/**
 * Null, 공백, undefined일 경우 separator로 반환
 * @param val
 * @param separator
 * @returns
 */
function fnComnReplaceNull(val, separator){
	var sp = separator != null ? separator : "";
	if (typeof val == 'undefined')	return sp;
	else if (val == null)	return sp;
	else if (val == "null")	return sp;
	else if (val.length < 1)	return sp;
	else return val;
}

/**
 * 파일 다운로드
 * @param url
 * @param fileName
 * @param filePath
 * @param checkDelete
 */
function fnComnFileDownload(url, fileName, filePath, checkDelete){
	var form = $('<form></form>');
    form.prop('action', url);
    form.prop('method', 'POST');
    form.appendTo('body');
	form.append('<input type="hidden" name="fileName" value="' + fileName + '">');
	form.append('<input type="hidden" name="filePath" value="' + filePath + '">');
	form.append('<input type="hidden" name="checkDelete" value="' + checkDelete + '">');
	form.submit();
}


/**
 *  yyyy-MM-dd 포맷으로 반환(separator)
 */
function fnComnGetFormatDate(date, sep){
	var separator = "-";
	
	if( sep != undefined )	separator = sep;
	
	var year = date.getFullYear();             //yyyy
	var month = (1 + date.getMonth());         //M
	month = month >= 10 ? month : '0' + month; // month 두자리로 저장
	var day = date.getDate();                  //d
	day = day >= 10 ? day : '0' + day;         //day 두자리로 저장
	return  year + separator + month + separator + day;
}

/**
 * 날짜 변경
 * @param option
 * @param sep
 * $.datepicker.formatDate 안될때...
 */
function fnComnGetDate(option, sep){
	var nowDate = new Date();
	
	if( option === "today" ){
		return fnComnGetFormatDate(nowDate, sep);
	}else if( option === "yesterday" ){
		nowDate.setDate(nowDate.getDate() - 1);
		return fnComnGetFormatDate(nowDate, sep);
	}
	
	// 하루전부터 시작
	nowDate.setDate(nowDate.getDate() - 1);
	
	var startDate = "";
	var endDate = fnComnGetFormatDate(nowDate, sep);
	
	if( option === "lastWeek" ){
		nowDate.setDate(nowDate.getDate() - 7);
		startDate = fnComnGetFormatDate(nowDate, sep);
		
	}else if( option === "lastTwoWeek" ){
		nowDate.setDate(nowDate.getDate() - 14);
		startDate = fnComnGetFormatDate(nowDate, sep);
		
	}else if( option === "lastThreeWeek" ){
		nowDate.setDate(nowDate.getDate() - 21);
		startDate = fnComnGetFormatDate(nowDate, sep);
		
	}else if( option === "lastMonth" ){
		nowDate.setMonth(nowDate.getMonth() -1 );
		startDate = fnComnGetFormatDate(nowDate, sep);
		
	}else if( option === "lastThreeMonth" ){
		nowDate.setMonth(nowDate.getMonth() -3 );
		startDate = fnComnGetFormatDate(nowDate, sep);

	}else if( option === "lastSixMonth" ){
		nowDate.setMonth(nowDate.getMonth() -6 );
		startDate = fnComnGetFormatDate(nowDate, sep);
		
	}else if( option === "lastYear" ){
		nowDate.setFullYear(nowDate.getFullYear() - 1);
		startDate = fnComnGetFormatDate(nowDate, sep);
		
	}else if( option === "lastTwoYear" ){
		nowDate.setFullYear(nowDate.getFullYear() - 2);
		startDate = fnComnGetFormatDate(nowDate, sep);
		
	}else if( option === "lastThreeYear" ){
		nowDate.setFullYear(nowDate.getFullYear() - 3);
		startDate = fnComnGetFormatDate(nowDate, sep);
	}
	
	var date = {
		"searchStartDate"	: 	startDate,
		"searchEndDate"		:	endDate
	}
	return date;
}



/**
 * 현재 날짜와 비교 후 true/false 반환
 * @param date
 * @returns {Boolean}
 */
function fnComnCompareNowDate(date){
	var result = false;
	if( date != null ){
		var nowDate = new Date();
		var expireDate = new Date(date);
		if( expireDate > nowDate ) result = true;
	}
	return result;
}


/**
 * 에러 메시지창
 */
function fnComnErrorMessage(error){
	alert("서비스가 원활하지 않습니다. 잠시뒤에 이용해주시길 바랍니다.");
	console.log(error);
}

/*숫자만 입력가능*/
function fnComnOnlyNumber(event){
    event = event || window.event;
 
    var keyID = (event.which) ? event.which : event.keyCode;
    
    if ( (keyID >= 48 && keyID <= 57) || (keyID >= 96 && keyID <= 105) || keyID == 8 || keyID == 9 || keyID == 46 || keyID == 37 || keyID == 39 ) {
        return;
    } else {
        return false;
    }
}

/*숫자, 콤마 입력*/
function fnComnOnlyNumberDot(event){
    event = event || window.event;
 
    var keyID = (event.which) ? event.which : event.keyCode;
    // Comma keyID == 188 , Dot keyID == 190, 110
    if ( keyID == 110 || keyID == 190 || (keyID >= 48 && keyID <= 57) || (keyID >= 96 && keyID <= 105) || keyID == 8 || keyID == 9 || keyID == 46 || keyID == 37 || keyID == 39) {
        return;
    } else {
        return false;
    }
}

/*숫자 . , / *  입력*/
function fnComnOnlyNumberCommaDot(event){
    event = event || window.event;
    var keyID = (event.which) ? event.which : event.keyCode;
    // Comma keyID == 188 , Dot keyID == 190
    if ( keyID == 188 || keyID == 190 || keyID == 191 || keyID == 56 || (keyID >= 48 && keyID <= 57) || (keyID >= 96 && keyID <= 105) || keyID == 8 || keyID == 9 || keyID == 46 || keyID == 37 || keyID == 39) {
        return;
    } else {
        return false;
    }
}

/* 숫자, 콤마 제외한 나머지 제거 */
function fnComnRemoveChar(event) {
    event = event || window.event;
     
    var keyID = (event.which) ? event.which : event.keyCode;
     
    if ( keyID == 8 || keyID == 9 || keyID == 46 || keyID == 37 || keyID == 39 ) {
        return;
    } else {
        event.target.value = event.target.value.replace(/[^0-9|^.]/g, "");
    }
}

/**
 * 긴 단어/문장 변경
 * @param text
 * @param separator
 * @param limit
 * @returns
 */
function fnComnLongWordTranslation(text, separator, limit){
	if( !fnComnNotNullAndEmpty(separator) ) separator = "...";
	if( !fnComnNotNullAndEmpty(limit) ) limit = 20;
	
	if( fnComnNotNullAndEmpty(text) && (text.length > limit) ){
		text = text.substring(0,limit) + separator;
	}
	return text
}

/**
 * 3자리 콤마 찍기
 * @param text
 * @returns
 */
var fnComnNumberWithCommas = function(x){
	if( fnComnNotNullAndEmpty(x) ){
		return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");	
	}else{
		return "";
	}	 
}

/**
 * Null을 -1로 변경
 * @param val
 * @returns
 */
function fnComnChangeNullToNum(val){
	if (typeof val == 'undefined')
		return -1;
	else if (val == null)
		return -1;
	else if (val.length < 1)
		return -1;
	
	return val;
}

/**
 * Object sort
 * @param obj
 * @param option
 * @returns
 */
function fnComnSortObj(obj, option){
	if( fnComnNotNullAndEmpty(obj) ){
		// keyword sort asc
		obj.sort(function(a, b){
			if( a.keyword > b.keyword )	return 1;
			if( a.keyword < b.keyword )	return -1;
			return 0;
		});
		
		// keyword_id sort desc
		obj.sort(function(a, b){
			if( fnComnChangeNullToNum(a.keyword_id) < fnComnChangeNullToNum(b.keyword_id) )	return 1;
			if( fnComnChangeNullToNum(a.keyword_id) > fnComnChangeNullToNum(b.keyword_id) )	return -1;
			return 0;
		});
		
		// weight sort desc
		obj.sort(function(a, b){
			if( fnComnChangeNullToNum(a.weight) < fnComnChangeNullToNum(b.weight) )	return 1;
			if( fnComnChangeNullToNum(a.weight) > fnComnChangeNullToNum(b.weight) )	return -1;
			return 0;
		});
		
		if( option == "string" ){
			return fnComnArrValueToString(obj, "keyword", " ,", 5);
		}else{
			return obj;
		}
	}
}


/**
 * 관련기관 및 인문 sort
 * @param personOrgan
 * @param option
 * @returns
 */
function fnComnSortPersonOrgan(personOrgan, option){
	if( fnComnNotNullAndEmpty(personOrgan) ){
		// name sort asc
		personOrgan.sort(function(a, b){
			if( a.name > b.name )	return 1;
			if( a.name < b.name )	return -1;
			return 0;
		});
		
		// type sort desc
		personOrgan.sort(function(a, b){
			if( a.type < b.type )	return 1;
			if( a.type > b.type )	return -1;
			return 0;
		});
		
		if( option == "string" ){
			return fnComnArrValueToString(personOrgan, "name", " ,", 5);
		}else{
			return personOrgan;
		}
	}else{
		return "-";
	}
}

/**
 * 숫자 배열 sort
 * @param personOrgan
 * @param option
 * @returns
 */
function fnComnNumberSort(arr, option){
	if( fnComnNotNullAndEmpty(arr) ){
		if( option == "desc" ){
			arr.sort(function(a,b){
				return b-a;
			});
		}else{
			arr.sort(function(a,b){
				return a-b;
			});			
		}
	}
}

/**
 * 배열의 value를 한줄로 생성
 * @param dataArr
 * @param value
 * @param separator
 * @param count
 * @returns {String}
 */
function fnComnArrValueToString(dataArr, value, separator, count){
	var result = "-";
	if( fnComnNotNullAndEmpty(dataArr) ){
		for(var index in dataArr ){
			if( fnComnNotNullAndEmpty(value) && value === "keyword" && fnComnNotNullAndEmpty(dataArr[index].keyword)){
				if( index == 0 ) result = dataArr[index].keyword;
				else result += separator+"&nbsp;"+dataArr[index].keyword;
				
			}else if( fnComnNotNullAndEmpty(value) && value === "name" && fnComnNotNullAndEmpty(dataArr[index].name)){
				if( index == 0 ) result = dataArr[index].name;
				else result += separator+"&nbsp;"+dataArr[index].name;
				
			}else if( fnComnNotNullAndEmpty(dataArr[index]) && value == null ){
				if( index == 0 ) result = dataArr[index];
				else result += separator+"&nbsp;"+dataArr[index];	
			}
			
			if( fnComnNotNullAndEmpty(count) && index == count ) break;
		}
	}
	
	return result;
}

//한글체크
var fnComnCheckKorean = function(value){
	var check = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;
	if( check.test(value) ){
		return true;
	}else{
		return false;
	}
}


/**
 * 파일 사이즈 표기 변환
 * @param dataArr
 * @param value
 * @param separator
 * @param count
 * @returns {String}
 */
var fnComnConvertSizeExp = function(size, unit){
	var result;
	if( fnComnNotNullAndEmpty(size) ){
		if( jQuery.isNumeric(size) && size > 1000 ){
			result = Math.round(size / 1024);
			if( unit == "MB" && result > 1000 ){
				result = Math.round(result / 1024);
				result = result+" MB";
			}else{
				result = fnComnNumberWithCommas(result)+" KB";
			}
		}else{
			return size;
		}
	}else{
		return "";
	}
	return result;
}

/**
 * HTML 태그 삭제 
 */
var fnReplaceHtmlTag = function(val){
	if( fnComnNotNullAndEmpty(val) ){
		val = val.replace(/(<([^>]+)>)/ig, '');
	}
	return val;
}

