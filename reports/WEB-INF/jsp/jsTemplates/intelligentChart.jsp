<%--
  ~ Copyright (C) 2005 - 2009 Jaspersoft Corporation. All rights reserved.
  ~ http://www.jaspersoft.com.
  ~ Licensed under commercial Jaspersoft Subscription License Agreement
  --%>

<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://tiles.apache.org/tags-tiles" prefix="t" %>

<div id="highChartsRepo">
    <div id="chartOptions"></div>
    <ul id="chartMenu" class="menu vertical" style="display:none">
        <li class="leaf" action="chart-types">
        	<p class="wrap">
        		<span class="icon"></span>
        		<spring:message code="ADH_1214_ICHARTS_MENU_ITEM_CHART_TYPES"/>
        	</p>
        </li>
        <li class="leaf" action="chart-format">
        	<p class="wrap">
        		<span class="icon"></span>
                <spring:message code="ADH_1214_ICHARTS_MENU_ITEM_CHART_FORMAT"/>
            </p>
        </li>
    </ul>

    <div id="chartContainer"></div>

    <div id="chartTypeSelector" class="panel dialog overlay data-level-selector moveable centered_horz centered_vert hidden">
        <div class="content">
            <div class="header mover">
                <div class="closeIcon"></div>
                <div class="title"><spring:message code="ADH_1214_ICHARTS_DIALOG_CHART_TYPE_TITLE"/></div>
            </div>
            <div class="body">
                <p class="wrap"><spring:message code="ADH_1214_ICHARTS_CHART_TYPE_GROUP_COLUMN"/></p>
                <div class="row">
                    <div class="cell" tooltiptext="<spring:message code="ADH_1214_ICHARTS_CHART_TYPE_COLUMN"/>" name="column"></div>
                    <div class="cell" tooltiptext="<spring:message code="ADH_1214_ICHARTS_CHART_TYPE_STACKED_COLUMN"/>" name="stacked_column"></div>
                    <div class="cell" tooltiptext="<spring:message code="ADH_1214_ICHARTS_CHART_TYPE_PERCENT_COLUMN"/>"name="percent_column"></div>
                </div>
                <p class="wrap"><spring:message code="ADH_1214_ICHARTS_CHART_TYPE_GROUP_BAR"/></p>
                <div class="row">
                    <div class="cell" tooltiptext="<spring:message code="ADH_1214_ICHARTS_CHART_TYPE_BAR"/>" name="bar"></div>
                    <div class="cell" tooltiptext="<spring:message code="ADH_1214_ICHARTS_CHART_TYPE_STACKED_BAR"/>" name="stacked_bar"></div>
                    <div class="cell" tooltiptext="<spring:message code="ADH_1214_ICHARTS_CHART_TYPE_PERCENT_BAR"/>" name="percent_bar"></div>
                </div>
                <p class="wrap"><spring:message code="ADH_1214_ICHARTS_CHART_TYPE_GROUP_LINE"/></p>
                <div class="row">
                    <div class="cell" tooltiptext="<spring:message code="ADH_1214_ICHARTS_CHART_TYPE_LINE"/>" name="line"></div>
                    <div class="cell" tooltiptext="<spring:message code="ADH_1214_ICHARTS_CHART_TYPE_SPLINE"/>" name="spline"></div>
                </div>
                <p class="wrap"><spring:message code="ADH_1214_ICHARTS_CHART_TYPE_GROUP_TIME_SERIES"/></p>
                <div class="row">
                    <div class="cell" tooltiptext="<spring:message code="ADH_1214_ICHARTS_CHART_TYPE_LINE_TIME_SERIES"/>" name="line_time_series"></div>
                    <div class="cell" tooltiptext="<spring:message code="ADH_1214_ICHARTS_CHART_TYPE_SPLINE_TIME_SERIES"/>" name="spline_time_series"></div>
                    <div class="cell" tooltiptext="<spring:message code="ADH_1214_ICHARTS_CHART_TYPE_AREA_TIME_SERIES"/>" name="area_time_series"></div>
                    <div class="cell" tooltiptext="<spring:message code="ADH_1214_ICHARTS_CHART_TYPE_SPLINE_AREA_TIME_SERIES"/>" name="spline_area_time_series"></div>
                </div>
                <p class="wrap"><spring:message code="ADH_1214_ICHARTS_CHART_TYPE_GROUP_AREA"/></p>
                <div class="row">
                    <div class="cell" tooltiptext="<spring:message code="ADH_1214_ICHARTS_CHART_TYPE_AREA"/>" name="area"></div>
                    <div class="cell" tooltiptext="<spring:message code="ADH_1214_ICHARTS_CHART_TYPE_STACKED_AREA"/>" name="stacked_area"></div>
                    <div class="cell" tooltiptext="<spring:message code="ADH_1214_ICHARTS_CHART_TYPE_PERCENT_AREA"/>" name="percent_area"></div>
                    <div class="cell" tooltiptext="<spring:message code="ADH_1214_ICHARTS_CHART_TYPE_AREA_SPLINE"/>" name="spline_area"></div>
                </div>
                <p class="wrap"><spring:message code="ADH_1214_ICHARTS_CHART_TYPE_GROUP_PIE"/></p>
                <div class="row">
                    <div class="cell" tooltiptext="<spring:message code="ADH_1214_ICHARTS_CHART_TYPE_PIE"/>" name="pie"></div>
                </div>
            </div>
        </div>
    </div>

    <div id="chartFormatDialog" class="panel dialog overlay data-level-selector moveable centered_horz centered_vert hidden">
        <div class="content">
            <div class="header mover">
                <div class="title"><spring:message code="ADH_1214_ICHARTS_CHART_FORMAT_DIALOG_TITLE"/></div>
            </div>
            <div class="body">
                <div class="section">
                    <spring:message code="ADH_1214_ICHARTS_CHART_FORMAT_DIALOG_DATA_OPTIONS"/>
                </div>
                <div class="control checkBox">
                    <input id="showDataPoints" name="showDataPoints" type="checkbox" value="true"/>
                    <label for="showDataPoints"><spring:message code="ADH_1214_ICHARTS_CHART_FORMAT_DIALOG_SHOW_DATA_POINTS"/></label>
                </div>
                <div class="section">
                    <spring:message code="ADH_1214_ICHARTS_CHART_FORMAT_DIALOG_AXIS_OPTIONS"/>
                </div>
                <div class="control checkBox">
                    <input id="showMeasureOnValueAxis" name="showMeasureOnValueAxis" type="checkbox" value="true"/>
                    <label for="showMeasureOnValueAxis"><spring:message code="ADH_1214_ICHARTS_CHART_FORMAT_DIALOG_SHOW_MEASURE_NAME"/></label>
                </div>
                <div class="control">
                    <label for="xAxisStep">
                        <spring:message code="ADH_1214_ICHARTS_CHART_FORMAT_DIALOG_STEP_X_AXIS_LABEL"/>
                        <input id="xAxisStep" name="xAxisStep" type="text"/>
                    </label>
                </div>
                <div class="control">
                    <label for="yAxisStep">
                        <spring:message code="ADH_1214_ICHARTS_CHART_FORMAT_DIALOG_STEP_Y_AXIS_LABEL"/>
                        <input id="yAxisStep" name="yAxisStep" type="text"/>
                    </label>
                </div>
                <div class="control">
                    <label for="xAxisRotation">
                        <spring:message code="ADH_1214_ICHARTS_CHART_FORMAT_DIALOG_ROTATE_X_AXIS_LABEL"/>
                        <input id="xAxisRotation" name="xAxisRotation" type="text"/>
                    </label>
                </div>
                <div class="control">
                    <label for="yAxisRotation">
                        <spring:message code="ADH_1214_ICHARTS_CHART_FORMAT_DIALOG_ROTATE_Y_AXIS_LABEL"/>
                        <input id="yAxisRotation" name="yAxisRotation" type="text"/>
                    </label>
                </div>
            </div>
            <div class="footer">
                <button class="button action primary up saveButton"><span class="wrap"><spring:message code="ADH_1214_ICHARTS_CHART_FORMAT_DIALOG_BUTTON_APPLY"/><span class="icon"></span></span></button>
                <button class="button action up cancelButton"><span class="wrap"><spring:message code="ADH_1214_ICHARTS_CHART_FORMAT_DIALOG_BUTTON_CLOSE"/><span class="icon"></span></span></button>
            </div>
        </div>
    </div>

    <div id="dataLevelSelector" class="panel dialog overlay data-level-selector moveable centered_horz centered_vert hidden">
        <div class="content">
            <div class="header mover">
                <div class="closeIcon"></div>
                <div class="title"><spring:message code="ADH_1214_ICHARTS_DATA_LEVEL_SELECTOR_TITLE"/></div>
            </div>
            <div class="body"></div>
        </div>
    </div>

    <script id="dataLevelSelectorTemplate" type="text/html">
        <tr>
            {{#label}}
            <td class="olap_level_name"><div><div class="olap_level_label">{{name}}</div></div></td>
            {{/label}}
            <td><div class="jrs-slider"></div></td>
        </tr>
    </script>
    <script id="sliderTickTemplate" type="text/html">
        <div class="sliderTick" level-name="{{label}}" style="left:{{width}}%"><div class="tickOverlay"></div></div>
    </script>
    <script id="titleCaptionTemplate" type="text/html">
        <div id="titleCaption" class="highChartsTitle shadow"></div>
    </script>
    <script id="levelSelectorTemplate" type="text/html">
        <table id="{{id}}" cellspacing="10" class="levelSelector" style="display: table;">
            <tbody>
            <tr>
                <td colspan="{{colspan}}" class="select-header">{{name}}</td>
            </tr>
            </tbody>
        </table>
    </script>
</div>

