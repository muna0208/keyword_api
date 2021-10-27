var _piechart = {
  example : [
    {
      name: "예제1",
      description: "일반 파이차트",
      sample: {
        "type": "piechart",
        "visible": true,
        "id": "test.chart1.left",
        "data": [
          {"rate": 0.25720876585928487, "label": "전라북도"},
          {"rate": 0.7427912341407151, "label": "타지역"}
        ],
        "options": {
          "xlsx": true,
          "name": "label", 
          "value": "rate", 
          "title": "방문객 비율",
          "legend_position": "right"
        }
      }
    },
    {
      name: "예제2",
      description: "긍부정 파이차트",
      sample: {
        "type": "piechart",
        "visible": true,
        "id": "test.chart1.left",
        "data": [
          {"rate": 0.65, "label": "긍정"},
          {"rate": 0.27, "label": "부정"},
          {"rate": 0.08, "label": "중립"}
        ],
        "options": {
          "xlsx": true,
          "name": "label", 
          "value": "rate", 
          "title": "감성 분포"
        }
      }
    }
  ],

  defaultOption : {
    "title": null,
    "xlsx": true,
    "type": null,
    "name": "name",
    "value": "value",
    "colors": RenderUtil.color_table_light,
    "label_radius": 20,
    "min_radius": 80,
    "angle": 0,
    "label_text": null,
    "show_legend": true,
    "legend_value": "[[percents]]%",
    "legend_position": "bottom",
    "precision": 0,
    "percent_precision": 2,
    "color_table_name": null,
    "hide_labels_percent": 0, // 이 값 이하의 %에 대해서는 label 표시 안 함
    "height": 0 // 강제 조정 안 함    
  },
  colorMap : {"긍정":"#67b7dc", "부정":"#cc4748", "중립":"#a9a9a9"},

  validateData : function(unit) {
    var options = unit.options;
    
    if ((unit.data == null) || (unit.options == null)) {
      console.error("unit.data or unit.options is null. : " + unit.id);
      return false;
    }
    
    // 누락된 option을 default 값으로 대체
    Object.keys(_piechart.defaultOption).forEach(function(name) {
      if (!options.hasOwnProperty(name)) {
        unit.options[name] = _piechart.defaultOption[name];
      }
    });

    if (options.color_table_name && RenderUtil.hasOwnProperty(options.color_table_name)) 
      unit.options.colors = RenderUtil[options.color_table_name];

    return true;
  },

  addSentimentData : function(unit) {
    unit.data.forEach(function(e) {
      e.color = _piechart.colorMap[e.label];
    });
  },  
  
  testSentiment : function(unit) {
    if (unit.data.length != 3) {
      return false;
    }
    
    if (unit.data[0][unit.options.name] != "긍정"
      || unit.data[1][unit.options.name] != "부정"
      || unit.data[2][unit.options.name] != "중립") {
      return false;
    }

    //console.log("긍부정 파이 차트로 평가함 : " + JSON.stringify(unit, null, 2));
    return true;
  },
  
  render : function($dom, unit, with_chart_area) {
	  if( with_chart_area == undefined || with_chart_area == null) with_chart_area = true;
    if (with_chart_area) {
      var $chartDiv = $("<div class=\"chartArea\"></div>");
      if (unit.options.height)
        $chartDiv.css({"height": unit.options.height, "min-height": unit.options.height});
      $dom.append($chartDiv);
    } else {
      var $chartDiv = $dom;
    }

    if (_piechart.validateData(unit) == false) {
      $dom.append("piechart 데이터가 올바르지 않습니다. <br /><pre>" + JSON.stringify(unit, null, 2) + "</pre>");
      return;
    }

    var chartDivId = ReportRenderer.getUniqueDivId();
    var $innerDiv = $("<div id=\"" + chartDivId + "\" class=\"chart\"></div>");
    if (unit.options.height) 
        $innerDiv.css({"height": unit.options.height - 30, "min-height": unit.options.height - 30});
    $chartDiv.append($innerDiv);

    var colorField = null;
    if ((unit.options["type"] == "pos_neg") || (_piechart.testSentiment(unit))) {
      _piechart.addSentimentData(unit);
      colorField = "color";
    }
    else if (unit.options["color_field"])
      colorField = unit.options["color_field"];   

    var data;

    // etc_percents 만큼은 기타로 묶어서 표현
    if (unit.options.etc_percents) {
      var sorted_data = unit.data.sort(function(a, b) { return a[unit.options.value] > b[unit.options.value]; });
      data = new Array();
      var total = sorted_data.reduce(function (total, d) { return total + d[unit.options.value]; }, 0);
      var sub_total = 0;
      for (var i = 0; i < sorted_data.length; i++) {
        if (sub_total + sorted_data[i][unit.options.value] + total * unit.options.etc_percents / 100.0 >= total)
          break;
        sub_total += sorted_data[i][unit.options.value];
        data.push(sorted_data[i]);
      }
      if (i < sorted_data.length - 1) {
        var etc_item = {}
        etc_item[unit.options.name] = "기타";
        etc_item[unit.options.value] = total - sub_total;
        data.push(etc_item);        
      }
      else data = unit.data;
    }
    else data = unit.data;
    
    var chart = AmCharts.makeChart(chartDivId,
      {
        "type" : "pie",
        "fontFamily": "NanumBarunGothic",
        "fontSize": 12,
        "percentPrecision": unit.options.percent_precision,
        "precision": unit.options.precision,
        "colors" : unit.options.colors,
        "balloonText" : "[[title]]<br><span style='font-size:14px'><b>[[percents]]%</b></span>",
        "innerRadius" : 0,
        "labelRadius" : unit.options.label_radius,
        "labelText" : unit.options.label_text || "[[percents]]%",
        "hideLabelsPercent": unit.options.hide_labels_percent,
        "minRadius" : unit.options.min_radius,
        "angle": unit.options.angle,
        "outlineAlpha" : 1,
        "pullOutOnlyOne" : true,
        "startDuration" : 0,
        "titleField" : unit.options.name,
        "valueField" : unit.options.value,
        "accessibleLabel" : "[[percents]]%",
        "allLabels" : [],
        "balloon" : {},
        "legend" : {
          "enabled" : unit.options.show_legend,
          "align" : "center",
          "markerType" : "circle",
          "position" : unit.options.legend_position,
          "valueText" : unit.options.legend_value
        },
        "titles" : unit.options.title ? [ {
          "id" : "Title-1",
          "size" : 16,
          "text" : unit.options.title
        } ] : undefined,
        "colorField" : colorField,
        "dataProvider" : data
      });

    return $chartDiv;
  }
};
UnitRendererFactory.add("piechart", _piechart.render);
UnitRendererFactory.addExample("piechart", _piechart.example);