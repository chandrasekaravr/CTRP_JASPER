/*
 * Copyright (C) 2005 - 2013 Jaspersoft Corporation. All rights reserved.
 * http://www.jaspersoft.com.
 * Licensed under commercial Jaspersoft Subscription License Agreement
 */
/**
 * This adapter makes adoption of Ad Hoc data, metadata and chart state to Highcharts options.
 */
var AdhocHighchartsAdapter = {
    /**
     * Generates Highcharts options based on query data and chart state. This method does not do rendering. It just
     * prepare the options for rendering.
     *
     * @param queryData the query data object.
     * @param chartState the chart state.
     * @return {Object} the options object to be passed to Highcharts.Chart constructor.
     */
    generateOptions: function(queryData, chartState, extraOptions) {
        AdhocDataProcessor.fn.load(queryData);

        HighchartsDataMapper.chartType = chartState.chartType;

        Highcharts.setOptions({
            lang: {
                shortMonths: chartState.shortMonths
            }
        });

        var highchartsOptions = {
            chart: {
                renderTo: 'chartContainer',
                zoomType: 'xy',
                jrstype: chartState.chartType,
                type: HighchartsDataMapper.cast[chartState.chartType]
            },

            credits: {
                enabled: false
            },

            tooltip: {
                valueDecimals: 2
            },

            title: {
                // Skip internal Highcharts title.
                text: null
            }
        };

        var dataProcessorRow = AdhocDataProcessor.fn.levelsToLevelNumbers(chartState.rowsSelectedLevels, 0);
        var dataProcessorCol = AdhocDataProcessor.fn.levelsToLevelNumbers(chartState.columnsSelectedLevels, 1);

        extraOptions.chartState = chartState;
        extraOptions.hasOneMeasure = queryData.metadata.measures.length == 1;
        extraOptions.measureName = queryData.metadata.measures.length == 1 ? queryData.metadata.measures[0] : "";

        _.extend(highchartsOptions, HighchartsDataMapper.get(chartState.chartType)(dataProcessorRow, dataProcessorCol,
            extraOptions));

        var labels;
        jQuery.each(['xAxis', 'yAxis'], function(i, axis){
            if(highchartsOptions[axis] && highchartsOptions[axis].categories) {
                labels = [];
                jQuery.each(highchartsOptions[axis].categories, function(i,v){
                    if(v.length > 32) {
                        labels.push(v.substring(0, 29) + '...');
                    } else {
                        labels.push(v);
                    }
                });
                highchartsOptions[axis].categories = labels;
            }
        });

        return highchartsOptions;
    }
};
