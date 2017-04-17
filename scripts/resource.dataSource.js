/*
 * Copyright (C) 2005 - 2011 Jaspersoft Corporation. All rights reserved.
 * http://www.jaspersoft.com.
 *
 * Unless you have purchased  a commercial license agreement from Jaspersoft,
 * the following license terms  apply:
 *
 * This program is free software: you can redistribute it and/or  modify
 * it under the terms of the GNU Affero General Public License  as
 * published by the Free Software Foundation, either version 3 of  the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU Affero  General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public  License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 */

;(function(imp, exp){
    var jQuery = imp.jQuery,
        _ = imp._,
        Backbone = imp.Backbone;

    var ResourceDataSource = function() {
        Backbone.View.apply(this, arguments);
        this._initEvents();
        this.delegateEvents();
    };

    Backbone.View.extend({
        constructor : ResourceDataSource,
        el : "body",
        TYPE_ID: "typeID",
        PARAM_TYPE: "type",
        LABEL_ID: "labelID",
        RESOURCE_ID_ID: "nameID",
        DESCRIPTION_ID: "descriptionID",
        PARENT_FOLDER_ID: "folderUri",

        SUBMIT_BUTTON_ID: "done",
        SUBMIT_EVENT_ID: "submitEvent",
        TEST_BUTTON_ID: "testDataSource",
        CANCEL_BUTTON_ID: "dsCancel",
        PREVIOUS_BUTTON_ID: "previous",
        NEXT_BUTTON_ID: "next",

        _canGenerateId: true,
        _alreadySubmitted: false,

        initialize: function(options) {
            this._form = $(document.body).select('form')[0];
            this._submitEvent = $(this.SUBMIT_EVENT_ID);
            this._type = $(this.TYPE_ID);
            this._label = $(this.LABEL_ID);
            this._resourceId = $(this.RESOURCE_ID_ID);
            this._description = $(this.DESCRIPTION_ID);
            this._paramType = $(this.PARAM_TYPE);
            this._parentFolder = $(this.PARENT_FOLDER_ID);

            this._submitButton = $(this.SUBMIT_BUTTON_ID);
            this._testButton = $(this.TEST_BUTTON_ID);
            this._cancelButton = $(this.CANCEL_BUTTON_ID);
            this._previousButton = $(this.PREVIOUS_BUTTON_ID);
            this._nextButton = $(this.NEXT_BUTTON_ID);

            this._validationEntries = [];

            this._isEditMode = options.isEditMode;
            this._initialType = options.type;
            this._parentFolderUri = options.parentFolderUri;

            this._validationEntries.push(resource.getLabelValidationEntry(this._label));
            this._validationEntries.push(resource.getIdValidationEntry(this._resourceId));
            this._validationEntries.push(resource.getDescriptionValidationEntry(this._description));
            this._validationEntries.push({
                element: this._parentFolder,
                method: "mandatory",
                messages: {mandatory: resource.messages['parentFolderIsEmpty']}
            });

            resourceLocator.initialize({
                resourceInput : this.PARENT_FOLDER_ID,
                browseButton : 'browser_button',
                treeId : 'addFileTreeRepoLocation',
                providerId : 'repositoryExplorerTreeFoldersProvider',
                dialogTitle : resource.messages["resource.Add.Files.Title"]
            });

            this._sortTypeSelect();
        },

        ///////////////////////////////////
        // Event Handlers
        ///////////////////////////////////
        _initEvents: function() {
            var that = this;

            this.events = _.defaults(this.events || {}, {
                "keydown form input[type=\"text\"]" : "emulateSubmitForm",
                "change #typeID" : "changeType",
                "click #done" : "submitHandler",
                "click #next" : "submitHandler",
                "click #dsCancel" : "cancelHandler",
                "click #previous" : "cancelHandler",
                "click #testDataSource" : "testConnectionHandler",
                "submit form" : "submitForm"
            });

            ValidationModule.attachOnEvent("keyup", this._validationEntries);
            ValidationModule.attachOnEvent("input", this._validationEntries);
            if(!this._isEditMode) {
                this.$el.on("keyup", "#nameID", function() {
                    if(that._resourceId.getValue() != resource.generateResourceId(that._label.getValue())) {
                        that._canGenerateId = false;
                    }
                });
                this.$el.on("keyup", "#labelID", function() {
                    if (that._canGenerateId) {
                        that._resourceId.setValue(resource.generateResourceId(that._label.getValue()));
                    }
                });
            }
        },

        emulateSubmitForm : function(ev) {
            if(ev.which == Event.KEY_RETURN) {
                ev.preventDefault();
                if(!jQuery(ev.target).hasClass("noSubmit")) {
                    this._submitButton.click();
                }
            }
        },

        changeType : function(e) {
            var currentType = jQuery(e.target).val();

            if (this._initialType != currentType) {
                this._paramType = currentType;
                this._form.submit();
            }
        },

        submitHandler : function(e) {
            if (!this._isDataValid()) {
                e.preventDefault();
            } else {
                this._submitEvent.writeAttribute("disabled", "disabled");
            }
        },

        submitForm : function(e) {
            if (this._alreadySubmitted) {
                e.preventDefault();
            } else {
                this._alreadySubmitted = true;
            }
        },

        cancelHandler : function() {
            this._submitEvent.writeAttribute("disabled", "disabled");
        },

        testConnectionHandler : function(e) {
            e.preventDefault();
            if (!this._isDataValid()) {
                return;
            }
            var testButton = this._testButton;
            var submitEvent = this._submitEvent;
            submitEvent.writeAttribute("disabled", "disabled");
            var form = jQuery(e.target).closest('form');
            var formValues = form.serializeArray();
            formValues.push({name : "_eventId_testDataSource", value : ""});

            ajaxTargettedUpdate(
                form.attr('action'),
                {
                    postData : jQuery.param(formValues),
                    fillLocation: 'ajaxbuffer',
                    callback:function(msg) {
                        submitEvent.removeAttribute("disabled");
                        var response = jQuery(msg).text();
                        try {
                            var responseObj = JSON.parse(response);

                            responseObj.status == 'PASSED' ?
                                ValidationModule.showSuccess(testButton, responseObj.message) :
                                ValidationModule.showError(testButton, responseObj.message, responseObj.details);
                        } catch (e)  {
                            dialogs.systemConfirm.show(response);
                        }
                    },
                    errorHandler: baseErrorHandler,
                    hideLoader: false
                }
            );
        },

        _isDataValid: function() {
            return ValidationModule.validate(this._validationEntries);
        },

        _sortTypeSelect: function() {
            var types = $(this.TYPE_ID);
            var selected = types.getValue();
            var sorter = new Array();

            for (i = 0; i < types.length; i++) {
                sorter[i] = new Array();
                sorter[i][0] = types.options[i].text;
                sorter[i][1] = types.options[i].value;
            }

            sorter.sort();

            while (types.options.length > 0) {
                types.options[0] = null;
            }

            for (var i = 0; i < sorter.length; i++) {
                if (sorter[i][1] == selected) {
                    types.options[i] = new Option(sorter[i][0], sorter[i][1], true, true);
                } else {
                    types.options[i] = new Option(sorter[i][0], sorter[i][1], false, false);
                }
            }
        }
    }, {
        subclasses : {
            aws : "AwsResourceDataSource",
            jdbc : "JdbcDataSourceEditor",
            virtual : "VirtualResourceDataSource",
            jndi : "JndiResourceDataSource",
            bean : "BeanResourceDataSource"
        },
        /**
         * Create new data source editor based on the given data source type.
         * If data source type is not contained among subclasses configuration object,
         * then create Default Data Source editor.
         *
         * @param options State initialization options
         * @return {exp[subclass || "ResourceDataSource"]}
         */
        createDataSourceWizard : function(options) {
            var subclass = ResourceDataSource.subclasses[options.type || "jdbc"];
            return new exp[subclass || "ResourceDataSource"](options);
        }
    });

    exp.ResourceDataSource = ResourceDataSource;
})({Backbone : Backbone, jQuery : jQuery, _ : _}, window);
