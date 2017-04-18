/*
 * Copyright (C) 2005 - 2012 Jaspersoft Corporation. All rights reserved.
 * http://www.jaspersoft.com.
 * Licensed under commercial Jaspersoft Subscription License Agreement
 */

//JasperServer namespace

var isEncryptionOn = false;

var js_edition='OS';
function isProVersion(){
    return (js_edition == 'PRO');
}


var jaspersoft = {

    components:{},
    i18n:{}

};


if(typeof(JRS) == "undefined"){
    JRS = {
        Mocks : {}
    };
}

if (typeof(JRS.vars) == "undefined"){
    JRS.vars = {
        element_scrolled: false,
        ajax_in_progress: false,
        current_flow: null
    };
}

if (typeof(JRS.Export) == "undefined"){
    JRS.Export = {i18n : {
        "file.name.empty": "export.file.name.empty",
        "file.name.too.long":"export.file.name.too.long",
        "file.name.not.valid":"export.file.name.not.valid",
        "export.select.users":"export.select.users",
        "export.select.roles":"export.select.roles",
        "export.session.expired":"export.session.expired",
        "error.timeout":"export.file.name.empty"
    }, configs:{
        TIMEOUT : 1200000,
        DELAY: 3000
    }};
}

if (typeof(localContext) == "undefined"){
    localContext = { }
}
