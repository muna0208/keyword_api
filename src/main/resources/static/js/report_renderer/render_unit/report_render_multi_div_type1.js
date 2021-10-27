/*
options
    title: 차트제목
    height: 차트 높이 ("250px", "100%")
    width: 차트 넓이 ("250px", "100%")
data (list, size2):
  각 차트의 랜더링 유닛 (가능 랜더링 유닛 pie, posnegbar)
  multichart 사용가능한 유닛을 추가하고 싶으면 해당 유닛의 render function을 수정
  ex)
  render : function($dom, unit, with_chart_area = true) {
      if (with_chart_area) {
          var $chartDiv = $("<div class=\"chartArea\"></div>");
      } else {
          var $chartDiv = $dom;
      }
      $dom.append($chartDiv);
  ...
  
*/

var _multichart = {

  example : [
    {
      name: "예제1",
      description: "카테고리 2개",
      sample: {
        "type": "multichart",
        "visible": true,
        "id": "test.chart1",
        "data": [
          {
            "data": [
              {"rate": 0.25720876585928487, "label": "전라북도"},
              {"rate": 0.7427912341407151, "label": "타지역"}
            ],
            "visible": true,
            "type": "piechart",
            "id": "test.chart1.left",
            "options": {"name": "label", "value": "rate", "title": "전체기간"}
          },
          {
            "data": [
              {"rate": 0.3424657534246575, "label": "전라북도"},
              {"rate": 0.6575342465753424, "label": "타지역"}
            ],
            "visible": true,
            "type": "piechart",
            "id": "test.chart1.right",
            "options": {"name": "label", "value": "rate", "title": "분기"}
          }
        ],
        "options": {
          "title": "주거지역 분포",
          "height": "",
          "width": "",
          "xlsx": true
        }
      }
    },
    {
      name: "예제2",
      description: "연관어 맵 2개 그리기",
      sample: {
        "type": "multichart",
        "visible": true,
        "id": "test.pair0_assoc",
        "data": [
          {
            "data": {
              "children": [
                {"kind": "2/6/47", "size": 22, "label": "전동성당"},
                {"kind": "2/1/17", "size": 16, "label": "전주한옥마을"},
                {"kind": "3/5/63", "size": 14, "label": "한옥마을"},
                {"kind": "3/1/57", "size": 13, "label": "연휴"},
                {"kind": "2/6/49", "size": 10, "label": "전주향교"},
                {"kind": "5/1/72", "size": 10, "label": "전주국제영화제"},
                {"kind": "2/1/6", "size": 9, "label": "제주도"},
                {"kind": "2/1/11", "size": 7, "label": "완산칠봉"},
                {"kind": "2/1/11", "size": 5, "label": "완산공원"},
                {"kind": "3/2/58", "size": 4, "label": "혼자"},
                {"kind": "2/3/30", "size": 4, "label": "전주남부시장"},
                {"kind": "2/6/51", "size": 3, "label": "오목대"},
                {"kind": "3/2/58", "size": 3, "label": "먹방"},
                {"kind": "6/1/92", "size": 2, "label": "치킨"},
                {"kind": "3/5/61", "size": 2, "label": "정원"},
                {"kind": "3/5/61", "size": 2, "label": "바다"},
                {"kind": "2/6/51", "size": 2, "label": "경기전"},
                {"kind": "6/2/94", "size": 2, "label": "이스탄불"},
                {"kind": "2/6/51", "size": 2, "label": "이목대"},
                {"kind": "2/1/17", "size": 1, "label": "자만벽화마을"},
                {"kind": "2/3/30", "size": 1, "label": "춘천남부시장"},
                {"kind": "2/1/14", "size": 1, "label": "순천만습지"},
                {"kind": "2/1/9", "size": 1, "label": "저동항"},
                {"kind": "2/1/11", "size": 1, "label": "돌산공원"},
                {"kind": "2/4/33", "size": 1, "label": "순천만국가정원"},
                {"kind": "2/1/6", "size": 1, "label": "영종도"},
                {"kind": "6/1/92", "size": 1, "label": "고로케"},
                {"kind": "2/1/7", "size": 1, "label": "섬진강"},
                {"kind": "2/1/6", "size": 1, "label": "울릉도"},
                {"kind": "3/5/63", "size": 1, "label": "성당"},
                {"kind": "3/5/67", "size": 1, "label": "야시장"},
                {"kind": "3/4/60", "size": 1, "label": "정류장"},
                {"kind": "3/5/66", "size": 1, "label": "게스트하우스"},
                {"kind": "6/2/94", "size": 1, "label": "밥"},
                {"kind": "3/4/60", "size": 1, "label": "터미널"},
                {"kind": "3/1/56", "size": 1, "label": "겨울"},
                {"kind": "3/5/61", "size": 1, "label": "호수"},
                {"kind": "3/5/66", "size": 1, "label": "숙소"},
                {"kind": "6/2/94", "size": 1, "label": "이야기"},
                {"kind": "3/5/68", "size": 1, "label": "여행지"}
              ],
              "label": "나홀로여행"
            },
            "visible": true,
            "type": "assoc_map",
            "id": "test.나홀로여행_assoc",
            "options": {"title": "나홀로여행 테마 키워드", "child_label": "label", "label": "label", "class": "kind", "children": "children", "size": "size"}
          },
          {
            "data": {
              "children": [
                {"kind": "2/1/17", "size": 31, "label": "전주한옥마을"},
                {"kind": "2/6/47", "size": 15, "label": "전동성당"},
                {"kind": "3/5/63", "size": 12, "label": "한옥마을"},
                {"kind": "2/1/12", "size": 11, "label": "마이산"},
                {"kind": "2/6/45", "size": 11, "label": "마이산"},
                {"kind": "3/4/60", "size": 8, "label": "터미널"},
                {"kind": "2/1/12", "size": 7, "label": "곰배령"},
                {"kind": "3/5/68", "size": 7, "label": "여행지"},
                {"kind": "3/2/58", "size": 7, "label": "고3"},
                {"kind": "2/1/6", "size": 6, "label": "가우도"},
                {"kind": "2/1/13", "size": 6, "label": "죽녹원"},
                {"kind": "2/6/51", "size": 6, "label": "오목대"},
                {"kind": "2/3/30", "size": 5, "label": "전주중앙시장"},
                {"kind": "2/1/8", "size": 5, "label": "송정해변"},
                {"kind": "2/1/13", "size": 5, "label": "원예예술촌"},
                {"kind": "2/1/6", "size": 5, "label": "벌교"},
                {"kind": "2/1/17", "size": 5, "label": "다랭이마을"},
                {"kind": "2/3/30", "size": 5, "label": "통영중앙시장"},
                {"kind": "2/1/17", "size": 5, "label": "동피랑마을"},
                {"kind": "2/6/44", "size": 4, "label": "부소산성"},
                {"kind": "2/6/45", "size": 4, "label": "백담사"},
                {"kind": "2/1/11", "size": 4, "label": "이순신공원"},
                {"kind": "2/4/33", "size": 4, "label": "서동요테마파크"},
                {"kind": "2/6/51", "size": 4, "label": "경기전"},
                {"kind": "2/3/30", "size": 4, "label": "속초중앙시장"},
                {"kind": "6/2/94", "size": 4, "label": "삼성"},
                {"kind": "3/5/68", "size": 4, "label": "관광지"},
                {"kind": "3/5/61", "size": 4, "label": "바다"},
                {"kind": "3/5/66", "size": 4, "label": "게스트하우스"},
                {"kind": "2/1/17", "size": 3, "label": "하회마을"},
                {"kind": "2/6/44", "size": 3, "label": "해미읍성"},
                {"kind": "2/6/45", "size": 3, "label": "용문사"},
                {"kind": "5/1/72", "size": 3, "label": "태안튤립축제"},
                {"kind": "2/5/41", "size": 3, "label": "영덕블루로드"},
                {"kind": "2/4/34", "size": 3, "label": "백암온천"},
                {"kind": "6/2/94", "size": 3, "label": "한옥"},
                {"kind": "6/2/94", "size": 3, "label": "지리산"},
                {"kind": "3/5/68", "size": 3, "label": "명소"},
                {"kind": "2/1/9", "size": 2, "label": "서천갯벌"},
                {"kind": "2/1/10", "size": 2, "label": "한라산성판악"}
              ],
              "label": "버스여행"
            },
            "visible": true,
            "type": "assoc_map",
            "id": "test.버스여행_assoc",
            "options": {"title": "버스여행 테마 키워드", "child_label": "label", "label": "label", "class": "kind", "children": "children", "size": "size"}
          }
        ],
        "options": {
          "title": "여행테마별 연관어",
          "xlsx": true
        }
      }
    },
    {
      name: "예제3",
      description: "파이 & 막대 차트",
      sample: {
        "type": "multichart",
        "visible": true,
        "id": "multichart",
        "data": [
          {
            "data": [
              {"category": "긍정", "value": 267},
              {"category": "중립", "value": 3},
              {"category": "부정", "value": 129}              
            ],
            "visible": true,
            "type": "piechart",
            "id": "multichart.right",
            "options": {
              "name": "category", 
              "value": "value", 
              "title": "감성분포",
              "colors": ["cornflowerblue", "lightsteelblue", "lightcoral"]
            }
          },
          {
            "type": "amchart_common",
            "processing": false,
            "id": "multichart.left",
            "visible": true,
            "options": {
              "chart_config": {
                "categoryField": "name",
                "sequencedAnimation": false,
                "legend": {"enabled": true, "align": "center", "equalWidths": false},
                "graphs": [
                  {"title": "긍정", "balloonText": "[[title]] [[category]]: [[value]]", "type": "column", "fillAlphas": 1, "valueField": "긍정"},
                  {"title": "중립", "balloonText": "[[title]] [[category]]: [[value]]", "type": "column", "fillAlphas": 1, "valueField": "중립"},
                  {"title": "부정", "balloonText": "[[title]] [[category]]: [[value]]", "type": "column", "fillAlphas": 1, "valueField": "부정"}                  
                ],
                "colors": ["cornflowerblue", "lightsteelblue", "lightcoral"],
                "categoryAxis": {"autoGridCount": false, "gridPosition": "start", "gridAlpha": 0},
                "type": "serial",
                "valueAxes": [
                  {"stackType": "regular", "title": "감성 표현수"}
                ]
              },
              "chart_div_options": {"classes": "customChartArea", "styles": {"height": "370px"}},
              "inner_div_options": {"classes": "customChart"},
              "xlsx": false          
            },
            "data": [
              {"name": "3월28일", "부정": 0, "중립": 0, "긍정": 9},
              {"name": "3월29일", "부정": 18, "중립": 0, "긍정": 124},
              {"name": "3월30일", "부정": 108, "중립": 12, "긍정": 128},
              {"name": "3월31일", "부정": 107, "중립": 23, "긍정": 152},
              {"name": "4월1일", "부정": 56, "중립": 35, "긍정": 192},
              {"name": "4월2일", "부정": 113, "중립": 51, "긍정": 276},
              {"name": "4월3일", "부정": 104, "중립": 32, "긍정": 192},
              {"name": "4월4일", "부정": 144, "중립": 12, "긍정": 124},
              {"name": "4월5일", "부정": 91, "중립": 20, "긍정": 88},
              {"name": "4월6일", "부정": 29, "중립": 3, "긍정": 128},
              {"name": "4월7일", "부정": 23, "중립": 0, "긍정": 123},
              {"name": "4월8일", "부정": 13, "중립": 0, "긍정": 120},
              {"name": "4월9일", "부정": 0, "중립": 0, "긍정": 90},
              {"name": "4월10일", "부정": 18, "중립": 0, "긍정": 124},
              {"name": "4월11일", "부정": 108, "중립": 12, "긍정": 128},
              {"name": "4월12일", "부정": 107, "중립": 23, "긍정": 152},
              {"name": "4월13일", "부정": 56, "중립": 35, "긍정": 192},
              {"name": "4월14일", "부정": 113, "중립": 51, "긍정": 276},
              {"name": "4월15일", "부정": 104, "중립": 32, "긍정": 192},
              {"name": "4월16일", "부정": 144, "중립": 12, "긍정": 124},
              {"name": "4월17일", "부정": 91, "중립": 20, "긍정": 88},
              {"name": "4월18일", "부정": 29, "중립": 3, "긍정": 88},
              {"name": "4월19일", "부정": 86, "중립": 0, "긍정": 152},
              {"name": "4월20일", "부정": 22, "중립": 0, "긍정": 88},
              {"name": "4월21일", "부정": 44, "중립": 0, "긍정": 90},
              {"name": "4월22일", "부정": 18, "중립": 0, "긍정": 124},
              {"name": "4월23일", "부정": 108, "중립": 12, "긍정": 128},
              {"name": "4월24일", "부정": 107, "중립": 23, "긍정": 152},
              {"name": "4월25일", "부정": 56, "중립": 35, "긍정": 192},
              {"name": "4월26일", "부정": 113, "중립": 51, "긍정": 276},
              {"name": "4월27일", "부정": 104, "중립": 32, "긍정": 192},
              {"name": "4월28일", "부정": 144, "중립": 12, "긍정": 124}
            ]
          }
        ],
        "options": {
          "title": "",
          "height": "",
          "width": "",
          "xlsx": true
        }
      }
    }
  ],

  validate : function(unit) {
    if (unit.data == null) {
      console.error("unit.render_units is null. : " + unit.id);
      return false;
    }

    if (!unit.options.flex) {
      unit.options.flex = [];
      for (var i = 0; i < unit.data.length; i++)
        unit.options.flex.push(100.0 / unit.data.length);
    }

    return true;
  },
  
  render : function($dom, unit) {
    if (_multichart.validate(unit) == false) {
      $dom.append("multichart 데이터가 올바르지 않습니다. <br /><pre>" + JSON.stringify(unit, null, 2) + "</pre>");
      return;
    }

    var $chartDiv = $("<div></div>");
    
    if (unit.options.div_class) 
      $chartDiv.addClass(unit.options.div_class);
    else $chartDiv.addClass("chartArea");
    $dom.append($chartDiv);

    var unitOptions = unit.options;
    
    if (unitOptions['height']) {
      $chartDiv.css('height', unitOptions['height']);
      $chartDiv.css('min-height', unitOptions['height']);
    }

    if (unitOptions['width']) {
      $chartDiv.css('width', unitOptions['width'])    
    }
    
    /* 키워드 명칭 변경 , 검색 키워드 && 치환*/
    if (unitOptions.title){
    	var title = unit.options.title;
      title = title.replace(/&&/g, ",").replace(/\|\|/g, ",");
    	title = title.replace($("#subKwd").val(), $("#issKwdDisp").val()); // 키워드 명칭 변경
      $chartDiv.append($("<h3></h3>").text(title));
    }

    // var $dualDiv = $("<div></div>").css("display", "flex");
    var $dualDiv = $("<div></div>");
    
    /*
    if (unitOptions.height)
      $dualDiv.css({"height": unit.options.height, "min-height": unit.options.height});
    */

    $chartDiv.append($dualDiv);
 
    for (var i = 0; i < unit.data.length; i++) {
      var subDivClass = unit.options.sub_div_class || "chart";
      var subDivId = ReportRenderer.getUniqueDivId();
      var $subDiv = _multichart.createDiv({"id": subDivId, "class": subDivClass}, {"flex": "0 0 " + unitOptions.flex[i] + "%"});

      if (unitOptions['height']) {
        var height = unit.options.title ? unitOptions['height'] - 30 : unitOptions['height'];
        $subDiv.css('min-height', height);
      }

      $dualDiv.append($subDiv);

      var sub_unit = unit.data[i];

      ReportRenderer.renderUnit($subDiv, sub_unit, with_chart_area = false);
    }

    return $chartDiv;
  },
  
  createDiv : function(attrOptions, cssOptions) {
    var setting_attr = function (div, options) {
      Object.keys(options).forEach(function(name) {
        $div.attr(name, options[name]);
      });
    };

    var setting_css = function (div, options) {
      Object.keys(options).forEach(function(name) {
        $div.css(name, options[name]);
      });
    };

    $div = $('<div></div>')

    setting_attr($div, attrOptions)
    setting_css($div, cssOptions)
    
    return $div                     
  },
};

UnitRendererFactory.add("multichart", _multichart.render);
UnitRendererFactory.addExample("multichart", _multichart.example);