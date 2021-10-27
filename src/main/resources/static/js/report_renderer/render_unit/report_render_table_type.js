/*
* 전체 data 형식: 2차원 배열
[
    [ 개별요소1, 개별요소2, ... ],
    [ 개별요소1, 개별요소2, ... ],
     ...
]
 
* 배열의 개별 요소
- 값  ---> 일반적인 경우
- { "value": ..., "attrs": { ... } }  ---> 특수한 지정이 필요한 경우
 
* 예) colspan/rowspan을 지정하고 싶은 경우
 
[
    [ "v1", "v2", "v3", "v4", { "value": "v5+v10", "attrs": { "rowspan": 2 } } ],
    [ "v6", { "value": "v7+v8", "attrs": { "colspan": 2 } }, "v9" ]
]
 
* options 형식
{
    "테이블 속성": "속성값", # 테이블에 지정하고 싶은 HTML 속성(예: class, style 등)
    "headers": [ [ 개별요소1, 개별요소2, ... ], ... ], # 테이블 헤더 정의. data와 동일한 방식의 2차원 배열
}


smaple data
{
  "type" : "table",
  "visible" : "true",
  "options" : {
    "headers" : [
      ["header1", "header2", "header3"]
    ]
  },
  "data" : [
    [{"value": "value1", "attrs" : { "rowspan": 2 }}, "value2", "value3"],
    ["value5", "value6"],
    ["value7", "value8", "value9"]
  ]

}
*/

var _table = {
  example: [
    {
      name: "예제1",
      description: "감성 연관어 변화",
      sample: {
        "type": "table",
        "visible": true,
        "id": "test.pos_table",
        "data": [
          ["1", "좋다", "좋다", "좋다", "좋다"],
          [
            "2",
            "이쁘다",
            {"class": "pointColorPOS", "value": "즐기다"},
            {"class": "pointColorPOS", "value": "좋아하다"},
            "이쁘다"
          ],
          ["3", "예쁘다", "좋아하다", "즐기다", "예쁘다"],
          [
            "4",
            "즐기다",
            {"class": "pointColorNEG", "value": "신나다"},
            {"class": "pointColorPOS", "value": "좋은"},
            {"class": "pointColorPOS", "value": "아름다운"}
          ],
          [
            "5",
            "좋아하다",
            "좋은",
            {"class": "pointColorPOS", "value": "맛있다"},
            "즐기다"
          ],
          [
            "6",
            "맛있다",
            {"class": "pointColorPOS", "value": "행복하다"},
            "예쁘다",
            {"class": "pointColorPOS", "value": "예쁜"}
          ],
          [
            "7",
            {"class": "pointColorPOS", "value": "아름답다"},
            {"class": "pointColorNEG", "value": "잘하다"},
            {"class": "pointColorNEG", "value": "재밌다"},
            "좋아하다"
          ],
          [
            "8",
            {"class": "pointColorNEG", "value": "이쁜"},
            "예쁘다",
            {"class": "pointColorPOS", "value": "귀엽다"},
            "행복하다"
          ],
          [
            "9",
            "아름다운",
            "귀엽다",
            {"class": "pointColorNEG", "value": "사랑하다"},
            "좋은"
          ],
          [
            "10",
            "예쁜",
            "맛있다",
            {"class": "pointColorNEG", "value": "꿈꾸다"},
            "아름답다"
          ]
        ],
        "options": {
          "xlsx": true,
          "headers": [
            ["순위", "진해군항제", "서울재즈페스티벌", "전주국제영화제", "울산대공원장미축제"]
          ],
          "title": "주요 축제/이벤트의 긍정 감성어"
        }
      }
    },
    {
      name: "예제2",
      description: "여행테마 이슈시점별 주요 키워드",
      sample: {
        "type": "table",
        "visible": true,
        "id": "test",
        "data": [
          [
            "<span class=\"color1\">▶</span> 가족여행",
            "2017년 5월",
            "제주도, 가족, 힐링, 바다, 육아, 황금연휴, 어린이날"
          ],
          [
            "<span class=\"color2\">▶</span> 힐링여행",
            "2016년 9월",
            "제주도, 휴가, 바다, 당일치기, 강원도, 추억팔이, 가평"
          ],
          [
            "<span class=\"color3\">▶</span> 불꽃여행",
            "2017년 4월",
            "벚꽃, 축제, 봄, 주말, 가족, 튤립, 봄꽃축제, 정원, 유채꽃"
          ],
          [
            "<span class=\"color4\">▶</span> 기차여행",
            "2017년 1월",
            "사진, 친구, 부산, 호텔, 서울, KTX, 맥주, 곡성 "
          ],
          [
            "<span class=\"color5\">▶</span> 체험여행",
            "2017년 4월",
            "가족, 사진, 아이, 문화, 축제, 지역, 행사, 박물관"
          ]
        ],
        "options": {
          "xlsx": true,
          "headers": [
            [
              "관심 키워드",
              "이슈 지점",
              "이슈 키워드"
            ]
          ],
          "title": "여행테마 이슈시점별 주요 키워드"
        }
      }
    },
    {
      name: "예제3",
      description: "이슈 원문",
      sample: {
        "type": "table",
        "id": "test.example_doc_table",
        "visible": true,
        "data": [
          [
            {"rowspan": 1, "class": "keyword", "value": "4월 5주<br>로스트인파리"},
            "<p class='originTitle'>\n전주국제영화제 상영작 `로스트 인 파리` 관람 </p><p class='originContent'>4월 27일 로스트 인 파리 7명 예매 5월 3일 로스트 인 파리 현장 발권 뒤 기념 사진 참여한 친구들:양루비 김수연 정다희 한채영 유예진 김서진 장유리 입장!!\n 주연 배우 인사 뒤 상영</p><p class='originUrl iconBlog'>http://blog.naver.com/jur1206/220997972390</p>"
          ],
          [
            {"rowspan": 2, "class": "keyword", "value": "4월 5주<br>치즈"},
            "<p class='originTitle'>\n명랑 쌀 핫도그 리뷰 4편 - 노랑 치즈 용암이 흘러넘친다!! , 체다치즈 핫도그 -</p><p class='originContent'>명랑 쌀 핫도그 리뷰 4편 - 노랑 치즈 용암이 흘러넘친다!!\n , 체다치즈 핫도그 - 이번주 화요일에도 아직 업로드하지 않은 모짜렐라 녀석들과 체다치즈 녀석을 먹어야 되는데</p><p class='originUrl iconBlog'>http://blog.naver.com/ykh654/220998694118</p>"
          ],
          ["<p class='originTitle'>내일 소풍~~ 김밥에 치즈 넣어도되죠?</p><p class='originContent'>당연히 치즈김밥으로 싸주려 생각했는데 갑자기 너무 더워서 김밥에 치즈 넣어도 될까 걱정되네요~;;;\n 치즈 괜찮겠죠??</p><p class='originUrl iconComm'>http://cafe.naver.com/ArticleRead.nhn?clubid=21442290&amp;page=3&amp;userDisplay=50&amp;menuid=51&amp;boardtype=L&amp;articleid=1963259&amp;referrerAllArticles=false</p>"],
          [
            {"rowspan": 2, "class": "keyword", "value": "4월 5주<br>강동원"},
            "<p class='originTitle'>외조부 대신, 두 달만에 고개 숙인 강동원의 진심</p><p class='originContent'>[TV리포트=손효정 기자] 배우 강동원이 외증조부 관련 논란에 대해 두 달만에 직접 사과했다. 지난 삼일절을 앞두고, '강동원의 외증조부는 친일파'라는 내용의 게시글이 확산됐다. 두 달이라는 오랜 시간이 걸렸지만, 진심으로 사과를 전한 강동원.</p><p class='originUrl iconBlog'>http://blog.naver.com/pms264/220997918936</p>"
          ],
          ["<p class='originTitle'>pic) 강동원 외증조부 사건 전주국제영화제에서 사과</p><p class='originContent'></p><p class='originUrl iconComm'>http://soccerline.kr/board/13974971?searchType=0&amp;searchText=&amp;categoryDepth01=0&amp;page=8</p>"]
        ],
        "options": {
          "xlsx": true,
          "headers": [
            [
              "이슈키워드",
              {
                "style": {"width": "80%"},
                "value": "예문"
              }
            ]
          ]
        }
      }
    },
    {
      name: "예제4",
      description: "평일/휴일, 요일별 heatmap",
      sample: {
        "type": "table",
        "id": "test.dow_table",
        "visible": true,
        "data": [
          [
            "덕진구", 
            {
              "style": {
                "background-color": "#ff8080",
                "color": "#ffffff"
              },
              "value": "11억2470만원"
            },
            {
              "style": {
                "background-color": "#ff8080",
                "color": "#ffffff",
                "border-right-style": "double",
              },
              "value": "11억2470만원"
            },
            {
              "style": {
                "background-color": "#ff8080",
                "color": "#ffffff"
              },
              "value": "11억2470만원"
            },
            {
              "style": {
                "background-color": "#ff8080",
                "color": "#ffffff"
              },
              "value": "11억2470만원"
            },
            {
              "style": {
                "background-color": "#ff8080",
                "color": "#ffffff"
              },
              "value": "11억2470만원"
            },
            {
              "style": {
                "background-color": "#ff8080",
                "color": "#ffffff"
              },
              "value": "11억2470만원"
            },
            {
              "style": {
                "background-color": "#ff8080",
                "color": "#ffffff"
              },
              "value": "11억2470만원"
            },
            {
              "style": {
                "background-color": "#ff8080",
                "color": "#ffffff"
              },
              "value": "11억2470만원"
            },
            {
              "style": {
                "background-color": "#ff8080",
                "color": "#ffffff"
              },
              "value": "11억2470만원"
            }            
          ]
        ],
        "options": {
          "xlsx": true,
          "headers": [
            [
              "세부지역", 
              "평일", 
              {
                "style": {
                  "border-right-style": "double",
                },
                "value": "휴일"
              },
              "월", 
              "화", 
              "수", 
              "목",
              "금", 
              "토", 
              "일"
            ]
          ]
        }
      }
    },
    {
      name: "예제5",
      description: "colgroup",
      sample: {
        "type": "table",
        "id": "test",
        "visible": true,
        "data": [
          ["상승확률(%)", "43", "48", "44"],
          ["상승종목수(개)", "43", "48", "44"],
          ["하락종목수(개)", "56", "52", "56"]
        ],
        "options": {
          "xlsx": true,
          "headers": [
            ["", "1개월", "3개월", "6개월"]
          ],
          "colgroup": ["22%", "26%", "26%", "26%"]
        }
      }
    },
    {
      name: "예제6",
      description: "div class 변경",
      sample: {
        "type": "table",
        "id": "test",
        "visible": true,
        "data": [
          [
            {
              "align": "left",
              "valign": "middle",
              "style": {"padding-top": "10px"},
              "value": "SK하이닉스(000660) 수요는 부족, 밸류는 부담\n<a href='http://hkconsensus.hankyung.com/apps.analysis/analysis.downpdf?report_idx=518988' class='Link'>http://hkconsensus.hankyung.com/apps.analysis/analysis.downpdf?report_idx=518988</a>",
              "height": "22"
            },
            "미래에셋대우",
            "2019-04-01"
          ],
          [
            {
              "align": "left",
              "valign": "middle",
              "style": {"padding-top": "10px"},
              "value": "SK하이닉스(000660)2분기 이후 점진적 회복 전망\n<a href='http://hkconsensus.hankyung.com/apps.analysis/analysis.downpdf?report_idx=518696' class='Link'>http://hkconsensus.hankyung.com/apps.analysis/analysis.downpdf?report_idx=518696</a>",
              "height": "22"
            },
            "KB증권",
            "2019-03-29"
          ],
          [
            {
              "align": "left",
              "valign": "middle",
              "style": {"padding-top": "10px"},
              "value": "SK하이닉스(000660)예상되는 실적 부진\n<a href='http://hkconsensus.hankyung.com/apps.analysis/analysis.downpdf?report_idx=518431' class='Link'>http://hkconsensus.hankyung.com/apps.analysis/analysis.downpdf?report_idx=518431</a>",
              "height": "22"
            },
            "대신증권",
            "2019-03-27"
          ],
          [
            {
              "align": "left",
              "valign": "middle",
              "style": {"padding-top": "10px"},
              "value": "SK하이닉스(000660)지표는 3분기를 말하고 있다\n<a href='http://hkconsensus.hankyung.com/apps.analysis/analysis.downpdf?report_idx=518422' class='Link'>http://hkconsensus.hankyung.com/apps.analysis/analysis.downpdf?report_idx=518422</a>",
              "height": "22"
            },
            "현대차투자증권",
            "2019-03-27"
          ],
          [
            {
              "align": "left",
              "valign": "middle",
              "style": {"padding-top": "10px"},
              "value": "SK하이닉스(000660)완만하고 점진적인 업황 개선 전망\n<a href='http://hkconsensus.hankyung.com/apps.analysis/analysis.downpdf?report_idx=518048' class='Link'>http://hkconsensus.hankyung.com/apps.analysis/analysis.downpdf?report_idx=518048</a>",
              "height": "22"
            },
            "KTB투자증권",
            "2019-03-25"
          ]
        ],
        "options": {
          "headers": [
            ["제목", "정보제공", "보고서작성일"]
          ],
          "class": "linkTable",
          "div_class": "vsTable",
          "xlsx": true,
          "colgroup": ["70%", "15%", "15%"]
        }
      }
    }
  ],

  render : function($dom, unit) {
    if (unit.options == null)	unit.options = {};
    
    var div_cls = unit.options.div_class ? unit.options.div_class : "table";
    var $div = $("<div></div>").addClass(div_cls);
    $dom.append($div);

    if (unit.options.title) 
      $div.append($("<h3></h3>").text(unit.options.title));

    var options = unit.options;
    var $table = $("<table></table>").css("width", "100%");
    $div.append($table);

    if (options.hasOwnProperty("colgroup")) {
      var $colgroup = $("<colgroup></colgroup>");
      $table.append($colgroup);
      jQuery.each(options.colgroup, function (i, d) {
        var $col = $("<col></col>");
        if (d != null && typeof d === 'object') {
          _table.adjustAttr($col, d);
          if (d.value)
            $col.attr("width", d.value);
        }
        else $col.attr("width", d);
        $colgroup.append($col);
      });
    }
    
    var $thead = $("<thead></thead>");
    $table.append($thead);

    var $tbody = $("<tbody></tbody>");
    $table.append($tbody);

    for (var option in options) {
      if (option == "div_class") 
        continue;
      if (option == "headers") 
        continue;
      if (option == "lines") 
        continue;
      if (option == "colgroup") 
        continue;
      var optionValue = options[option];
      if (option == "div_style")
        $div.css(optionValue);
      else if (option == "style")
        $table.css(optionValue);
      else if (option == "class")
        $table.addClass(optionValue);
      else if (option == "attr") 
        $table.attr(optionValue);
      else $table.attr(option, optionValue);
    }
    
    if (options.headers != null) {
      _table.renderData($thead, options.headers, "th");
    }
    _table.renderData($tbody, unit.data, "td");

    if (options.lines != null) {
      svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      svg.setAttribute("viewBox", "0 0 " + $div.width() + " " + $div.height());
      svg.setAttribute("preserveAspectRatio", "none");

      var $svg = $(svg)
      .css({
        "position": "absolute",
        "display": "inline-block",
        "top": 0,
        "left": 0,
        "width": "100%",
        "height": "100%"
      });
      $div.append($svg);

      _table.renderLine($svg, $tbody, options.lines);
    }

    return $div;
  },

  renderLine : function($svg, $tbody, lines) {
    lines.forEach(function (item) {
      item.cells.forEach(function(to_tr_id, to_td_id) {

        if (item.cells[to_td_id] < 0)
          return;

        var from_td_id = to_td_id - 1;

        while ((from_td_id >= 0) && (item.cells[from_td_id] < 0))
          from_td_id--;

        if (from_td_id < 0)
          return;

        var from_tr_id = item.cells[from_td_id];
        var $g = $(document.createElementNS('http://www.w3.org/2000/svg', 'g'));
        $svg.append($g);

        var from_cell = $tbody.find("tr:eq(" + from_tr_id + ") td:eq(" + (from_td_id) + ")");
        var to_cell = $tbody.find("tr:eq(" + to_tr_id + ") td:eq(" + to_td_id + ")");
        var from_position = from_cell.position();
        var to_position = to_cell.position();

        var x1 = from_position.left + from_cell.width() + parseFloat(from_cell.css("padding-left"));
        var y1 = from_position.top + from_cell.height() / 2.0 + (from_tr_id < to_tr_id ? parseFloat(from_cell.css("padding-top")) : parseFloat(from_cell.css("padding-bottom")));
        var x2 = to_position.left + parseFloat(to_cell.css("padding-right"));
        var y2 = to_position.top + to_cell.height() / 2.0 +  (from_tr_id < to_tr_id ? parseFloat(to_cell.css("padding-bottom")) : parseFloat(to_cell.css("padding-top")));

        var $line = $(document.createElementNS('http://www.w3.org/2000/svg', 'line'))
                      .css({"stroke": item.stroke, "stroke-width": item["stroke-width"]})
                      .attr({"x1": x1, "y1": y1, "x2": x2, "y2": y2});
        $g.append($line);

        var $from_circle = $(document.createElementNS('http://www.w3.org/2000/svg', 'circle'))
                      .css({"stroke": "none", "fill": item.stroke})
                      .attr({"cx": x1, "cy": y1, "r": parseFloat(item["stroke-width"]) * 2 + "px"});
        $g.append($from_circle);

        var $to_circle = $(document.createElementNS('http://www.w3.org/2000/svg', 'circle'))
                      .css({"stroke": "none", "fill": item.stroke})
                      .attr({"cx": x2, "cy": y2, "r": parseFloat(item["stroke-width"]) * 2 + "px"});
        $g.append($to_circle);
      });
    });
  },

  adjustAttr: function($elem, attrs) {
    for (var propertyName in attrs) {
      if (propertyName == "value") continue;
      var propertyValue = attrs[propertyName];
      if(propertyName == "style") {
        for (var cssName in propertyValue) {
          var cssValue = propertyValue[cssName];
          var old_style = $elem.attr('style');
          if (("" + cssValue).endsWith("!important")) {
            if (old_style)
              $elem.attr('style', old_style + "; ${cssName}: ${cssValue}");
            else $elem.attr('style', "${cssName}: ${cssValue}");
          } 
          else $elem.css(cssName, cssValue);
        }
      } else if (propertyName == "class") {
        $elem.addClass(propertyValue);
      } else if (propertyName == "attr") {
        $elem.attr(propertyValue);
      } else {
        $elem.attr(propertyName, propertyValue);
      }
    }
  },
  
  renderData : function($table, data, tagName) {
    data.forEach(function(row) {
      var $tr = $("<tr></tr>");
      if (row != null && !Array.isArray(row)) {
        _table.adjustAttr($tr, row);
        row = row.value;
      }

      $table.append($tr);
      
      row.forEach(function(column) {
        if (column != null && typeof column === 'object') {
          var $th = $("<" + tagName + ">" + column.value + "</" + tagName + ">");
          $tr.append($th);
          //$th.css("text-align", "center");
          
          _table.adjustAttr($th, column);        
        } else {
          var $th = $("<" + tagName + ">" + column + "</" + tagName + ">");
          //$th.css("text-align", "center");
          $tr.append($th);
        } 
      });
    });
  }
};

UnitRendererFactory.add("table", _table.render);
UnitRendererFactory.addExample("table", _table.example);