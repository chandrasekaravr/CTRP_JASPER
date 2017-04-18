/*
 * Copyright (C) 2005 - 2012 Jaspersoft Corporation. All rights reserved.
 * http://www.jaspersoft.com.
 * Licensed under commercial Jaspersoft Subscription License Agreement
 */

//////////////////////////////////////////
// Event handling for filter pod
//////////////////////////////////////////

var FILTER_PANE_PATTERN = "DIV.panel.pane.filter";


adHocFilterModule.initialize = function() {

    /**
     * Button event handlers for Complex Filter dialog
     */

    $(adHocFilterModule.COMPLEX_EXPRESSION_DIALOG_ID).stopObserving('click').observe("click", function(e) {
        var element = e.element();

        if (matchAny(element,["#validate"], true)) {
            adHocFilterModule.validateComplexFilter();
        } else if (matchAny(element,["#submit"], true)) {
            adHocFilterModule.submitComplexFilter();
        } else if (matchAny(element,["#cancel"], true)) {
            adHocFilterModule.closeComplexFilterDialog();
        }

        if (matchAny(element,["#validate", "#submit", "#cancel"], true)) {
            e.stop();
        }
    });

    var complexFilterRemoveConfirm = $(adHocFilterModule.COMPLEX_FILTER_REMOVE_CONFIRM);
    if (complexFilterRemoveConfirm){
        complexFilterRemoveConfirm.observe("click", function(e) {
            var element = e.element();

            if (matchAny(element,["#confirmYes"], true)) {
                adHocFilterModule.removeFilter(true);
            }
            if (matchAny(element,["#confirmYes", "#confirmNo"], true)) {
                dialogs.popup.hide(complexFilterRemoveConfirm);
                adhocDesigner.initPreventBrowserSelection($("designer"));
                e.stop();
            }
        });
    }

    if($('filter-container')){
        var calendar = null;
        /**
         * event observe for filter mouse over
         */
        $('filter-container').stopObserving('mouseover').observe('mouseover', function(evt){
            var panel;
            var inputId = null;
            var dataType = null;
            var panelId = null;

            var element = evt.element();

            if(element.nodeName == "SPAN"){
                if(element.hasClassName("mutton")){
                    panel = element.up(FILTER_PANE_PATTERN);
                    if(panel){
                        var podId = panel.readAttribute("id");
                        adHocFilterModule.showFilterMenu(evt, podId);
                    }
                }
            }

            if(element.nodeName == "BUTTON"){
                if($(element).hasClassName("button disclosure")){
                    buttonManager.over($(element));
                }
            }

            adhocDesigner.initEnableBrowserSelection($("designer"));
        });

        //I guess we still need these because disclosure buttons do not bubble up to core.events
        $('filter-container').stopObserving('mousedown').observe('mousedown', function(evt){
            var element = evt.element();

            if(element.nodeName == "BUTTON"){
                if($(element).hasClassName("button disclosure")){
                    buttonManager.down($(element));
                }
            }
        });


        $('filter-container').stopObserving('mouseup').observe('mouseup', function(evt){
            var element = evt.element();

            if(element.nodeName == "BUTTON"){
                if($(element).hasClassName("button disclosure")){
                    buttonManager.up($(element));
                }
            }
        });


        $('filter-container').stopObserving('mouseout').observe('mouseout', function(evt){
            var element = evt.element();

            if(element.nodeName == "BUTTON"){
                if($(element).hasClassName("button disclosure")){
                    buttonManager.out($(element));
                }
            }
            adhocDesigner.initPreventBrowserSelection($("designer"));
        });

        /**
         * event observe for filter mouse click
         */
        $('filter-container').stopObserving('click').observe('click', function(evt) {
            var panel = null;
            var podId = null;
            var filterId = null;
            var dataType = null;
            var filterType = null;
            var element = evt.element();

            if(element.nodeName == "INPUT"){
                var type = element.readAttribute("type");
                var value = element.readAttribute("value");
                if(!isNotNullORUndefined(type)){
                    return;
                }

                if(value && (value === "All")){
                    panel = element.up(FILTER_PANE_PATTERN);
                    if (panel) {
                        podId = panel.readAttribute("id");
                        dataType = panel.readAttribute("data-dataType");
                        adHocFilterModule.selectAllOption(podId, dataType);
                    }
                }

                if($(element).identify().include("_filterInput")){
                    panel = element.up(FILTER_PANE_PATTERN);
                    podId = panel.readAttribute("id");
                    adHocFilterModule.inputExpressionChange(podId);
                }


                if($(element).identify().include("_calendarButton")){
                    panel = element.up(FILTER_PANE_PATTERN);
                    podId = panel.readAttribute("id");
                    adHocFilterModule.inputExpressionChange(podId);
                }
            }

            if(element.nodeName == "SELECT"){
                var id = element.readAttribute("id");
                if(id.endsWith("_filterOps")){
                    panel = element.up(FILTER_PANE_PATTERN);
                    if (panel) {
                        podId = panel.readAttribute("id");
                        dataType = panel.readAttribute("data-dataType");
                        adHocFilterModule.cancelAdhocFilterSubmit();

                    }
                }
            }

            if(element.nodeName == "SPAN"){
                if(element.hasClassName("mutton")){
                    panel = element.up(FILTER_PANE_PATTERN);
                    if(panel){
                        podId = panel.readAttribute("id");
                        adHocFilterModule.showFilterMenu(evt, podId);
                    }
                }
            }

            if (element.nodeName == "BUTTON") {

                if($(element).hasClassName("button disclosure")){
                    panel = element.up(FILTER_PANE_PATTERN);
                    if(panel){
                        podId = panel.readAttribute("id");
                        filterId = panel.readAttribute("data-filterId");
                        adHocFilterModule.toggleFilterPod(evt, podId);
                        adHocFilterModule.toggleAdhocFilterPod(filterId);
                    }
                }

                Event.stop(evt);
            }

            /* Action for edit button in Complex Filtering Pod */
            if (matchAny(element,["#edit"], true)) {
                adHocFilterModule.openComplexFilterDialog();
                Event.stop(evt);
            }

        });

    }
};


/**
 * Note:
 * These methods are called inline simply because IE (the silly browser) is buggy with respect to firing onchange
 * on input and select boxes
 * @param selectObjId
 */
adHocFilterModule.onChangeForSelect = function(selectObjId){
    var filterId;
    var dataType;
    var panel;
    var filterType;
    var select = $(selectObjId);

    if (select) {
        if (selectObjId.endsWith("_filterOps")) {
            panel = select.up(FILTER_PANE_PATTERN);
            filterId = panel.readAttribute("id");
            dataType = panel.readAttribute("data-dataType");
            adHocFilterModule.changeInputType(filterId, dataType);
        }

        if (selectObjId.endsWith("_filterInput")) {
            panel = select.up(FILTER_PANE_PATTERN);
            filterId = panel.readAttribute("id");
            filterType = panel.readAttribute("data-filterType");
            adHocFilterModule.inputExpressionChange(filterId);
            adHocFilterModule.adhocFilterSubmit(filterId);
        }
    }
};

adHocFilterModule.onChangeForInput = function(podId){
    adHocFilterModule.editFilterRequest(podId);
};

adHocFilterModule.onChangeForDateInput = function(podId){
    adHocFilterModule.editFilterRequest(podId);
};

adHocFilterModule.onChangeForDateInputInline = function(element) {
    if (element.identify().include("_filterInput")) {
        var panel = element.up(FILTER_PANE_PATTERN);
        var podId = panel.readAttribute("id");
        var dataType = panel.readAttribute("data-dataType");

        // Do not apply filter while datepicker is visible, onClose will apply filter.
        if (!adHocFilterModule.isDatePickerVisible(element)) {
            adHocFilterModule.normalizeDateFilterValue(podId);
            adHocFilterModule.onChangeForDateInput(podId);
        }
    }
};
