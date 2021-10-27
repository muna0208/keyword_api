var ComponentSettingRenderer = {
    layoutTreeData: {}, // 레이아웃 트리 데이터
    curCompId: "",
    curNode: "",
    curClientY: 0, // 디버깅용? 세팅만 하고 쓰는 곳이 없음

    $layout: null, // 레이아웃 트리를 만들어넣을 곳
    $viewer: null, // 컴토넌트의 렌더링 결과를 만들어넣을 곳

    render: function (renderingData) {
        if (ComponentSettingRenderer.$layout == null) {
            console.log("layout div 영역을 지정하지 않았습니다.");
            ComponentSettingRenderer.$layout = $("#layout");
        }
        if (ComponentSettingRenderer.$viewer == null) {
            console.log("viewer div 영역을 지정하지 않았습니다.");
            ComponentSettingRenderer.$viewer = $("#viewer");
        }

        ComponentSettingRenderer.layoutRender(renderingData);
        ComponentSettingRenderer.viewerRender(renderingData);
        ComponentSettingRenderer.configRender(renderingData);
    },

    getNodeById : function (tree, id) {
        if (tree == null)
            return {};
        if (tree.id == id)
            return tree;
        for (var i = 0; i < tree.children.length; i++) {
            var child = tree.children[i];
            if (child.id == id)
                return child;
            if (child.children != null && child.children.length > 0) {
                var result = ComponentSettingRenderer.getNodeById(child, id);
                if (result != undefined && result.visible != undefined)
                    return result;
            }
        }
    },

    getLayoutErrorMsg: function(layoutNode) {
        var msg = "";
/*        for (var [key, value] of Object.entries(layoutNode.errors)) {
            var errorType = key;
            var errorMsgs = value;

            msg += `오류유형 : ${errorType}, 내용 : ${errorMsgs.join()}\n`;
        }*/
        msg = layoutNode.errors;

        return msg;
    },

    transformLayoutData: function (layout, node, treeId, index) {
        if (layout.children == null) {
            return node;
        }

        if (layout.processing)
            node.text = "(R)" + layout.title;
        else node.text = layout.title;

        if (layout.errors != null) {
            var errorMsg = this.getLayoutErrorMsg(layout);
            if (errorMsg != "") {
//                node.text = `<span class='glyphicon glyphicon-exclamation-sign' aria-hidden='true' title='${errorMsg}'></span><span title='${errorMsg}'>${node.text}</span>`;
                node.text = "<span class='glyphicon glyphicon-exclamation-sign' aria-hidden='true' title='${errorMsg}'></span><span title='${errorMsg}'>${node.text}</span>";
            }
        }

        if (node.id == undefined) {
            node.id = "";
        }

        node.id = treeId + "_" + index;
        node.realId = layout.component_id;
        node.visible = layout.visible;
        node.processing = layout.processing;

        var selected = false;
        if (layout.component_id == ComponentSettingRenderer.curCompId) {
            selected = true;
            ComponentSettingRenderer.curNode = node.id;
        }
        node.state = {
            checked: layout.visible,
            opened: true,
            selected: selected
        };
        treeId = node.id;
        var children = layout.children;
        if (children == undefined || children.length == 0) {
            node.type = "terminal";
            node.icon = false;
        }
        for (var i = 0; i < children.length; i++) {
            var child = children[i];
            if (node.children == null) {
                node.children = [];
            }
            node.children.push({});
            ComponentSettingRenderer.transformLayoutData(child, node.children[node.children.length - 1], treeId, i);
        }
    },

    drawLayout: function (treeData) {
        var $div = ComponentSettingRenderer.$layout;
        $div.jstree('destroy');

        $div.jstree({
            'core': {
                'data': [treeData],
                check_callback: true
            },
            'checkbox': {
                three_state: false,
                cascade: 'down',
                keep_selected_style: false,
                tie_selection: false,
                override_ui: false,
                indeterminate: true
            },
            'plugins': ["checkbox"]
        });

        $div.off("click.jstreeNode", ".jstree-anchor:not(.jstree-checkbox)");
        $div.on("click.jstreeNode", ".jstree-anchor:not(.jstree-checkbox)",
            function (e) {
                e.stopImmediatePropagation();
                e.stopPropagation();
                e.preventDefault();
                var id = $div.jstree(true).get_node($(this)).id;
                var node = ComponentSettingRenderer.getNodeById(ComponentSettingRenderer.layoutTreeData, id);
                ComponentSettingRenderer.curNode = id;
                ComponentSettingRenderer.curCompId = node.realId;
                ComponentSettingRenderer.curClientY = $(e.target).offset().top;

                if (node.processing) {
                    alert("데이터 생성 작업이 완료되지 않은 컴포넌트는 수정할 수 없습니다.");
                    return;
                }

                $("#hd_title").html(node.text);

                ComponentSettingRenderer.curCompId = node.realId;

                // 컴포넌트 로딩 후 화면에 렌더링
                ComponentSettingRenderer.$viewer.empty();

                var componentId = node.realId;
                ReportAPI.getReportComponent(reportId, componentId,function (response) {
                    if (!response.success) {
                        displayApiErrorMessage("보고서 컴포넌트를 가져오지 못했습니다.", response);
                        return false;
                    }

                    var reportData = response.data;

                    ComponentSettingRenderer.viewerRender(reportData);
                    ComponentSettingRenderer.configRender(reportData);
                });
                $(".jstree-anchor").removeClass("highlightNode")
                $(this).addClass("highlightNode")
                return true;
            });
        $div.on("click.jstree.jstreeCheckbox", ".jstree-checkbox",
            function (e) {
                e.stopPropagation();
                e.preventDefault();
                var id = $div.jstree(true).get_node($(this)).id;
                var node = ComponentSettingRenderer.getNodeById(
                    ComponentSettingRenderer.layoutTreeData, id);
                if (node.processing) {
                    alert("데이터 생성 작업이 완료되지 않은 컴포넌트는 수정할 수 없습니다.");
                    return;
                }

                if ($div.jstree(true).get_node($(this)).state.checked) {
                    // 컴포넌트 숨기기 호출
                    ReportAPI.hideComponent(reportId, node.realId,function (response) {
                        if (!response.success) {
                            alert("컴포넌트 상태 변경에 실패하였습니다.");
                            return false;
                        }

                        $div.jstree('uncheck_node', id);
                    });
                } else {
                    // 컴포넌트 보이기 호출
                    ReportAPI.showComponent(reportId, node.realId,function (response) {
                        if (!response.success) {
                            alert("컴포넌트 상태 변경에 실패하였습니다.");
                            return false;
                        }

                        $div.jstree('check_node', id);
                    });
                }
                return false;
            });

        $div.bind('loaded.jstree', function (e, data) {
            var $div = ComponentSettingRenderer.$layout;
            data.instance.get_container().find('li')
                .each(
                    function (i) {
                        var id = $div.jstree(true).get_node(
                            $(this)).id;
                        if (ComponentSettingRenderer.getNodeById(ComponentSettingRenderer.layoutTreeData,
                            id).visible == false) {
                            $div.jstree('uncheck_node', id);
                        }
                    });
            e.stopPropagation();
            e.preventDefault();
            // scroll to element
            if (ComponentSettingRenderer.curCompId != "") {

                var scrollTo = $("#" + ComponentSettingRenderer.getNodeById(ComponentSettingRenderer.layoutTreeData, ComponentSettingRenderer.curNode).id);
                var container = ComponentSettingRenderer.$layout.parent();
                container.scrollTop(
                    scrollTo.offset().top - container.offset().top
                );
            }

            var selected = $div.jstree(true).get_node(ComponentSettingRenderer.curNode);
            $(".jstree-anchor", $div).removeClass("highlightNode");
            if (selected)
                $("#" + ComponentSettingRenderer.curNode + " > .jstree-anchor", $div).addClass("highlightNode");
            else $(".jstree-anchor").eq(0).addClass("highlightNode");

            return false;
        });
    },

    layoutRender: function (renderingData) {
        var layoutData = renderingData.layout;
        if (!layoutData) {
            console.error("레이아웃 데이터가 없습니다. report = " + JSON.stringify(renderingData));
        }

        var component = renderingData.component;
        if (component != null && component.component_id != null) {
            ComponentSettingRenderer.curCompId = component.component_id;
        } else {
            ComponentSettingRenderer.curCompId = layoutData.component_id;
        }

        var treeData = ComponentSettingRenderer.layoutTreeData = {};
        ComponentSettingRenderer.transformLayoutData(layoutData, treeData, "tree_0", 0);

        ComponentSettingRenderer.drawLayout(treeData);
    },

    viewerRender: function (report) {
        var issKwd = $("#issKwd").val();
    	var issKwdDisp = $("#issKwdDisp").val();
    	var subKwd = $("#subKwd").val();
    	
        var $targetDOM = ComponentSettingRenderer.$viewer;

        $targetDOM.empty();
        var component = report.component;
        if (component == null
            || component.rendering_data == null
            || component.rendering_data.length <= 0) {
            //console.error("렌더링 데이터가 없습니다. report = ");
            $targetDOM.html("<div>렌더링 데이터가 없습니다.</div>");
            return;
        }

        var renderingData = component.rendering_data;
        var domStack = [];
        var $currDOM = $targetDOM;
        var unused_html = "";
        var noDataChk = true;

        for (var i = 0; i < renderingData.length; i++) {
            var unit = renderingData[i];
            if (!unit.visible) {
                continue;
            }

            /*renderData*/
            if (unit.type != "text") {
                if (unused_html != "") {
                    $currDOM.append(unused_html);
                    unused_html = "";
                }
                ReportRenderer.renderUnit($currDOM, unit);
                noDataChk = false;
                continue;
            }
            
            /*나머지*/
            var html = unit.data;
            if (unused_html != "") {
                if (unit.data.substring(0, 4) == "<div") {
                    $currDOM.append(unused_html);
                    unused_html = "";
                } else if (unit.data == "</div>") {
                    $currDOM.append(unused_html);
                    unused_html = "";
                }
            }

            // component 제목 html
            if (html.substring(0, 4) == "<div") {
                if (html.indexOf("</div>") < 0) {
                    domStack.push($currDOM);
                    var $parentDOM = $currDOM;
                    
                    if( html.indexOf("이슈키워드") > -1 ){
                    	html = "<div class='section'><h3>이슈키워드 &nbsp; <span id='selectedKeyword' style='color:#85c5e3;'></span></h3>"
//                        	html = html.replace("이슈키워드", "이슈키워드 &nbsp; <span id='selectedKeyword' style='color:#85c5e3;'></span>");
                    		
                    }else if( html.indexOf("원문 분석") > -1 ){
                    	html = html.replace(/h4/g, "h3");
                    	
                    }

                    html = html.replace(/&&/g, ",").replace(/\|\|/g, ",").replace(subKwd, issKwdDisp); // 검색 키워드 && || 치환, 키워드 명칭 변경
                    $currDOM = $(html);

                    $parentDOM.append($currDOM);
                } else $currDOM.append(html);
                
            } else if (html == "</div>") {
            	if( noDataChk ){
            		// var noDataHtml = "<div class='align_center' style='margin-top:100px;'><img src='/images/nodata.png'></img></div>";
                    var noDataHtml = "<div class='align_center' style='margin-top:100px;'></div>";
            		$currDOM = $(noDataHtml);
            		$parentDOM.append($currDOM);
            	}
                $currDOM = domStack.pop();
                if ($currDOM == null) {
                    console.error("div 구조가 맞지않음.");
                    $currDOM = $targetDOM;
                }

           	// component 내용 html
            } else {
                // 아닌 경우 unused_html에 추가함
                html = html.replace(/&&/g, ",").replace(/\|\|/g, ",").replace(subKwd, issKwdDisp); // 검색 키워드 && || 치환, 키워드 명칭 변경
                unused_html += html;
            }
        }
        
        if (unused_html != "")
            $currDOM.append(unused_html);
    },


    // config 관련 처리 : 기존의 일반 설정의 경우에는 ReportForm 으로 처리하고,
    // 공통 설정과 하위 컴퍼넌트 설정은 별도의 로직으로 태운다.
    configs : null,
    clearConfig : function() {
        this.configs = null;

        ReportForm.clearRenderForm();
        CommonConfigForm.clear();
        ChildrenConfigForm.clear();
    },

    configRender : function (report) {
        var csr = ComponentSettingRenderer;

        var component = report.component;
        var configs = csr.configs = component.configs;

        var commonConfig = null;
        var childrenConfig = null;
        var normalConfigs = [];

        for (var i = 0; i < configs.length; ++i) {
            var config = configs[i];
            switch (config.type) {
                case "common":
                    commonConfig = config;
                    break;
                case "children":
                    childrenConfig = config;
                    break;
                default:
                    normalConfigs.push(config);
                    break;
            }
        }

        ReportForm.renderConfigs(normalConfigs, undefined);
        CommonConfigForm.init(commonConfig, $("#commonConfigTab div.common-setting-wrap"), $("#commonConfigModal"));
        ChildrenConfigForm.init(childrenConfig);

        $("a[href='#configTab']").click();
    },

    getConfigData : function () {
        var configs = ReportForm.collectConfigs();

        if (CommonConfigForm._config != null) {
            if (CommonConfigForm.validateConfigValue() == true) {
                configs[CommonConfigForm._config.name] = CommonConfigForm.getConfigValue();
            } else {
                return null;
            }

        }
        if (ChildrenConfigForm._config != null) {
            configs[ChildrenConfigForm._config.name] = ChildrenConfigForm.getConfigValue();

        }
        return configs;
    }
};
