/*
 * Copyright (C) 2005 - 2011 Jaspersoft Corporation. All rights reserved.
 * http://www.jaspersoft.com.
 * Licensed under commercial Jaspersoft Subscription License Agreement
 */


var Options = {

    SAVE_PFX: 'save',
    CANCEL_PFX: 'cancel',
    ERROR_PFX: 'error_',
    INPUT_PFX: 'input_',
    BUTTON_FLASH: 'flushOLAPCache',

    initialize: function() {
        layoutModule.resizeOnClient('filters', 'settings');
        webHelpModule.setCurrentContext("admin");

        $('display').observe('click', function(e) {
            var elem = e.element();

            // observe navigation
            for (var pattern in Administer.menuActions) {
                if (matchAny(elem, [pattern], true) && !(matchMeOrUp(elem.parentNode, 'li').hasClassName('selected'))) {
                    document.location = Administer.menuActions[pattern]();
                    return;
                }
            }

            if (matchAny(elem, ['#' + Options.BUTTON_FLASH], true)) {
                Event.stop(e);
                Options.flushCache();
                return;
            }

            var button = matchAny(elem, ['#' + Options.SAVE_PFX], true);
            if (button) {
                Event.stop(e);
                var name = button.name;
                Options.saveValue(name);
                return;
            }

            button = matchAny(elem, ['#' + Options.CANCEL_PFX], true);
            if (button) {
                Event.stop(e);
                Options.resetValue(button.name,button.value);
            }


            // observe inputs
            if (matchAny(elem,['.checkBox > input','select'])) {
                Options.switchButtons(elem, true);
            }
        });


/*
        // observe inputs
        $('display').observe('change', function(e) {
            var elem = e.element();

            if (matchAny(elem,['input','select'])) {
                Options.switchButtons(elem, true);
            }
        });
*/

        $('display').observe('keydown', function(e) {
            var elem = e.element();

            if (elem.match('input')) {
                Options.switchButtons(elem, true);
            }
        });

    },

    saveValue: function(nm) {

        var input = $(Options.INPUT_PFX + nm);
        var params = {
            name: nm,
            value: (input.type == "checkbox") ? input.checked : input.value,
            _flowExecutionKey: Administer.flowExecutionKey,
            _eventId: 'saveSingleProperty'
        }

        var url = 'flow.html?' + Object.toQueryString(params);
        Administer._sendRequest(url,null,Options._updateCallback);
    },

    resetValue: function(nm,vl) {
        var input = $(Options.INPUT_PFX + nm);
        if (input.type == "checkbox") {
            input.checked = ( String(vl) == "true" );
        } else {
            input.value = vl;
        }
        Options.switchButtons(input,false);
        $(document.body).select('[for="' + Options.INPUT_PFX + nm + '"]')[0].removeClassName(layoutModule.ERROR_CLASS);
    },

    flushCache: function() {
        var url = 'flow.html?_flowExecutionKey=' + Administer.flowExecutionKey + '&_eventId=flushCache';
        Administer._sendRequest(url,null,Options._flushCallback);
    },


    switchButtons: function(input, enable) {
        if (typeof(input) == "string") {
            input = $(Options.INPUT_PFX + input)
        }
        Options._enableButton($(matchMeOrUp(input, "li")).select("button")[0],enable);
        Options._enableButton($(matchMeOrUp(input, "li")).select("button")[1],enable);
    },

    _enableButton: function(button, enable) {
        if (enable) {
            buttonManager.enable(button);
        } else {
            buttonManager.disable(button);
        }
    },


    _updateCallback: function(response) {
        if (response.error) {
            $(document.body).select('[for="'+ Options.INPUT_PFX + response.optionName+'"]')[0].addClassName(layoutModule.ERROR_CLASS);
            $(Options.ERROR_PFX + response.optionName).update(Administer.getMessage(response.error));
        } else {
            Options.switchButtons(response.optionName,false);
            dialogs.systemConfirm.show(Administer.getMessage(response.result));
            $(document.body).select('[for="'+ Options.INPUT_PFX + response.optionName+'"]')[0].removeClassName(layoutModule.ERROR_CLASS);
        }
    },

    _flushCallback: function(response) {
        if (response.error) {
            dialogs.systemConfirm.show(Administer.getMessage("JAM_018_ERROR") + ": " + response.error);
        } else {
            dialogs.systemConfirm.show(Administer.getMessage(response.result));
        }

    }

}

document.observe('dom:loaded',Options.initialize.bind(Options));
