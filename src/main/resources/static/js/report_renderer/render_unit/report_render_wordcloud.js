/*
options
- words: 차트 생성에 사용될 태그 데이터 키 정보 (기본값 "words)

data
- words: 차트 생성에 사용될 태그 데이터 정보 (배열)
     각 배열은 {"text": 값, "weight: 값} 형태의 JSON Object로 구성 (키와 벨류 고정)ㅋ
     각 배열은 weight를 기준으로 정렬되어 있어야함
etc
- 최상위 데이터를 제외한 다른 태그들은 차트 생성할때 마다 위치가 다름

EXAMPLE_INPUT
{
  "visible": true,
  "processing": false,
  "type": "wordcloudchart",
  "id": "test.trendchart_chart",
  "options": {
    "words" : "words"
    "title": "전주"
  },
  "data" : {
    "words": [
      {"text": "행자부장관", "weight": 7.972878384814342}, {"text": "도종환문체부장관", "weight": 6.712952436252491},
      {"text": "교육부총리", "weight": 5.559084516400618}, {"text": "문재인", "weight": 4.44142124369227},
      {"text": "정유라", "weight": 4.268310777336768}, {"text": "산산조각난", "weight": 3.957814090739745},
      {"text": "환호", "weight": 3.7901488078231216}, {"text": "슬픔", "weight": 3.5518008681098436},
      {"text": "헌시", "weight": 3.391468338752038}, {"text": "순간 발자욱", "weight": 3.2415141616595022},
      {"text": "아픔", "weight": 3.071083571889682}, {"text": "운명", "weight": 3.0584272885016732},
      {"text": "눈물", "weight": 2.891320167512722}, {"text": "도종환의원", "weight": 2.810123054043475},
      {"text": "부재", "weight": 2.7365864398983994}, {"text": "천해성", "weight": 2.698928410061699},
      {"text": "조명균", "weight": 2.698928410061699}, {"text": "김부겸행자부", "weight": 2.672918481444462},
      {"text": "분노촛농", "weight": 2.542537825612016}, {"text": "꿈", "weight": 2.4576952117460915},
      {"text": "함성", "weight": 2.41932983905456}, {"text": "송곳", "weight": 2.3910168023511305},
      {"text": "좌절", "weight": 2.3715339442993137}, {"text": "야만 세월", "weight": 2.348327086332324},
      {"text": "권양숙여사", "weight": 2.297625486085535}, {"text": "역사", "weight": 2.2536871309463375},
      {"text": "김상곤", "weight": 2.1944139999302266}, {"text": "교육감", "weight": 2.172965677606496},
      {"text": "인사", "weight": 2.156059847546394}, {"text": "노무현전대통령", "weight": 2.1441610505205295}
    ]
  }
}
*/
var _word_cloud = {

  example : [
    {
      name: "예제1",
      description: "가중치에 의한 색상",
      sample: {
        "visible": true,
        "processing": false,
        "type": "wordcloudchart",
        "id": "test.trendchart_chart",
        "options": {
          "words" : "words",
          "title": "이슈 키워드",
          "xlsx": true
        },
        "data" : {
          "words": [
            {"text": "행자부장관", "weight": 7.972878384814342}, {"text": "도종환문체부장관", "weight": 6.712952436252491},
            {"text": "교육부총리", "weight": 5.559084516400618}, {"text": "문재인", "weight": 4.44142124369227},
            {"text": "정유라", "weight": 4.268310777336768}, {"text": "산산조각난", "weight": 3.957814090739745},
            {"text": "환호", "weight": 3.7901488078231216}, {"text": "슬픔", "weight": 3.5518008681098436},
            {"text": "헌시", "weight": 3.391468338752038}, {"text": "순간 발자욱", "weight": 3.2415141616595022},
            {"text": "아픔", "weight": 3.071083571889682}, {"text": "운명", "weight": 3.0584272885016732},
            {"text": "눈물", "weight": 2.891320167512722}, {"text": "도종환의원", "weight": 2.810123054043475},
            {"text": "부재", "weight": 2.7365864398983994}, {"text": "천해성", "weight": 2.698928410061699},
            {"text": "조명균", "weight": 2.698928410061699}, {"text": "김부겸행자부", "weight": 2.672918481444462},
            {"text": "분노촛농", "weight": 2.542537825612016}, {"text": "꿈", "weight": 2.4576952117460915},
            {"text": "함성", "weight": 2.41932983905456}, {"text": "송곳", "weight": 2.3910168023511305},
            {"text": "좌절", "weight": 2.3715339442993137}, {"text": "야만 세월", "weight": 2.348327086332324},
            {"text": "권양숙여사", "weight": 2.297625486085535}, {"text": "역사", "weight": 2.2536871309463375},
            {"text": "김상곤", "weight": 2.1944139999302266}, {"text": "교육감", "weight": 2.172965677606496},
            {"text": "인사", "weight": 2.156059847546394}, {"text": "노무현전대통령", "weight": 2.1441610505205295}
          ]
        }
      }
    },
    {
      name: "예제2",
      description: "색상 별도 지정",
      sample: {
        "visible": true,
        "processing": false,
        "type": "wordcloudchart",
        "id": "test.trendchart_chart",
        "options": {
          "words" : "words",
          "title": "이슈 키워드",
          "color_field": "color",
          "xlsx": true
        },
        "data" : {
          "words": [
            {"text": "행자부장관", "weight": 7.972878384814342, "color": RenderUtil.color_table_simple[0]}, 
            {"text": "도종환문체부장관", "weight": 6.712952436252491, "color": RenderUtil.color_table_simple[1]},
            {"text": "교육부총리", "weight": 5.559084516400618, "color": RenderUtil.color_table_simple[2]}, 
            {"text": "문재인", "weight": 4.44142124369227, "color": RenderUtil.color_table_simple[3]},
            {"text": "정유라", "weight": 4.268310777336768, "color": RenderUtil.color_table_simple[4]}, 
            {"text": "산산조각난", "weight": 3.957814090739745, "color": RenderUtil.color_table_simple[5]},
            {"text": "환호", "weight": 3.7901488078231216, "color": RenderUtil.color_table_simple[6]}, 
            {"text": "슬픔", "weight": 3.5518008681098436, "color": RenderUtil.color_table_simple[7]},
            {"text": "헌시", "weight": 3.391468338752038, "color": RenderUtil.color_table_simple[8]}, 
            {"text": "순간 발자욱", "weight": 3.2415141616595022, "color": RenderUtil.color_table_simple[9]},
            {"text": "아픔", "weight": 3.071083571889682, "color": RenderUtil.color_table_simple[0]}, 
            {"text": "운명", "weight": 3.0584272885016732, "color": RenderUtil.color_table_simple[1]},
            {"text": "눈물", "weight": 2.891320167512722, "color": RenderUtil.color_table_simple[2]}, 
            {"text": "도종환의원", "weight": 2.810123054043475, "color": RenderUtil.color_table_simple[3]},
            {"text": "부재", "weight": 2.7365864398983994, "color": RenderUtil.color_table_simple[4]}, 
            {"text": "천해성", "weight": 2.698928410061699, "color": RenderUtil.color_table_simple[5]},
            {"text": "조명균", "weight": 2.698928410061699, "color": RenderUtil.color_table_simple[6]}, 
            {"text": "김부겸행자부", "weight": 2.672918481444462, "color": RenderUtil.color_table_simple[7]},
            {"text": "분노촛농", "weight": 2.542537825612016, "color": RenderUtil.color_table_simple[8]}, 
            {"text": "꿈", "weight": 2.4576952117460915, "color": RenderUtil.color_table_simple[9]},
            {"text": "함성", "weight": 2.41932983905456, "color": RenderUtil.color_table_simple[0]}, 
            {"text": "송곳", "weight": 2.3910168023511305, "color": RenderUtil.color_table_simple[1]},
            {"text": "좌절", "weight": 2.3715339442993137, "color": RenderUtil.color_table_simple[2]}, 
            {"text": "야만 세월", "weight": 2.348327086332324, "color": RenderUtil.color_table_simple[3]},
            {"text": "권양숙여사", "weight": 2.297625486085535, "color": RenderUtil.color_table_simple[4]}, 
            {"text": "역사", "weight": 2.2536871309463375, "color": RenderUtil.color_table_simple[5]},
            {"text": "김상곤", "weight": 2.1944139999302266, "color": RenderUtil.color_table_simple[6]}, 
            {"text": "교육감", "weight": 2.172965677606496, "color": RenderUtil.color_table_simple[7]},
            {"text": "인사", "weight": 2.156059847546394, "color": RenderUtil.color_table_simple[8]}, 
            {"text": "노무현전대통령", "weight": 2.1441610505205295, "color": RenderUtil.color_table_simple[9]}
          ]
        }
      }
    }    
  ],

  DEFAULT_OPTIONS :  {
    "xlsx": false,
    "words": "words",
    "text": "text",
    "weight": "weight",
    "min_percent": 5,
    "max_percent": 70,
    "color_field": null,
    "min_color": "#6baed6",
    "max_color": "#2171b5",
    "accuracy": 5, // 한글의 경우 5가 넘어가면 버그가 있음
    "tooltip": "{word}:\n[bold]{value}[/]"
  },

  render : function($dom, unit, with_chart_area) {
	  if( with_chart_area == undefined || with_chart_area == null) with_chart_area = true;
    am4core.options.commercialLicense = true; // license를 가지고 있음

    if (with_chart_area) {
      var $chartDiv = $("<div class=\"chartArea\"></div>");
      if (unit.options.height) 
        $chartDiv.css({"height": unit.options.height, "min-height": unit.options.height});
    } else {
      var $chartDiv = $dom;
    }
    $dom.append($chartDiv);
    if (unit.options['title']) {
    	/* 키워드 명칭 변경 , 검색 키워드 && 치환*/
        var title = unit.options['title'];
        title = title.replace(/\|\|/g, ",");
        title = title.replace($("#subKwd").val(), $("#issKwdDisp").val()); // 키워드 명칭 변경
        
      $titleDiv = $('<h3>' + title + '</h3>');
      $chartDiv.append($titleDiv)
    }

    var chartDivId = ReportRenderer.getUniqueDivId();
    var $innerDiv = $("<div id=\"" + chartDivId + "\" class=\"chart\"></div>");
    if (unit.options.height) 
      $innerDiv.css({"height": unit.options.height - 30, "min-height": unit.options.height - 30});
    $chartDiv.append($innerDiv);

    if (_word_cloud.validateData(unit) == false) {
      $dom.append("WordCloud 데이터가 올바르지 않습니다.<br /><pre>" + JSON.stringify(unit, null, 2) + "</pre>");
      return;
    }

    var chart = _word_cloud.renderWordCloud(chartDivId, unit);

    return $chartDiv;
  },

  validateData : function(unit) {
    RenderUtil.settingOptionsWithDefaultOptions(unit, _word_cloud.DEFAULT_OPTIONS);
    if (RenderUtil.checkChartData(unit, unit.options.words) == false) {
      console.error("차트 생성에 필요한 데이터가 존재하지 않습니다 (데이터 필드: " + unit.options[_word_cloud.DATA_FIELD] + ")");
      return false;
    }
    return true;
  },

  renderWordCloud : function(chartDivId, unit) {
    var data = unit.data;
    var options = unit.options;
    var chart = am4core.create(chartDivId, am4plugins_wordCloud.WordCloud);
    var series = chart.series.push(new am4plugins_wordCloud.WordCloudSeries());

    series.data = data[options.words];
    series.dataFields.word = options.text;
    series.dataFields.value = options.weight;
    series.accuracy = options.accuracy; 
    series.labels.template.tooltipText = options.tooltip;
    series.maxFontSize = am4core.percent(options.max_percent);
    series.minFontSize = am4core.percent(options.min_percent);
    if (unit.options.color_field) {
      series.labels.template.propertyFields.fill = unit.options.color_field;
    }
    else {
      series.heatRules.push({
       "target": series.labels.template,
       "property": "fill",
       "min": am4core.color(options.min_color),
       "max": am4core.color(options.max_color),
       "dataField": "value"
      });      
    }
  },

};
UnitRendererFactory.add("wordcloudchart", _word_cloud.render);
UnitRendererFactory.addExample("wordcloudchart", _word_cloud.example);