var ReportRenderer = {
    _id: 0,

    getUniqueDivId: function () {
        return "_report_div_" + ++this._id;
    },

    getData: function (reportId, callback, errorCallback) {
        if (errorCallback == null) {
            errorCallback = function () {
                alert("API 호출 오류");
            }
        }
        $.ajax({
            method: "GET",
            url: "/api/report/" + reportId,
            contentType: "application/json",
            success: callback,
            error: errorCallback
        });
    },

    renderCover: function ($dom, reportData, coverInfo) {
        var $cover = $("<div class=cover></div>");
        $cover.css("background", "url(/api/report/" + reportData.report_id + "/image) center no-repeat");
        $cover.css("background-size", "cover");

        $dom.append($cover)
        var $head = $("<h1></h1>")
        var $title = $("<span class=\"keyword\">" + coverInfo.title + "</span>")
        var $subtitle = $("<span class=\"title\">" + coverInfo.subtitle + "</span>")
        $head.append($title)
        $head.append("<br>")
        $head.append($subtitle)
        $cover.append($head)

        var $description = $("<ul class=description></ul>");
        $cover.append($description)
        $.each(coverInfo.info, function (i, v) {
            var $li = $("<li><span>" + v.name + ":" + v.value + "</span></li>")
            $description.append($li)
        })
    },

    renderReport: function ($targetDOM, report) {
        if (report == null || report.all_rendering_data == null ||
            (Object.prototype.toString.call(report.all_rendering_data) === Object.prototype.toString.call([])) == false ||
            report.all_rendering_data.length <= 0) {
            console.error("렌더링 데이터가 없습니다. report = " + JSON.stringify(report));
        }

        var renderingData = report.all_rendering_data;

        var domStack = [];
        var $currDOM = $targetDOM;
        var unused_html = "";

        for (var i = 0; i < renderingData.length; i++) {
            var unit = renderingData[i];
            if (!unit.visible) {
                continue;
            }

            if (unit.type != "text") {
                if (unused_html != "") {
                    $currDOM.append(unused_html);
                    unused_html = "";
                }

                ReportRenderer.renderUnit($currDOM, unit);
                continue;
            }

            var html = unit.data;

            if (unused_html != "") {
                if (unit.data.substring(0, 4) == "<div") {
                    $currDOM.append(unused_html);
                    unused_html = "";
                }
                else if (unit.data == "</div>") {
                    $currDOM.append(unused_html);
                    unused_html = "";
                }
            }

            if (html.substring(0, 4) == "<div") {
                if (html.indexOf("</div>") < 0) {
                    // div 태그가 시작되고, 종결되지 않으면, 다음에 나오는 모든 DOM들을 현재 DIV의 하위에 생성하도록 해야함
                    // console.log("push : "+ JSON.stringify(unit));
                    domStack.push($currDOM);
                    var $parentDOM = $currDOM;
                    $currDOM = $(html);

                    $parentDOM.append($currDOM);
                }
                else $currDOM.append(html);
            } else if (html == "</div>") {
                // div 태그가 끝나면 현재 작업중인 DOM을 parentDOM으로 변경
                // console.log("pop : " + JSON.stringify(unit));
                $currDOM = domStack.pop();
                if ($currDOM == null) {
                    console.error("div 구조가 맞지않음.");
                    $currDOM = $targetDOM;
                }

            } else {
                // 아닌 경우 unused_html에 추가함
                unused_html += html;
            }
        }

        if (unused_html != "")
            $currDOM.append(unused_html);

    },


    renderComponent: function ($targetDOM, renderingData) {

        var domStack = [];
        var $currDOM = $targetDOM;
        var unused_html = "";

        for (var i = 0; i < renderingData.length; i++) {
            var unit = renderingData[i];
            if (!unit.visible) {
                continue;
            }

            if (unit.type != "text") {
                if (unused_html != "") {
                    $currDOM.append(unused_html);
                    unused_html = "";
                }

                ReportRenderer.renderUnit($currDOM, unit);
                continue;
            }

            var html = unit.data;

            if (unused_html != "") {
                if (unit.data.substring(0, 4) == "<div") {
                    $currDOM.append(unused_html);
                    unused_html = "";
                }
                else if (unit.data == "</div>") {
                    $currDOM.append(unused_html);
                    unused_html = "";
                }
            }

            if (html.substring(0, 4) == "<div") {
                if (html.indexOf("</div>") < 0) {
                    // div 태그가 시작되고, 종결되지 않으면, 다음에 나오는 모든 DOM들을 현재 DIV의 하위에 생성하도록 해야함
                    // console.log("push : "+ JSON.stringify(unit));
                    domStack.push($currDOM);
                    var $parentDOM = $currDOM;
                    $currDOM = $(html);

                    $parentDOM.append($currDOM);
                }
                else $currDOM.append(html);
            } else if (html == "</div>") {
                // div 태그가 끝나면 현재 작업중인 DOM을 parentDOM으로 변경
                // console.log("pop : " + JSON.stringify(unit));
                $currDOM = domStack.pop();
                if ($currDOM == null) {
                    console.error("div 구조가 맞지않음.");
                    $currDOM = $targetDOM;
                }

            } else {
                // 아닌 경우 unused_html에 추가함
                unused_html += html;
            }
        }

        if (unused_html != "")
            $currDOM.append(unused_html);

    },

    renderUnit: function ($dom, unit, with_chart_area) {
    	if( with_chart_area == undefined || with_chart_area == null) with_chart_area = true;
        var renderFunction = UnitRendererFactory.get(unit);
        var $chart = renderFunction($dom, unit, with_chart_area);
        
        if (unit.options.xlsx && $chart) {
//           엑셀 다운로드 버튼
//        	RenderUtil.addUnitsDownloadButton("/api/", $chart, unit, false); // 서비스용
        }
    }
};

var UnitRendererFactory = {
    functionMap: {},
    exampleMap: {},
    renderNames: [],
    exportMap: {},

    getUnitNames: function () {
        return UnitRendererFactory.renderNames
    },

    add: function (unitType, renderFunction) {
        if (renderFunction && typeof renderFunction == "function" && renderFunction.length >= 2) {
            console.log(unitType + ", 렌더러 등록");
            UnitRendererFactory.functionMap[unitType] = renderFunction;

        } else {
            console.log(unitType + ", 렌더러 함수가 올바르지 않음 : " + renderFunction);
        }
    },

    addExample: function (unitType, example) {
        UnitRendererFactory.exampleMap[unitType] = example;
        UnitRendererFactory.renderNames.push(unitType);
    },

    get: function (unit) {
        var renderFunction = UnitRendererFactory.functionMap[unit.type];
        if (renderFunction == null) {
            renderFunction = function ($dom, unit) {
                $dom.append(unit.type + " 렌더러가 없습니다. <br />");
                $dom.append("<pre>" + JSON.stringify(unit.data, null, 2) + "</pre>");
            }
            UnitRendererFactory.functionMap[unit.type] = renderFunction;
        }
        return renderFunction;
    },

    getExample: function (type) {
        var exampleFunction = UnitRendererFactory.exampleMap[type];
        return exampleFunction;
    }
};