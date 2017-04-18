/*
 * Copyright (C) 2005 - 2013 Jaspersoft Corporation. All rights reserved.
 * http://www.jaspersoft.com.
 * Licensed under commercial Jaspersoft Subscription License Agreement
 */
////////////////////////////////////////////////////////
//
//  HighChartDataMapper
//
//  Works on the dataset that is wrapped in an AdhocDataProcessor
//
//  Set up to recognize 3 styles of AdhocState data:
//
//    Style 0:
//
//       Measure Axis only.  All grouping on the Measure Axis, no groups on the non-Measure Axis.
//
//
//    Style 1:
//
//       Measure on one Axis.  All groups on the non-Measure Axis.
//
//
//    Style 2:
//
//      'Crosstab Style'  Groups on Measure Axis and groups on non-Measure Axis.
//
//
//
//   The chart renderers for various chart types (column, pie, etc), recognize these Styles
//   and handle them each in chart specific manner.
//
//
//
//   2012-08-01  thorick    created:  this thing actually works !
//
//
///////////////////////////////////////////////////////////

/**
 * Maps data to Highcharts options for specified chart type.
 *
 * @type {Object}
 */
var HighchartsDataMapper = {};

/**
 * This is short alias for HighchartsDataMapper object.
 *
 * @type {Object}
 */
var HDM = HighchartsDataMapper;

_.extend(HDM, {
    SeriesType: {
        COMMON: 0,
        PIE: 1
    },

    chartType: null,
    fullGroupHierarchyNames: true,
    //containerWidth: 0,

    ////////////////////
    //  pie constants
    //

    defaultPiesPerRow: 8,
    maxPieRows: 4,


    categories: [],
    categoryNames: {},
    groupedCategories: false,
    highchartsCategories: [],


    //
    // the highcharts default color palette
    //
    colors: [
                          '#4572A7',
                          '#AA4643',
                          '#89A54E',
                          '#80699B',
                          '#3D96AE',
                          '#DB843D',
                          '#92A8CD',
                          '#A47D7C',
                          '#B5CA92'
                        ],
    //
    //  track measure boundaries
    //
    measureMin: null,
    measureMax: null,

    labelFormatsMap: {
        "day": {
            millisecond: '%H:%M:%S.%L',
            second: '%H:%M:%S',
            minute: '%H:%M',
            hour: '%H:%M',
            day: '%b %e, %Y',
            week: '%b %e, %Y',
            month: '%b %e, %Y',
            year: '%b %e, %Y'
        },

        "minute_by_day": {
            millisecond: '%b %e, %Y %H:%M:%S.%L',
            second: '%b %e, %Y %H:%M:%S',
            minute: '%b %e, %Y %H:%M',
            hour: '%b %e, %Y %H:%M',
            day: '%b %e, %Y %H:%M',
            week: '%b %e, %Y %H:%M',
            month: '%b %e, %Y %H:%M',
            year: '%b %e, %Y %H:%M'
        },

        "second_by_day": {
            millisecond: '%b %e, %Y %H:%M:%S.%L',
            second: '%b %e, %Y %H:%M:%S',
            minute: '%b %e, %Y %H:%M:%S',
            hour: '%b %e, %Y %H:%M:%S',
            day: '%b %e, %Y %H:%M:%S',
            week: '%b %e, %Y %H:%M:%S',
            month: '%b %e, %Y %H:%M:%S',
            year: '%b %e, %Y %H:%M:%S'
        },

        "millisecond_by_day": {
            millisecond: '%b %e, %Y %H:%M:%S.%L',
            second: '%b %e, %Y %H:%M:%S.%L',
            minute: '%b %e, %Y %H:%M:%S.%L',
            hour: '%b %e, %Y %H:%M:%S.%L',
            day: '%b %e, %Y %H:%M:%S.%L',
            week: '%b %e, %Y %H:%M:%S.%L',
            month: '%b %e, %Y %H:%M:%S.%L',
            year: '%b %e, %Y %H:%M:%S.%L'
        },

        "minute": {
            millisecond: '%H:%M:%S.%L',
            second: '%H:%M:%S',
            minute: '%H:%M',
            hour: '%H:%M',
            day: '%H:%M',
            week: '%b %e, %Y',
            month: '%b %e, %Y',
            year: '%b %e, %Y'
        },

        "second": {
            millisecond: '%H:%M:%S.%L',
            second: '%H:%M:%S',
            minute: '%H:%M:%S',
            hour: '%H:%M:%S',
            day: '%H:%M:%S',
            week: '%b %e, %Y',
            month: '%b %e, %Y',
            year: '%b %e, %Y'
        },

        "millisecond": {
            millisecond: '%H:%M:%S.%L',
            second: '%H:%M:%S.%L',
            minute: '%H:%M:%S.%L',
            hour: '%H:%M:%S.%L',
            day: '%H:%M:%S.%L',
            week: '%b %e, %Y',
            month: '%b %e, %Y',
            year: '%b %e, %Y'
        }
    },

    getSeriesByType: function(type, rowSlider, columnSlider, extraOptions) {
        var rowAxisLeafArray;
        var columnAxisLeafArray;

        if (AdhocDataProcessor.fn.isOLAP()) {
            rowAxisLeafArray = AdhocDataProcessor.fn.getNodeListForDimLevelRadio(0, rowSlider);
            columnAxisLeafArray = AdhocDataProcessor.fn.getNodeListForDimLevelRadio(1, columnSlider);
        } else {
            rowAxisLeafArray = AdhocDataProcessor.fn.getNodeListForSliderLevel(0, rowSlider);
            columnAxisLeafArray = AdhocDataProcessor.fn.getNodeListForSliderLevel(1, columnSlider);
        }

        var series;

        switch (type) {
            case HDM.SeriesType.COMMON:
                series = HDM.getCommonSeries(rowAxisLeafArray, columnAxisLeafArray, extraOptions);
                break;

            case HDM.SeriesType.PIE:
                series = HDM.getPieSeries(rowAxisLeafArray, columnAxisLeafArray, rowSlider, columnSlider, extraOptions);
                break;
            default:
                throw "Unknown series type!";
        }

        return series;
    },

    getColor: function(num) {
        return HDM.colors[num % HDM.colors.length];
    },

    generateXAxisLabelsOptions: function(options) {
        var labelsOptions = {
            step: options.step
        };

        if (options.rotation != 0) {
            if (options.adjustPosition) {
                _.extend(labelsOptions, {
                    rotation: options.rotation,
                    align: options.rotation > 0 ? "left" : "right",
                    x: HDM.getXPositionForXAxis(options.rotation),
                    y: HDM.getYPositionForXAxis(options.rotation)
                });
            } else {
                _.extend(labelsOptions, {
                    rotation: options.rotation
                });
            }
        }

        return labelsOptions;
    },

    getXPositionForXAxis: function(rotation) {
        var x = 20 - Math.abs(rotation) * 0.222;

        return rotation < 0 ? x : -x;
    },

    getYPositionForXAxis: function(rotation) {
        return rotation == 0 ? 0 : 15 - Math.abs(rotation) * 0.111;
    },

    getCommonSeriesGeneralOptions: function(extraOptions) {
        var doAxisSwap = extraOptions.chartState.chartType.indexOf("bar") != -1;

        var options = {
            xAxis: {
                categories: [],
                labels: HDM.generateXAxisLabelsOptions({
                    rotation: doAxisSwap ? extraOptions.chartState.yAxisRotation : extraOptions.chartState.xAxisRotation,
                    adjustPosition: !doAxisSwap,
                    step: doAxisSwap ? extraOptions.chartState.yAxisStep : extraOptions.chartState.xAxisStep
                })
            },
            yAxis: {
                title: {
                    text: extraOptions.chartState.showMeasureOnValueAxis && extraOptions.hasOneMeasure ?
                        extraOptions.measureName : ""
                },
                labels: {
                    rotation: doAxisSwap ? extraOptions.chartState.xAxisRotation : extraOptions.chartState.yAxisRotation,
                    step: doAxisSwap ? extraOptions.chartState.xAxisStep : extraOptions.chartState.yAxisStep
                }
            },
            plotOptions: {},
            series: []
        };

        var highchartsChartType = HighchartsDataMapper.cast[extraOptions.chartState.chartType];

        options.plotOptions[highchartsChartType] = {
            marker: {
                enabled: extraOptions.chartState.showDataPoints
            },
            turboThreshold: extraOptions.chartState.turboThreshold
        };

        if (extraOptions.isTimeSeries) {
            options.xAxis.dateTimeLabelFormats =
                HDM.getDateTimeLabelFormats(extraOptions.chartState.timeSeriesCategorizerName);

            options.plotOptions[highchartsChartType].tooltip = {
                dateTimeLabelFormats: HDM.getDateTimeLabelFormats(extraOptions.chartState.timeSeriesCategorizerName)
            }
        }

        return options;
    },

    getDateTimeLabelFormats: function(categorizerName) {
        return HDM.labelFormatsMap[categorizerName];
    },

    getCommonSeries: function(rowAxisLeafArray, columnAxisLeafArray, extraOptions) {
        var dataStyle = AdhocDataProcessor.fn.getDataStyle();
        var label,leafNode, value, i, isTimeSeries = extraOptions.isTimeSeries;

        HDM.groupedCategories = false;
        HDM.highchartsCategories = [];
        HDM.measureMin = null;
        HDM.measureMax = null;

        var result = this.getCommonSeriesGeneralOptions(extraOptions);

        if (isTimeSeries) {
            result.xAxis.type = "datetime";
        }

        // single axis ONLY.   march along axis and create chart
        // each measure is a bar
        // as one descends to more detail, the individual measure bars are grouped by the lowest
        // level of grouping
        if (dataStyle == 0)  {
            //
            //  for now treat single axis only data the same whether it's on column or row
            //
            //  data on rows only
            //
            //  in all cases there is a single pie with slices = row groups
            //
            var dataOnColumns = AdhocDataProcessor.metadata.axes[0].length == 0;

            // since there's only 1 'live' axis the non-live axis should have only one node and this is it
            var emptyNode = dataOnColumns ? rowAxisLeafArray[0] : columnAxisLeafArray[0];

            if (dataOnColumns) {
                //
                // there is only a single xAxis category
                // each column group is it's own series
                //
                // TODO: remove hard code and do i18n.
                result.xAxis.categories.push('Totals');

                for (i = 0; i < columnAxisLeafArray.length; i++) {
                    leafNode = columnAxisLeafArray[i];
                    value = HDM.getDataValue(emptyNode, leafNode);

                    if (value === null) {
                        continue; // SKIP this if no value
                    }

                    HDM.measureMinMax(value);

                    label = HDM.assembleFullGroupLinearName(1, leafNode);

                    result.series.push({
                        name: label,
                        data: [value]
                    });
                }
            } else {
                var seriesData = [];

                for (i = 0; i < rowAxisLeafArray.length; i++) {
                    leafNode = rowAxisLeafArray[i];
                    value = HDM.getDataValue(leafNode, emptyNode);
                    //
                    // 2012-08-21 thorick:  highcharts handles NULL data in seriesData
                    //
                    HDM.measureMinMax(value);

                    label = HDM.assembleFullGroupHierarchyName(0, leafNode);

                    result.xAxis.categories.push(label);

                    seriesData.push(value);
                }

                //
                // no legend, the x-axis shows the set of grouped data one category per datum
                // a single un-named series
                //
                result.series.push({
                    data: seriesData
                });
            }
        }

        // 2 axes:   1 with measures ONLY   the other with groups
        //
        // each measure is a bar  in a series  consisting of one series array member per measure
        //
        // the measure sets are grouped by the leaf slider level of the other axis
        //   which also provides the x-axis labels
        //
        if (dataStyle == 1 || dataStyle == 2) {
            // column groups are legend items, one legend per seriesItem
            // row groups are categories across the x-axis

            // set up series array
            for (i = 0; i < columnAxisLeafArray.length; i++) {
                label = HDM.assembleFullGroupLinearName(1, columnAxisLeafArray[i]);

                result.series.push({
                    name: label,
                    data: []
                });
            }

            // go through each measure leaf (set on the x axis) and generate the series for each
            for (i = 0; i < rowAxisLeafArray.length; i++) {
                var rowAxisLeafNode = rowAxisLeafArray[i];

                for (var j = 0; j < columnAxisLeafArray.length; j++) {
                    var columnAxisLeafNode = columnAxisLeafArray[j];
                    var currSeries = result.series[j];

                    value = HDM.getDataValue(rowAxisLeafNode, columnAxisLeafNode, isTimeSeries);

                    //
                    // 2012-08-21 thorick:
                    //            highcharts handles NULL data in seriesData OK so set whatever we get back
                    //
                    if (isTimeSeries) {
                        if (value.value != null && value.timestamp != null) {
                            HDM.measureMinMax(value.value);
                            currSeries.data.push([value.timestamp, value.value]);
                        }
                    } else {
                        HDM.measureMinMax(value);
                        currSeries.data.push(value);
                    }
                }

                label = HDM.assembleFullGroupHierarchyName(0, rowAxisLeafNode);

                if (!isTimeSeries) {
                    result.xAxis.categories.push(label);
                }
            }
        }

        if (HDM.groupedCategories) {
            if (!HDM.chartType) {
                throw "Chart type is not set!";
            }
            if (HDM.chartType.indexOf('column') >= 0 ||
                HDM.chartType.indexOf('area') >= 0 ||
                HDM.chartType.indexOf('line') >= 0 ||
                HDM.chartType.indexOf('spline') >= 0) {

                result.xAxis.categories = HDM.highchartsCategories;
            }
        }

        // 'categories' property should be undefined for time series chart types. Otherwise chart will hang.
        if (isTimeSeries) {
            result.xAxis.categories = undefined;
        }

        return result;
    },

    //
    //  The Pie chart is completely axis based
    //
    //  The general principle is that there is 1 pie per Column Axis group
    //  and an individual pie's slices correspond to the Row Axis groups
    //
    //
    getPieSeries: function(rowAxisLeafArray, columnAxisLeafArray, rowSlider, columnSlider, extraOptions) {
        HDM.measureMin = null;
        HDM.measureMax = null;

        // Highcharts 2.3 patch to override color reset for each series
        // Override to reset color counter for each series (the wrap function requieres Highcharts 2.3)
        Highcharts.wrap(Highcharts.Point.prototype, 'init', function (proceed, series, options, x) {

            if (series.options.colorByPoint && series.data.length == 0) {
                series.chart.counters.color = 0;
            }

            return proceed.call(this, series, options, x);
        });

        // Pie title plugin http://jsfiddle.net/highcharts/tnSRA/.
        // It allows to have title attached to each pie in multi-pie chart.
        (function (Highcharts) {
            Highcharts.wrap(Highcharts.seriesTypes.pie.prototype, 'render', function (proceed) {

                var chart = this.chart,
                    center = this.center || (this.yAxis && this.yAxis.center),
                    titleOption = this.options.title,
                    box;

                proceed.call(this);

                if (center && titleOption) {
                    box = {
                        x: chart.plotLeft + center[0] - 0.5 * center[2],
                        y: chart.plotTop + center[1] - 0.5 * center[2],
                        width: center[2],
                        height: center[2]
                    };
                    if (!this.title) {
                        this.title = this.chart.renderer.label(titleOption.text)
                            .css(titleOption.style)
                            .add()
                            .align(titleOption, null, box);
                    } else {
                        this.title.align(titleOption, null, box);
                    }
                }
            });

        }(Highcharts));


        var titleLines = (_.isArray(columnSlider) ? columnSlider.length : columnSlider) + AdhocDataProcessor.measureAxis;
        var titleTextLineHeight = 15;
        var textTopBottomPadding = 10;
        var titleHeight = titleTextLineHeight * titleLines + textTopBottomPadding;
        var containerWidth = extraOptions.width;
        var containerHeight = extraOptions.height;

        var dataStyle = AdhocDataProcessor.fn.getDataStyle();
        var label;

        var result = {
            xAxis: {
                categories: []
            },
            plotOptions: {},
            series: [],
            labels: {
                items: []
            }
        };

        //
        // single axis ONLY.
        //
        //  1 cases:
        //      0.  data on rows only
        //      1.  data on columns only
        //
        //
        //
        //
        if (dataStyle == 0)  {
            //
            //  data on rows only
            //
            //  in all cases there is a single pie with slices = row groups
            //
            if (AdhocDataProcessor.metadata.axes[0].length > 0)  {

                // since there's only 1 'live' axis the non-live axis should have only one node and this is it
                var columnNode = columnAxisLeafArray[0];
                var pieSetSize = 1;
                var pieMaxPositionCount = pieSetSize + 1;
                var xAxisPositionIncrement = 100 / pieMaxPositionCount;
                var xAxisPosition = xAxisPositionIncrement;
                var yAxisPosition = 50;

                //  nonMeasure groups contain measure subgroups.
                //  the label is for nonMeasure groups so it spans all of its measure pies
                var labelMaxPositionCount = pieSetSize + 1;
                var labelAbsolutePositionIncrement = containerWidth / labelMaxPositionCount;
                var labelAbsolutePosition = labelAbsolutePositionIncrement - (labelAbsolutePositionIncrement/pieMaxPositionCount);

                var centerArray = [];
                var xAxis = xAxisPosition + "%";
                var yAxis = yAxisPosition + "%";
                centerArray.push(xAxis);
                centerArray.push(yAxis);

                // TODO: remove hard code and do i18n.
                var name = "Totals";
                if (AdhocDataProcessor.metadata.measures[0].name) {
                    name = AdhocDataProcessor.metadata.measures[0].name;
                }
                result.series.push({
                    type: 'pie',
                    name: name,
                    data: [],
                    center: centerArray,
                    size: (xAxisPositionIncrement *2) + "%",
                    showInLegend: true,
                    dataLabels: { enabled: false }
                });

                for (var i=0; i < rowAxisLeafArray.length; i++) {
                    var rowAxisLeafNode = rowAxisLeafArray[i];
                    var value = HDM.getDataValue(rowAxisLeafNode, columnNode);
                    HDM.measureMinMax(value);

                    label = HDM.assembleFullGroupLinearName(0, rowAxisLeafNode);

                    result.series[0].data.push([label, value]);
                }
            }

            //
            // data on columns only
            //
            //  if it's measures only , then there is 1 pie with measure slices
            //
            //  for groups it's 1 pie per group with measure slices
            //
            //  we distinguish 2 cases:
            //      0.  measures in axis leaves:
            //              In this case the number of pies is the (number of axis leaves) / (number of measures)
            //              The slices are the measures
            //
            //
            //      1.  measures NOT in axis leaves:
            //              In this case tne number of pies is the number of axis leaves
            //
            //
            else {
                var rowAxisNode      = rowAxisLeafArray[0];
                var isMeasureOnly    = (AdhocDataProcessor.metadata.axes[1].length <= 1 ? true : false);
                var measureIsLast    = AdhocDataProcessor.fn.isMeasuresLastOnAxis(1);
                var numberOfMeasures = AdhocDataProcessor.metadata.measures.length;

                // determine how many pies there are
                var pieSetSize = 1;     // measure only case
                if (!isMeasureOnly)  {
                    if (measureIsLast) {
                         pieSetSize = columnAxisLeafArray.length / numberOfMeasures;
                    }
                    else {
                        // for measures not at the leaf level
                        // the number of pies is the number of leaf level members
                        pieSetSize = columnAxisLeafArray.length;

                    }
                }

                var squareSideLength = HDM.getSquareSideLength(pieSetSize, containerWidth, containerHeight);
                for (var m=0; m < pieSetSize; m++) {
                    var pieInfo = HDM.computePieParams(m+1, squareSideLength, containerWidth, containerHeight,
                        titleHeight, pieSetSize);
                    var index = m;

                    // TODO: remove hard code and do i18n.
                    label = "All";
                    if (!isMeasureOnly) {
                        if (measureIsLast) {
                            index = m * numberOfMeasures;             // 1 pie per group of measures
                            var node = columnAxisLeafArray[index];    // this label is measure name
                            label = node.parent.label;                // parent of measure
                        }
                        else {
                            label = columnAxisLeafArray[m].label;
                        }
                    }

                    var centerArray = [];
                    var xAxis = pieInfo.xAxisPositionPercent + "%";
                    var yAxis = pieInfo.yAxisPositionPercent + "%";
                    centerArray.push(xAxis);
                    centerArray.push(yAxis);
                    var index = m;
                    if (measureIsLast)  {
                        if (!isMeasureOnly) {
                            index = m * numberOfMeasures;
                        }
                    }
                    // only show the legend once
                    var showInLegendValue = m > 0 ? false : true;
                    result.series.push({
                        type: 'pie',
                        name: columnAxisLeafArray[index].label,
                        data: [],
                        center: centerArray,
                        size: pieInfo.pieSizePercent + "%",
                        showInLegend: showInLegendValue,
                        dataLabels: { enabled: false },
                        title: {
                            text: label,
                            verticalAlign: 'top',
                            y: -titleHeight
                        }
                    });
                }


                //
                //  case:  measures only (no groups)
                //      single pie with measures as slices
                //
                //  case:  measures are leaves:
                //      all leaves are grouped by common lowest non-measure group
                //      we have to cycle through the labels
                //      e.g.  Canada-Sales, Canada-Cost, Mexico-Sales, Mexico-Cost, etc..
                //
                //      so we take advantage of this ordering to know when to switch pies
                //      switch on a change in the non-measure group  'Country'
                //
                //  case:  measures are NOT leaves:
                //      one pie per column leaf group
                //
                if (isMeasureOnly) {     // single pie only
                    for (var i=0; i < columnAxisLeafArray.length; i++) {
                        var columnAxisLeafNode = columnAxisLeafArray[i];

                        var value = HDM.getDataValue(rowAxisNode, columnAxisLeafNode);
                        HDM.measureMinMax(value);

                        label = HDM.assembleFullGroupLinearName(1, columnAxisLeafNode);

                        result.series[0].data.push([label, value]);
                    }
                }
                else if (measureIsLast) {   // pie per non-measure group
                    var currLeafLabel = columnAxisLeafArray[0].label;
                    var pieIndex = 0;
                    var measureCounter = 0;
                    for (var i=0; i < columnAxisLeafArray.length; i++) {
                        var columnAxisLeafNode = columnAxisLeafArray[i];
                        measureCounter++;

                        if (measureCounter > numberOfMeasures) {
                            pieIndex++;
                            if (pieIndex >= pieSetSize)  throw "highchart.datamapper getPieSeries: exceeded numberOfPies="+numberOfPies;
                            measureCounter = 1;
                        }
                        var value = HDM.getDataValue(rowAxisNode, columnAxisLeafNode);
                        HDM.measureMinMax(value);

                        label = columnAxisLeafNode.label;    // measure name only

                        result.series[pieIndex].data.push([label, value]);
                    }
                }
                else {           // pie per leaf node
                    for (var i=0; i < columnAxisLeafArray.length; i++) {
                        var columnAxisLeafNode = columnAxisLeafArray[i];
                        var value = HDM.getDataValue(rowAxisNode, columnAxisLeafNode);
                        HDM.measureMinMax(value);

                        label = HDM.assembleFullGroupHierarchyName(1, columnAxisLeafNode);

                        result.series[i].data.push([label, value]);
                    }
                }
            }
        }
        //
        // full on crosstab
        //
        // one pie per column group
        //
        // 1 slice per row group
        //
        //
        if (dataStyle == 2 || dataStyle == 1)  {

            // setup each individual pie  in the highcharts  series
            //
            // There is a single pie for each column group
            //   so we iterate on the column axis
            //
            var squareSideLength = HDM.getSquareSideLength(columnAxisLeafArray.length, containerWidth, containerHeight);
            for (var m=0; m < columnAxisLeafArray.length; m++) {
                var pieInfo = HDM.computePieParams(m+1, squareSideLength, containerWidth, containerHeight,
                    titleHeight, columnAxisLeafArray.length);

                var columnGroupName = columnAxisLeafArray[m].label;
                //
                // column axis is the measure axis so we want the label to
                //  be  previous-level-label + measure name
                //
                var label = HDM.assembleFullGroupHierarchyName(1, columnAxisLeafArray[m]);
                var pieName = columnGroupName;
                var centerArray = [];
                var xAxis = pieInfo.xAxisPositionPercent + "%";
                var yAxis = pieInfo.yAxisPositionPercent + "%";
                centerArray.push(xAxis);
                centerArray.push(yAxis);

                // only show the legend once
                var showInLegendValue = m > 0 ? false : true;
                result.series.push({
                    type: 'pie',
                    name: pieName,
                    data: [],
                    center: centerArray,
                    size: pieInfo.pieSizePercent + "%",
                    showInLegend: showInLegendValue,
                    dataLabels: { enabled: false },
                    title: {
                        text: label,
                        verticalAlign: 'top',
                        y: -titleHeight
                    }
                });
            }


            // for each columnGroup's pie:
            //  go through the row groups to fill in the slices

            var pieSeriesIndex = 0;      // be really careful with the use of this.  It MUST match the series initialization above !
            for (var i=0; i < columnAxisLeafArray.length; i++) {
                var columnAxisLeafNode = columnAxisLeafArray[i];      // for this nonMeasure axis group a set of pies for each measure

                for (var j=0; j < rowAxisLeafArray.length; j++) {
                    var rowAxisLeafNode = rowAxisLeafArray[j];
                    var value = HDM.getDataValue(rowAxisLeafNode, columnAxisLeafNode);
                    HDM.measureMinMax(value);

                    label = HDM.assembleFullGroupLinearName(0, rowAxisLeafNode);

                    result.series[i].data.push([label, value]);
                }
            }
        }
        return result;
    },

    getSquareSideLength: function(squaresCount, width, height) {
        // Test for invalid input.
        if (width * height < squaresCount) {
            return 0;
        }

        // Initial guess.
        var aspect = height / width;
        var xf = Math.sqrt(squaresCount / aspect);
        var yf = xf * aspect;
        var x = Math.max(1.0, Math.floor(xf));
        var y = Math.max(1.0, Math.floor(yf));
        var x_size = Math.floor(width / x);
        var y_size = Math.floor(height / y);
        var squareSideLength = Math.min(x_size, y_size);

        // Test our guess:
        x = Math.floor(width / squareSideLength);
        y = Math.floor(height / squareSideLength);
        // We guessed too high.
        if (x * y < squaresCount) {
            if (((x + 1) * y < squaresCount) && (x * (y + 1) < squaresCount)) {
                // Case 2: the upper bound is correct compute the squareSideLength that will result in (x+1)*(y+1) tiles.
                x_size = Math.floor(width / (x + 1));
                y_size = Math.floor(height / (y + 1));

                squareSideLength = Math.min(x_size, y_size);
            } else {
                // Case 3: solve an equation to determine the final x and y dimensions and then compute
                // the squareSideLength that results in those dimensions.
                var test_x = Math.ceil(squaresCount / y);
                var test_y = Math.ceil(squaresCount / x);
                x_size = Math.min(Math.floor(width / test_x), Math.floor(height / y));
                y_size = Math.min(Math.floor(width / x), Math.floor(height / test_y));

                squareSideLength = Math.max(x_size, y_size);
            }
        }

        return squareSideLength;
    },

    computePieParams: function(pieNumber, squareSideLength, width, height, titleHeight, totalPiesNumber) {
        var paddingTop = 10;
        var globalPaddingTop = 5;

        var piesInRow = Math.min(Math.floor(width / squareSideLength), totalPiesNumber);
        var piesInColumn = Math.min(Math.floor(height / squareSideLength), totalPiesNumber);
        var widthGap = (width - squareSideLength * piesInRow) / piesInRow;
        var heightGap = (height - squareSideLength * piesInColumn) / piesInColumn;

        var xAxisPositionNumber = pieNumber % piesInRow == 0 ? piesInRow : pieNumber % piesInRow;
        var yAxisPositionNumber = Math.floor(pieNumber / piesInRow) + (pieNumber % piesInRow == 0 ? 0 : 1);

        var xAxisPosition = squareSideLength * xAxisPositionNumber - squareSideLength / 2 +
            widthGap * xAxisPositionNumber / 2;
        var yAxisPosition = squareSideLength * yAxisPositionNumber - squareSideLength / 2 +
            heightGap * yAxisPositionNumber / 2;

        var additionalSpaceCutFromPieSize = titleHeight + paddingTop;

        return {
            xAxisPositionPercent: 100 * (xAxisPosition - additionalSpaceCutFromPieSize / 2) / width,
            yAxisPositionPercent: 100 * (yAxisPosition + additionalSpaceCutFromPieSize / 2 + globalPaddingTop) / height,
            pieSizePercent: 100 * (squareSideLength - additionalSpaceCutFromPieSize) / width
        };
    },

    //
    //  keep track of the min and max measure values that we charted
    //
    measureMinMax: function(currVal) {
        if (currVal === null) {
            return;
        }

        if (HDM.measureMin === null) {
            HDM.measureMin = currVal;
            HDM.measureMax = currVal;
        } else {
            HDM.measureMin = Math.min(currVal, HDM.measureMin);
            HDM.measureMax = Math.max(currVal, HDM.measureMax);
        }
    },

    //
    // http://bugzilla.jaspersoft.com/show_bug.cgi?id=30095
    //
    //  2012-11-19  thorick
    //
    //              Post Processing of the generated yAxis.
    //              For line or spline charts, highcharts can default to
    //              showing a negative y-axis tick even when all the
    //              charted measures are greater than zero.
    //              We get around this by setting the y-axis 'min' property
    //              if there are no negative measures.
    //
    yAxisLineChartAdjust: function(result) {
        if (HDM.measureMin < 0)   return;
        if (result.yAxis) {
            // do NOT overwrite any pre-existing 'min' value
            if (!result.yAxis.min) {
                result.yAxis.min = HDM.measureMin;
                result.yAxis.startOnTick = true;
            }
        }
    },

    assembleFullGroupName: function(axisIndex, leafNode, groupLineBreaks)  {
        var label = '';
        var nameArray = AdhocDataProcessor.fn.getLabelNameArray(axisIndex, leafNode);

        var lineBreaker = '<br>';
        if (HDM.chartType.indexOf("bar") != -1) {
            nameArray = nameArray.reverse();
            lineBreaker = ", ";
        }
        var len = nameArray.length;

        for (var j=0; j < len; j++) {
            label = label + nameArray[j];
            if (j < (len - 1))  {
                if (groupLineBreaks) {
                    label = label + lineBreaker;
                }
                else {
                    label = label + ' ';
                }
            }
        }

        //  grouped hierarchy labels are for x axis only
        if(axisIndex == 0 && len > 1) {
            HDM.groupedCategories = true;
            HDM.addLeaf2HighchartsCategory(nameArray);
        }

        return label;
    },

    assembleFullGroupHierarchyName: function(axisIndex, leafNode)  {
        return HDM.assembleFullGroupName(axisIndex, leafNode, true);
    },

    assembleFullGroupLinearName: function(axisIndex, leafNode)  {
        return HDM.assembleFullGroupName(axisIndex, leafNode, false);
    },


    addLeaf2HighchartsCategory: function(nameArray) {
        if (HDM.highchartsCategories == null ) HDM.highchartsCategories = [];

        if (nameArray.length <= 1) {
            HDM.highchartsCategories.push(nameArray[0]);
            return;
        }
        var currCategory = HDM.highchartsCategories;

        for (var i=(nameArray.length-1); i>=0; i--) {
            var name = nameArray[i];
            if (i==0) {
                currCategory.push(name);
                return;
            }
            var theCategory = null;

            for (var j=0; j<currCategory.length; j++) {
                if (currCategory[j].name === nameArray[i]) {
                    theCategory = currCategory[j];
                }
            }
            if (theCategory == null) {
                theCategory =
                    {
                        name: nameArray[i],
                        categories: []
                    };
                currCategory.push(theCategory);
            }
            currCategory = theCategory.categories;
        }
    },

    getDataValue: function(rowLeaf, columnLeaf, isTimeSeries) {
        var value = AdhocDataProcessor.fn.getDataFromRowColumn(rowLeaf, columnLeaf);

        if (isTimeSeries) {
            return value;
        } else {
            return value == null ? 0 : value;
        }
    }
});

/*
 * Chart type routing.
 */
_.extend(HDM, {
    get: function(type) {
        return HDM.typeToOptionsMap[type];
    },

    typeToOptionsMap: {
        column: function(rowIndex, columnIndex, extraOptions) {
            return HDM.getSeriesByType(HDM.SeriesType.COMMON, rowIndex, columnIndex, extraOptions);
        },

        stacked_column: function(rowIndex, columnIndex, extraOptions) {
            var result = HDM.getSeriesByType(HDM.SeriesType.COMMON, rowIndex, columnIndex, extraOptions);

            result.plotOptions.column.stacking = "normal";

            return result;
        },

        percent_column:  function(rowIndex, columnIndex, extraOptions) {
            var result = HDM.getSeriesByType(HDM.SeriesType.COMMON, rowIndex, columnIndex, extraOptions);

            result.plotOptions.column.stacking = "percent";

            return result;
        },

        bar:  function(rowIndex, columnIndex, extraOptions) {
            return HDM.getSeriesByType(HDM.SeriesType.COMMON, rowIndex, columnIndex, extraOptions);
        },

        stacked_bar:  function(rowIndex, columnIndex, extraOptions) {
            var result = HDM.getSeriesByType(HDM.SeriesType.COMMON, rowIndex, columnIndex, extraOptions);

            if (!result.plotOptions.series) {
                result.plotOptions.series = {};
            }
            result.plotOptions.series.stacking = "normal";

            return result;
        },

        percent_bar:   function(rowIndex, columnIndex, extraOptions) {
            var result = HDM.getSeriesByType(HDM.SeriesType.COMMON, rowIndex, columnIndex, extraOptions);

            if (!result.plotOptions.series) {
                result.plotOptions.series = {};
            }
            result.plotOptions.series.stacking = "percent";

            return result;
        },

        line:   function(rowIndex, columnIndex, extraOptions) {
            var result = HDM.getSeriesByType(HDM.SeriesType.COMMON, rowIndex, columnIndex, extraOptions);

            HDM.yAxisLineChartAdjust(result);

            return result;
        },

        inverted_line: '',

        area: function(rowIndex, columnIndex, extraOptions) {
            return HDM.getSeriesByType(HDM.SeriesType.COMMON, rowIndex, columnIndex, extraOptions);
        },

        inverted_area: '',

        spline_area: function(rowIndex, columnIndex, extraOptions) {
            return HDM.getSeriesByType(HDM.SeriesType.COMMON, rowIndex, columnIndex, extraOptions);
        },

        inverted_spline_area: '',

        stacked_area:  function(rowIndex, columnIndex, extraOptions) {
            var result = HDM.getSeriesByType(HDM.SeriesType.COMMON, rowIndex, columnIndex, extraOptions);

            result.plotOptions.area.stacking = "normal";

            return result;
        },

        inverted_stacked_area: '',

        percent_area:  function(rowIndex, columnIndex, extraOptions) {
            var result = HDM.getSeriesByType(HDM.SeriesType.COMMON, rowIndex, columnIndex, extraOptions);

            result.plotOptions.area.stacking = "percent";

            return result;
        },

        inverted_percent_area: '',

        pie: function(rowIndex, columnIndex, extraOptions) {
            return HDM.getSeriesByType(HDM.SeriesType.PIE, rowIndex, columnIndex, extraOptions);
        },

        scatter: '',
        inverted_scatter: '',

        spline:   function(rowIndex, columnIndex, extraOptions) {
            var result = HDM.getSeriesByType(HDM.SeriesType.COMMON, rowIndex, columnIndex, extraOptions);

            HDM.yAxisLineChartAdjust(result);

            return result;
        },

        inverted_spline: '',

        // Time series types mappers.
        line_time_series: function(rowIndex, columnIndex, extraOptions) {
            extraOptions.isTimeSeries = true;

            var result = HDM.getSeriesByType(HDM.SeriesType.COMMON, rowIndex, columnIndex, extraOptions);

            HDM.yAxisLineChartAdjust(result);

            return result;
        },
        spline_time_series: function(rowIndex, columnIndex, extraOptions) {
            extraOptions.isTimeSeries = true;

            var result = HDM.getSeriesByType(HDM.SeriesType.COMMON, rowIndex, columnIndex, extraOptions);

            HDM.yAxisLineChartAdjust(result);

            return result;
        },
        area_time_series: function(rowIndex, columnIndex, extraOptions) {
            extraOptions.isTimeSeries = true;

            return HDM.getSeriesByType(HDM.SeriesType.COMMON, rowIndex, columnIndex, extraOptions);
        },
        spline_area_time_series: function(rowIndex, columnIndex, extraOptions) {
            extraOptions.isTimeSeries = true;

            return HDM.getSeriesByType(HDM.SeriesType.COMMON, rowIndex, columnIndex, extraOptions);
        }
    },
    cast: {
        column: 'column',
        stacked_column: 'column',
        percent_column: 'column',
        bar: 'bar',
        stacked_bar: 'bar',
        percent_bar: 'bar',
        line: 'line',
        spline: 'spline',
        spline_area: 'areaspline',
        area: 'area',
        stacked_area: 'area',
        percent_area: 'area',
        pie: 'pie',
        line_time_series: 'line',
        spline_time_series: 'spline',
        area_time_series: 'area',
        spline_area_time_series: 'areaspline'
    }
});