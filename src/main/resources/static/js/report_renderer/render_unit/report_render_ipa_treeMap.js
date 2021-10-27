var _isk1 = {
    example: [
        {
            "name": "예제1",
            "description": "예제1 설명",
            "sample":{
                "visible": true,
                "type": "isk1",
                "id": "test.chart",
                "options": {
                    "xlsx": false
                },
                "data":[
	            	{
	                    "name": "학교 폭력 처벌", "value": 1677
	                  },
	                  {
	                    "name": "미얀마 군부", "value": 1208
	                  },
	                  {
	                    "name": "경기지사", "value": 1034
	                  },
	                  {
	                    "name": "공무원 부동산 투기", "value": 548
	                  },
	                  {
	                    "name": "이라크 방문", "value": 421
	                  },
	                  {
	                    "name": "램지어 파면위기", "value": 316
	                  },
	                  {
	                    "name": "스태그플레이션 전조", "value": 213
	                  },
	                  {
	                    "name": "대기업 채용", "value": 190
	                  },
	                  {
	                    "name": "방위비 협상 하루", "value": 125
	                  },
	                  {
	                    "name": "투기방지법", "value": 56
	                  }
	              ]
            }
        }
    ],


    DEFAULT_OPTIONS :  {
        "xlsx": false
    },

    render : function($dom, unit, with_chart_area) {
    	with_chart_area = false;
      am4core.options.commercialLicense = true; // license를 가지고 있음

        if (with_chart_area) {
          var $chartDiv = $("<div class=\"chartArea\"></div>");
          if (unit.options.height) 
            $chartDiv.css({"height": unit.options.height, "min-height": unit.options.height});
        } else {
          var $chartDiv = $dom;
        }
        
        /* 차트 제목
        $dom.append($chartDiv);
        if (unit.options['title']) {
          $titleDiv = $('<h3>' + unit.options['title'] + '</h3>');
          $chartDiv.append($titleDiv)
        }
        */
    
        var chartDivId = ReportRenderer.getUniqueDivId();
        var imgHtml = "<img src=\""+ com.help.url("/assets/aireport/images/ajax_loading_image.gif") + "\"</img>";
        var $loadingDiv = $("<div id='isk1Loading' style='display:none;'><div class='loading'>"+imgHtml+"</div><div class='loadingBox'></div></div>");
        $chartDiv.append($loadingDiv);
        
        var $innerDiv = $("<div id=\"" + chartDivId + "\" class=\"chart\"></div>");
        $innerDiv.css({"cursor": "pointer"});

        if (unit.options.height)
          $innerDiv.css({"height": unit.options.height - 30, "min-height": unit.options.height - 30});
        $chartDiv.append($innerDiv);
    
        var chart = _isk1.renderIsk1(chartDivId, unit);
    
        return $chartDiv;
      },
    
      renderIsk1 : function(chartDivId, unit) {
        var data = unit.data;
        var options = unit.options;

        var chart = am4core.create(chartDivId, am4charts.TreeMap);
        chart.data = data;
        chart.colors.step = 2;
        chart.zoomable = false;

        /* Define data fields */
        chart.dataFields.value = "value";
        chart.dataFields.name = "name";

        var series = chart.seriesTemplates.create("0");
        series.tooltip.dy = -15;
        series.tooltip.pointerOrientation = "vertical";
        
        var series_column = series.columns.template;
        series_column.column.cornerRadius(10, 10, 10, 10);
        series_column.fillOpacity = 0.8;
        series_column.stroke = am4core.color("#fff");
        series_column.strokeWidth = 5;
        series_column.strokeOpacity = 1;
        series_column.tooltipText = "{name}: {value}";

        var series_bullet = series.bullets.push(new am4charts.LabelBullet());
        series_bullet.locationY = 0.5;
        series_bullet.locationX = 0.5;
        series_bullet.label.text = "{name}";
        series_bullet.label.fill = am4core.color("#fff");
        
        series.columns.template.events.on('hit', clickIssueKeyword, this);
      },
};

UnitRendererFactory.add("isk1", _isk1.render);
UnitRendererFactory.addExample("isk1", _isk1.example);