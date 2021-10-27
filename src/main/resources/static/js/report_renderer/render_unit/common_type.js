var _amchart_common = {
  defaultOption : {
    "xlsx": true,
    chart_div_options: {},
    inner_div_options: {},
    chart_config: {}
  },
    
  example : [
    {
      name: "예제1",
      description: "선형 추이 차트",
      sample: {
        "type": "amchart_common",
        "processing": false,
        "id": "chart",
        "visible": true,
        "options": {
          "chart_config": {
            "categoryField": "date",
            "sequencedAnimation": false,
            "guides": [
              {"lineThickness": 2, "above": true, "value": 12.93, "tickLength": 0, "lineColor": "#FF1493", "dashLength": 5, "lineAlpha": 1}
            ],
            "graphs": [
              {"lineThickness": 2, "bulletBorderAlpha": 1, "bulletSizeField": "bullet_size", "bullet": "round", "title": "", "valueField": "freq", "bulletBorderColor": "#FFFFFF", "balloonText": "[[category]]: [[value]]건", "fillAlphas": 0.18, "lineAlpha": 1.0}
            ],
            "colors": ["#00c9d3"],
            "titles": [
              {"text": "", "size": 15}
            ],
            "categoryAxis": {"autoGridCount": false, "gridAlpha": 0},
            "type": "serial",
            "valueAxes": [
              {"precision": 0, "title": ""}
            ],
            "legend": {"enabled": false, "align": "center", "equalWidths": false}
          },
          "chart_div_options": {"classes": "customChartArea", "styles": {"height": "370px"}},
          "inner_div_options": {"classes": "customChart"},
          "xlsx": false
        },
        "data": [
          {"date": "2019-01-01", "freq": 18},
          {"date": "2019-01-02", "freq": 24},
          {"date": "2019-01-03", "freq": 21},
          {"date": "2019-01-04", "freq": 24},
          {"date": "2019-01-05", "freq": 20},
          {"date": "2019-01-06", "freq": 21},
          {"date": "2019-01-07", "freq": 19},
          {"date": "2019-01-08", "freq": 19},
          {"date": "2019-01-09", "freq": 25},
          {"date": "2019-01-10", "freq": 8},
          {"date": "2019-01-11", "freq": 30, "bullet_size": 16},
          {"date": "2019-01-12", "freq": 21},
          {"date": "2019-01-13", "freq": 21},
          {"date": "2019-01-14", "freq": 21},
          {"date": "2019-01-15", "freq": 20},
          {"date": "2019-01-16", "freq": 24},
          {"date": "2019-01-17", "freq": 20},
          {"date": "2019-01-18", "freq": 31, "bullet_size": 16},
          {"date": "2019-01-19", "freq": 19},
          {"date": "2019-01-20", "freq": 24},
          {"date": "2019-01-21", "freq": 26},
          {"date": "2019-01-22", "freq": 20},
          {"date": "2019-01-23", "freq": 22},
          {"date": "2019-01-24", "freq": 21},
          {"date": "2019-01-25", "freq": 13},
          {"date": "2019-01-26", "freq": 22},
          {"date": "2019-01-27", "freq": 24},
          {"date": "2019-01-28", "freq": 17},
          {"date": "2019-01-29", "freq": 27},
          {"date": "2019-01-30", "freq": 27},
          {"date": "2019-01-31", "freq": 15}
        ]
      }
    }, 
    {
      name: "예제2",
      description: "막대형 추이 차트",
      sample: {
        "type": "amchart_common",
        "processing": false,
        "id": "chart",
        "visible": true,
        "options": {
          "chart_div_options": {"classes": "customChartArea", "styles": {"height": "370px"}},
          "inner_div_options": {"classes": "customChart"},
          "chart_config": {
            "categoryField": "kor_date",
            "sequencedAnimation": false,
            "guides": [
              {"lineThickness": 2, "above": true, "value": 15.358490566037736, "tickLength": 0, "lineColor": "#FF1493", "dashLength": 5, "lineAlpha": 1}
            ],
            "legend": {
              "equalWidths": false,
              "align": "center",
              "data": [
                {"color": "#FF1493", "markerType": "line", "title": "과거 평균"},
                {"color": "#f7c945", "title": "작년 동기"},
                {"color": "#54b1f3", "title": "비교 기간"},
                {"color": "#96d779", "title": "분석 기간"}
              ]
            },
            "graphs": [
              {"title": "", "valueField": "freq", "colorField": "color", "balloonText": "[[category]]: [[value]]건", "type": "column", "fillAlphas": 1.0, "lineAlpha": 0}
            ],
            "colors": ["#D6D6D6"],
            "titles": [
              {"text": "", "size": 15}
            ],
            "categoryAxis": {"autoGridCount": false, "gridAlpha": 0, "autoWrap": false},
            "type": "serial",
            "valueAxes": [
              {"precision": 0, "title": ""}
            ]
          },
          "xlsx": false
        },
        "data": [
          {"date": "2018-03-12", "color": "#f7c945", "freq": 21, "kor_date": "2018년 3월 2주"},
          {"date": "2018-03-19", "freq": 12, "kor_date": "2018년 3월 3주"},
          {"date": "2018-03-26", "freq": 5, "kor_date": "2018년 3월 4주"},
          {"date": "2018-04-02", "freq": 20, "kor_date": "2018년 4월 1주"},
          {"date": "2018-04-09", "freq": 15, "kor_date": "2018년 4월 2주"},
          {"date": "2018-04-16", "freq": 16, "kor_date": "2018년 4월 3주"},
          {"date": "2018-04-23", "freq": 21, "kor_date": "2018년 4월 4주"},
          {"date": "2018-04-30", "freq": 14, "kor_date": "2018년 5월 1주"},
          {"date": "2018-05-07", "freq": 16, "kor_date": "2018년 5월 2주"},
          {"date": "2018-05-14", "freq": 13, "kor_date": "2018년 5월 3주"},
          {"date": "2018-05-21", "freq": 12, "kor_date": "2018년 5월 4주"},
          {"date": "2018-05-28", "freq": 16, "kor_date": "2018년 5월 5주"},
          {"date": "2018-06-04", "freq": 18, "kor_date": "2018년 6월 1주"},
          {"date": "2018-06-11", "freq": 12, "kor_date": "2018년 6월 2주"},
          {"date": "2018-06-18", "freq": 8, "kor_date": "2018년 6월 3주"},
          {"date": "2018-06-25", "freq": 16, "kor_date": "2018년 6월 4주"},
          {"date": "2018-07-02", "freq": 8, "kor_date": "2018년 7월 1주"},
          {"date": "2018-07-09", "freq": 10, "kor_date": "2018년 7월 2주"},
          {"date": "2018-07-16", "freq": 14, "kor_date": "2018년 7월 3주"},
          {"date": "2018-07-23", "freq": 11, "kor_date": "2018년 7월 4주"},
          {"date": "2018-07-30", "freq": 10, "kor_date": "2018년 8월 1주"},
          {"date": "2018-08-06", "freq": 15, "kor_date": "2018년 8월 2주"},
          {"date": "2018-08-13", "freq": 8, "kor_date": "2018년 8월 3주"},
          {"date": "2018-08-20", "freq": 6, "kor_date": "2018년 8월 4주"},
          {"date": "2018-08-27", "freq": 13, "kor_date": "2018년 8월 5주"},
          {"date": "2018-09-03", "freq": 12, "kor_date": "2018년 9월 1주"},
          {"date": "2018-09-10", "freq": 8, "kor_date": "2018년 9월 2주"},
          {"date": "2018-09-17", "freq": 8, "kor_date": "2018년 9월 3주"},
          {"date": "2018-09-24", "freq": 14, "kor_date": "2018년 9월 4주"},
          {"date": "2018-10-01", "freq": 16, "kor_date": "2018년 10월 1주"},
          {"date": "2018-10-08", "freq": 14, "kor_date": "2018년 10월 2주"},
          {"date": "2018-10-15", "freq": 12, "kor_date": "2018년 10월 3주"},
          {"date": "2018-10-22", "freq": 18, "kor_date": "2018년 10월 4주"},
          {"date": "2018-10-29", "freq": 9, "kor_date": "2018년 10월 5주"},
          {"date": "2018-11-05", "freq": 11, "kor_date": "2018년 11월 1주"},
          {"date": "2018-11-12", "freq": 12, "kor_date": "2018년 11월 2주"},
          {"date": "2018-11-19", "freq": 12, "kor_date": "2018년 11월 3주"},
          {"date": "2018-11-26", "freq": 13, "kor_date": "2018년 11월 4주"},
          {"date": "2018-12-03", "freq": 21, "kor_date": "2018년 12월 1주"},
          {"date": "2018-12-10", "freq": 24, "kor_date": "2018년 12월 2주"},
          {"date": "2018-12-17", "freq": 22, "kor_date": "2018년 12월 3주"},
          {"date": "2018-12-24", "freq": 20, "kor_date": "2018년 12월 4주"},
          {"date": "2018-12-31", "freq": 30, "kor_date": "2019년 1월 1주"},
          {"date": "2019-01-07", "freq": 19, "kor_date": "2019년 1월 2주"},
          {"date": "2019-01-14", "freq": 13, "kor_date": "2019년 1월 3주"},
          {"date": "2019-01-21", "freq": 24, "kor_date": "2019년 1월 4주"},
          {"date": "2019-01-28", "freq": 19, "kor_date": "2019년 1월 5주"},
          {"date": "2019-02-04", "freq": 23, "kor_date": "2019년 2월 1주"},
          {"date": "2019-02-11", "freq": 27, "kor_date": "2019년 2월 2주"},
          {"date": "2019-02-18", "freq": 12, "kor_date": "2019년 2월 3주"},
          {"date": "2019-02-25", "freq": 22, "kor_date": "2019년 2월 4주"},
          {"date": "2019-03-04", "color": "#54b1f3", "freq": 26, "kor_date": "2019년 3월 1주"},
          {"date": "2019-03-11", "color": "#96d779", "freq": 23, "kor_date": "2019년 3월 2주"}
        ]
      }
    }, 
    {
      name: "예제3",
      description: "파이 차트",
      sample: {
        "type": "amchart_common",
        "processing": false,
        "id": "chart",
        "visible": true,
        "options": {
          "chart_config": {
            "startDuration": 0,
            "labelsEnabled": false,
            "marginBottom": 0,
            "titleField": "category",
            "colors": ["cornflowerblue", "lightcoral", "lightsteelblue"],
            "titles": [
              {"text": "2017년 감성 분포"}
            ],
            "valueField": "value",
            "marginTop": 0,
            "balloonText": "[[title]]<br><b>[[value]]건</b> ([[percents]]%)",
            "legend": {
              "enabled": true,
              "align": "center",
              "markerType": "circle"
            },
            "type": "pie"
          },
          "chart_div_options": {"classes": "customChartArea", "styles": {"height": "370px"}},
          "inner_div_options": {"classes": "customChart"},
          "xlsx": false
        },
        "data": [
          {"category": "긍정", "value": 267},
          {"category": "부정", "value": 129},
          {"category": "중립", "value": 3}
        ]
      }
    },
    {
      name: "예제4",
      description: "감성 분포 막대 차트",
      sample: {
        "type": "amchart_common",
        "processing": false,
        "id": "chart",
        "visible": true,
        "options": {
          "chart_config": {
            "categoryField": "date",
            "sequencedAnimation": false,
            "valueAxes": [
              {"stackType": "regular", "title": "감성표현수"}
            ],
            "graphs": [
              {"title": "긍정", "balloonText": "[[category]]: [[title]] [[value]]건", "lineAlpha": 0, "fillAlphas": 0.7, "valueField": "pos_count"},
              {"title": "부정", "balloonText": "[[category]]: [[title]] [[value]]건", "lineAlpha": 0, "fillAlphas": 0.7, "valueField": "neg_count"},
              {"title": "중립", "balloonText": "[[category]]: [[title]] [[value]]건", "lineAlpha": 0, "fillAlphas": 0.7, "valueField": "neu_count"}
            ],
            "colors": ["cornflowerblue", "lightcoral", "lightsteelblue"],
            "categoryAxis": {"autoGridCount": false, "gridAlpha": 0},
            "type": "serial",
            "guides": [
              {"category": "19년 2분기", "lineThickness": 2, "tickLength": 0, "lineColor": "#bbbbbb", "dashLength": 5, "lineAlpha": 1},
              {"category": "17년 2분기", "lineThickness": 2, "tickLength": 0, "lineColor": "#bbbbbb", "dashLength": 5, "lineAlpha": 1},
              {"category": "18년 3분기", "lineThickness": 2, "tickLength": 0, "lineColor": "#bbbbbb", "dashLength": 5, "lineAlpha": 1}
            ],
            "legend": {"enabled": true, "align": "center", "equalWidths": false}
          },
          "chart_div_options": {"classes": "customChartArea", "styles": {"height": "370px"}},
          "inner_div_options": {"classes": "customChart"},
          "xlsx": false
        },
        "data": [
          {"date": "17년 1분기", "pos_count": 0, "neu_count": 0, "neg_count": 0},
          {"date": "17년 2분기", "pos_count": 4, "neu_count": 0, "neg_count": 5},
          {"date": "17년 3분기", "pos_count": 93, "neu_count": 0, "neg_count": 49},
          {"date": "17년 4분기", "pos_count": 170, "neu_count": 3, "neg_count": 75},
          {"date": "18년 1분기", "pos_count": 209, "neu_count": 0, "neg_count": 73},
          {"date": "18년 2분기", "pos_count": 197, "neu_count": 0, "neg_count": 86},
          {"date": "18년 3분기", "pos_count": 327, "neu_count": 0, "neg_count": 113},
          {"date": "18년 4분기", "pos_count": 236, "neu_count": 0, "neg_count": 92},
          {"date": "19년 1분기", "pos_count": 199, "neu_count": 0, "neg_count": 81},
          {"date": "19년 2분기", "pos_count": 153, "neu_count": 0, "neg_count": 46},
          {"date": "19년 3분기", "pos_count": 24, "neu_count": 0, "neg_count": 8},
          {"date": "19년 4분기", "pos_count": 0, "neu_count": 0, "neg_count": 0}        
        ]
      }
    },
    {
      name: "예제5",
      description: "누적 막대 차트",
      sample: {
        "type": "amchart_common",
        "processing": false,
        "id": "chart",
        "visible": true,
        "options": {
          "chart_config": {
            "categoryField": "name",
            "sequencedAnimation": false,
            "legend": {"enabled": true, "align": "center", "equalWidths": false},
            "graphs": [
              {"title": "부킹닷컴", "balloonText": "[[title]] [[category]]: [[value]]", "type": "column", "fillAlphas": 1, "valueField": "부킹닷컴"},
              {"title": "야놀자", "balloonText": "[[title]] [[category]]: [[value]]", "type": "column", "fillAlphas": 1, "valueField": "야놀자"},
              {"title": "데일리호텔", "balloonText": "[[title]] [[category]]: [[value]]", "type": "column", "fillAlphas": 1, "valueField": "데일리호텔"}
            ],
            "colors": ["#009fe2", "#ff3478", "#c5003c"],
            "categoryAxis": {"autoGridCount": false, "gridPosition": "start", "gridAlpha": 0},
            "type": "serial",
            "valueAxes": [
              {"stackType": "regular", "title": "감성표현수"}
            ]
          },
          "chart_div_options": {"classes": "customChartArea", "styles": {"height": "370px"}},
          "inner_div_options": {"classes": "customChart"},
          "xlsx": false          
        },
        "data": [
          {"name": "17년 1분기", "부킹닷컴": 0, "야놀자": 0, "데일리호텔": 0},
          {"name": "17년 2분기", "부킹닷컴": 0, "야놀자": 0, "데일리호텔": 9},
          {"name": "17년 3분기", "부킹닷컴": 18, "야놀자": 0, "데일리호텔": 124},
          {"name": "17년 4분기", "부킹닷컴": 108, "야놀자": 12, "데일리호텔": 128},
          {"name": "18년 1분기", "부킹닷컴": 107, "야놀자": 23, "데일리호텔": 152},
          {"name": "18년 2분기", "부킹닷컴": 56, "야놀자": 35, "데일리호텔": 192},
          {"name": "18년 3분기", "부킹닷컴": 113, "야놀자": 51, "데일리호텔": 276},
          {"name": "18년 4분기", "부킹닷컴": 104, "야놀자": 32, "데일리호텔": 192},
          {"name": "19년 1분기", "부킹닷컴": 144, "야놀자": 12, "데일리호텔": 124},
          {"name": "19년 2분기", "부킹닷컴": 91, "야놀자": 20, "데일리호텔": 88},
          {"name": "19년 3분기", "부킹닷컴": 29, "야놀자": 3, "데일리호텔": 0},
          {"name": "19년 4분기", "부킹닷컴": 0, "야놀자": 0, "데일리호텔": 0}
        ]
      }
    },
    {
      name: "예제6",
      description: "막대 차트",
      sample: {
        "type": "amchart_common",
        "processing": false,
        "id": "chart",
        "visible": true,
        "options": {
          "chart_config": {
            "categoryField": "site",
            "sequencedAnimation": false,
            "legend": {"enabled": true, "align": "center", "equalWidths": false},
            "graphs": [
              {"title": "긍정", "balloonText": "[[title]] [[category]]: [[value]]", "type": "column", "fillAlphas": 1, "valueField": "pos_count"},
              {"title": "부정", "balloonText": "[[title]] [[category]]: [[value]]", "type": "column", "fillAlphas": 1, "valueField": "neg_count"},
              {"title": "중립", "balloonText": "[[title]] [[category]]: [[value]]", "type": "column", "fillAlphas": 1, "valueField": "neu_count"}
            ],
            "colors": ["cornflowerblue", "lightcoral", "lightsteelblue"],
            "categoryAxis": {"autoGridCount": false, "gridPosition": "start", "gridAlpha": 0},
            "type": "serial",
            "valueAxes": [
              {"title": "감성표현수"}
            ]
          },
          "chart_div_options": {"classes": "customChartArea", "styles": {"height": "370px"}},
          "inner_div_options": {"classes": "customChart"},
          "xlsx": false          
        },
        "data": [
          {"site": "야놀자", "pos_count": 138, "neu_count": 14, "neg_count": 50},
          {"site": "부킹닷컴", "pos_count": 527, "neu_count": 52, "neg_count": 241},
          {"site": "데일리호텔", "pos_count": 947, "neu_count": 114, "neg_count": 337},
          {"site": "트립어드바이저", "pos_count": 75, "neu_count": 23, "neg_count": 143} 
        ]
      }
    }
  ],

  /*
   * 에러를 검사하고, 일부 잘못된 형식을 교정
   * 에러가 발생하면 console.error로 에러메시지와 unit.id 출력
   * 어떻게든 복구가 가능하면 복구하고 true return, 복구 불가능하면 false return
   */
  validateData : function(unit) {
    if (unit.options == null || Object.keys(unit.options).length == 0) {
      console.error("options is empty : " + unit.id);
      //return false;
      // 옵션이 없는 경우 default 옵션을 넣도록 함
      unit.options = jQuery.extend(true, {}, _amchart_common.defaultOption);
    }
    else unit.options = jQuery.extend(true, {}, _amchart_common.defaultOption, unit.options);

    if (unit.options.chart_config && unit.options.chart_config.valueAxes) {
      unit.options.chart_config.valueAxes.forEach(function (axis) {
        if (axis.labelFunction && (typeof axis.labelFunction == "string")) 
          axis.labelFunction = new Function("return " + axis.labelFunction)();
      });
    }

    if (unit.data == null || unit.data.length == 0) {
      console.error("data is empty : " + unit.id);
      return false;
    }
    return true;
  },

  draw: function(chartDivId, unit) {	
    var chart_config = jQuery.extend(true, {}, unit.options.chart_config);

    /* 키워드 명칭 변경 , 검색 키워드 && 치환*/
    if( fnComnNotNullAndEmpty(chart_config.titles) ){
    	var title = chart_config.titles[0].text;
        title = title.replace(/&&/g, ",").replace(/\|\|/g, ",");
      	title = title.replace($("#subKwd").val(), $("#issKwdDisp").val()); // 키워드 명칭 변경
        chart_config.titles[0].text = title;
    }
    
    chart_config.dataProvider = unit.data;

    var chart = AmCharts.makeChart(chartDivId, chart_config);
  },

  render_chart: function($chartDiv, unit) {
    var chart_div_options = unit.options.chart_div_options;
    var inner_div_options = unit.options.inner_div_options;

    if (chart_div_options.classes)
      $chartDiv.addClass(chart_div_options.classes);
    if (chart_div_options.attrs)
      $chartDiv.attr(chart_div_options.attrs);
    if (chart_div_options.styles)
      $chartDiv.css(chart_div_options.styles);

    var chartDivId = ReportRenderer.getUniqueDivId();
    var $innerDiv = $("<div id=\"" + chartDivId + "\"></div>");

    if (inner_div_options.classes)
      $innerDiv.addClass(inner_div_options.classes);
    if (inner_div_options.attrs)
      $innerDiv.attr(inner_div_options.attrs);
    if (inner_div_options.styles)
      $innerDiv.css(inner_div_options.styles);
    $chartDiv.append($innerDiv);

    _amchart_common.draw(chartDivId, unit);
    return $chartDiv;
  },  

  render : function($dom, unit, with_chart_area) {
	if( with_chart_area == undefined || with_chart_area == null) with_chart_area = true;
	
    if (_amchart_common.validateData(unit) == false) {
      $dom.append("amchart_common 데이터가 올바르지 않습니다.<br /><pre>" + JSON.stringify(unit, null, 2) + "</pre>");
      return;
    }

    if (unit.options.target_div) {
      _amchart_common.draw(unit.options.target_div, unit);
      return null;
    }
    else {
      if (with_chart_area) {
        var $chartDiv = $("<div></div>");
        $dom.append($chartDiv);
      } else {
        var $chartDiv = $dom;
      }
      return _amchart_common.render_chart($chartDiv, unit);
    }
  }
};

UnitRendererFactory.add("amchart_common", _amchart_common.render);
UnitRendererFactory.addExample("amchart_common", _amchart_common.example);

