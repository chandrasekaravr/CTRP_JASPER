;(function(imp, exp) {
    var $ = imp.jQuery,
        Dialog = imp.Dialog;


    var JdbcDataSourceEditor = ResourceDataSource.extend({
        DRIVER_ID: "driverID",
        URL_ID: "urlID",
        USER_NAME_ID: "userNameID",

        ADD_DRIVER_BUTTON_ID: "addDriverBtn",
        DRIVER_SELECTOR_ID: "driverSelector",
        PASSWORD_INPUT: "passwordID",
        FIELDS_CONTAINER: "jdbcFields",
        FIELD_TEMPLATE_ID: "jdbcFieldTemplate",

        JDBC_BUNDLE_PREFIX: "resource.dataSource.jdbc.",

        OTHER_DRIVER_SELECTOR_VALUE: "other",

        FIELD_TEMPLATE_REGEXP: /\$\[([^\]]+)\]/g,
        FIELD_VALUE_REGEXP_TEXT: "([\\w.]*)",

        _driverSelector: null,
        _urlInput: null,
        _urlHint: null,
        _driverClassNameInput: null,
        _addDriverButton: null,
        _fieldsContainer: null,
        _fieldTemplateText: null,
        _userNameInput: null,
        _passwordInput: null,

        // All available drivers information.
        _allDriversData: null,
        // If we're in edit mode, it's information about existing driver, otherwise just state NEW.
        _existingDriverData: null,
        // Data of the driver, which is currently selected in driver selector.
        _currentDriverData: null,

        // States of Datasource

        // User creates new DS.
        NEW: "new",
        // User edits pre-defined DS.
        PRE_DEFINED: "preDefined",
        // User edits DS which has wrong URL.
        PRE_DEFINED_WRONG_URL: "preDefinedWrongUrl",
        // User edits DS which has not pre-defiend driver.
        UPLOADED: "uploaded",
        // User edits DS which has not pre-defiend driver, and driver actually is missing.
        UPLOADED_MISSING: "uploadedMissing",

        initialize: function(options) {
            this.initUploadDriverOnly(options);

            this.setExistingDriverData();

            this.fillJdbcDriverDropdown(this.getAllDriversData());
            var selectedDriver = this.determineSelectedDriver();
            this.setSelectedDriver(selectedDriver);

            this.addUrlListener();
            this.addDriverClassNameInputListener();
            this.addJdbcDriverListener();
            this.getDriverSelector().change();
            this.initValidation();
        },

        initUploadDriverOnly: function(options) {
            ResourceDataSource.prototype.initialize.call(this, options);
            this.uploadJDBCDriverDialog = new UploadFileDialog(this);
            this.setAllDriversData(options.jdbcDrivers);
            this.getAddDriverButton().on('click', this.uploadJDBCDriverDialog.show);

            this.initValidationPatterns(options);
        },

        determineSelectedDriver: function() {
            var driverName;
            var data = this.getExistingDriverData();
            switch (data.state) {
                case this.NEW:
                    driverName = this.getDefaultDriver(this.getAllDriversData());
                    break;
                case this.PRE_DEFINED:
                    driverName = data.name;
                    break;
                case this.PRE_DEFINED_WRONG_URL:
                    driverName = this.OTHER_DRIVER_SELECTOR_VALUE;
                    break;
                case this.UPLOADED:
                    driverName = data.name;
                    break;
                case this.UPLOADED_MISSING:
                    driverName = this.OTHER_DRIVER_SELECTOR_VALUE;
                    break;
            }
            return driverName;
        },

        driverUploadedHandler: function(newDriversData) {
            this.setAllDriversData(newDriversData);
            var selectedDriver = this.getDriverSelector().val();
            if (selectedDriver === this.OTHER_DRIVER_SELECTOR_VALUE) {
                var customDriverClassName = this.getDriverClassNameInput().val();
                var data = _.find(this.getAllDriversData(), function(data, name) {
                    return customDriverClassName === name;
                });
                if (!_.isUndefined(data)) {
                    selectedDriver = data.name;
                }
            }
            this.fillJdbcDriverDropdown(this.getAllDriversData());
            this.setSelectedDriver(selectedDriver);
            this.refreshAddDriverButtonState();
        },

        isUrlParsable: function(url) {
            var driverClassName = this.getDriverClassNameInput().val();

            var data = _.find(this.getAllDriversData(), function(data) {
                if (!data.isCustom) {
                    return driverClassName === data.jdbcDriverClass;
                }
            });

            // If driver is predefined
            if (data) {
                var regExp = XRegExp(this.convertUrlTemplateToRegex(data.jdbcUrl));
                return regExp.test(url);
            } else {
                // If driver class name not found within pre-defined drivers.
                throw "Driver not found " + driverClassName;
            }
        },

        initValidationPatterns: function(options) {
            this.dynamicUrlPartPattern = options.dynamicUrlPartPattern;

            this.validationPatterns = _.reduce(options.validationPatterns, function(obj, value, propName) {
                obj[propName] = XRegExp(value);
                return obj;
            }, {});
        },

        initValidation: function() {
            this._validationEntries.push({element: this.getDriverClassNameInput().get(0),
                method: "mandatory",
                messages: {mandatory: resource.messages['driverIsEmpty']}
            });
            this._validationEntries.push({element: this.getDriverClassNameInput().get(0),
                validator: function(value) {
                    var isValid = value.indexOf(" ") < 0;   // todo: implement regExp validation if more chars restriction required
                    var errorMessage = (isValid) ? "" : resource.messages['driverHasInvalidChar'];
                    return { isValid: isValid, errorMessage: errorMessage };
                }
            });
            this._validationEntries.push({element: this.getUrlInput().get(0),
                validator: function(value) {
                    var isValid = value.indexOf(" ") < 0;   // todo: implement regExp validation if more chars restriction required
                    var errorMessage = (isValid) ? "" : resource.messages['urlHasInvalidChar'];
                    return { isValid: isValid, errorMessage: errorMessage };
                }
            });
            this._validationEntries.push({element: this.getUserNameInput().get(0),
                method: "mandatory",
                messages: {mandatory: resource.messages['userNameIsEmpty']}
            });
        },

        replaceMessageWithFieldName: function(message, label) {
            return message.replace("{0}", label);
        },

        // Make redundancy in data in order to easily use data
        // and to unify work with pre-defined and uploaded drivers.
        setAllDriversData: function(driversData) {
            this._allDriversData = {};
            _.each(driversData, function(data, name) {
                this._allDriversData[name] = !_.isNull(data)
                    ? _.extend({}, {name: name}, data)
                    : _.extend({}, {name: name, label: name, jdbcDriverClass: name, available: true, isCustom: true});
            }, this);
        },

        getAllDriversData: function() {
            return this._allDriversData;
        },

        // If in edit mode, remember existing driver
        setExistingDriverData: function() {
            this._existingDriverData = {};
            var driverClassName = this.getDriverClassNameInput().val();
            if (!_.isEmpty(driverClassName)) {
                this._existingDriverData.className = driverClassName;
                this._existingDriverData.url = this.getUrlInput().val();
                this._existingDriverData.userName = this.getUserNameInput().val();
                this._existingDriverData.password = this.getPasswordInput().val();

                var data = this.getDriverDataByClassName(driverClassName);
                if (data) {
                    this._existingDriverData.name = data.name;
                    if (data.isCustom) {
                        this._existingDriverData.state = this.UPLOADED;
                    } else {
                        if (this.isUrlParsable(this._existingDriverData.url)) {
                            this._existingDriverData.state = this.PRE_DEFINED;
                        } else {
                            this._existingDriverData.state = this.PRE_DEFINED_WRONG_URL;
                        }
                    }
                } else {
                    this._existingDriverData.state = this.UPLOADED_MISSING;
                }
            } else {
                this._existingDriverData.state = this.NEW;
            }
        },

        getExistingDriverData: function() {
            return this._existingDriverData;
        },

        // Remember tha data of currently selected driver,
        // if "Other..." driver was selected, set only it`s name.
        setCurrentDriverData: function(other) {
            this._currentDriverData = {};
            if (!other) {
                this._currentDriverData.name = this.getDriverSelector().val();
                var urlTemplate = this.getAllDriversData()[this._currentDriverData.name].jdbcUrl;
                this._currentDriverData.jdbcFields = this.getFieldsFromJdbcUrlTemplate(urlTemplate);
                this._currentDriverData.jdbcLabels = this.getLabelsForJdbcFields(this._currentDriverData.jdbcFields.concat("urlID"));
                this._currentDriverData.urlRegExp = XRegExp(this.convertUrlTemplateToRegex(urlTemplate));
            } else {
                this._currentDriverData.name = this.OTHER_DRIVER_SELECTOR_VALUE;
            }
        },

        getCurrentDriverData: function() {
            return this._currentDriverData;
        },

        // Find driver data by it's class name, return undefined if not found.
        getDriverDataByClassName: function(driverClassName) {
            return _.find(this.getAllDriversData(), function(data) {
                return driverClassName === data.jdbcDriverClass;
            });
        },

        // Returns first found default value or first one if not found
        // or undefined if there is empty drivers data.
        getDefaultDriver: function(driversData) {
            var data = _.find(driversData, function(data) {
                return !_.isUndefined(data['default']);
            });

            return !_.isUndefined(data)
                ? data.name
                : !_.isEmpty(_.values(driversData))
                ? _.values(driversData)[0].name
                : undefined;
        },

        // Fill driver select with available drivers
        fillJdbcDriverDropdown: function(jdbcDriverMap) {
            var fragment = document.createDocumentFragment();
            _.each(jdbcDriverMap, function (data, name) {
                var option = $("<option>", {
                    value: name,
                    text: !data.isCustom
                        // This is predefined driver.
                        ? (!data.available ? this.getLabel("driverMissing", " ") : "") + data.label + " (" + data.jdbcDriverClass + ")"
                        // This is uploaded driver.
                        : data.name
                });
                fragment.appendChild(option.get(0));
            }, this);
            fragment.appendChild(this.addOtherItem().get(0));
            this.getDriverSelector().html(fragment);
        },

        addOtherItem: function() {
            return $("<option>", {
                value: this.OTHER_DRIVER_SELECTOR_VALUE,
                text: this.getLabel("otherDriver")
            });
        },

        // Select existing driver
        setSelectedDriver: function(selectedDriver) {
            this.getDriverSelector().val(selectedDriver);
        },

        // When user changes driver, create new fields and fill them with defaults for new datasourse,
        // or reverse parse existing url for existing datasource. Update Add/Edit Driver button label.
        jdbcDriverSelectorListener: function(e) {
            var name = this.getDriverSelector().val();
            var state = this.getExistingDriverData().state;

            // Pre-defined driver
            if (name !== this.OTHER_DRIVER_SELECTOR_VALUE && !this.getAllDriversData()[name].isCustom) {
                this.fillPreDefinedDriverInformation(name);
                // Custom driver
            } else if (name !== this.OTHER_DRIVER_SELECTOR_VALUE && this.getAllDriversData()[name].isCustom) {
                this.fillCustomDriverInformation(name);
                // Other edit
            } else if (name === this.OTHER_DRIVER_SELECTOR_VALUE
                && (state === this.UPLOADED_MISSING || state === this.PRE_DEFINED_WRONG_URL)) {
                this.fillCustomDriverInformation(this.getExistingDriverData().className);
                this.showDriverClassNameInput();
                // Other new
            } else if (name === this.OTHER_DRIVER_SELECTOR_VALUE) {
                this.enableOtherDriverMode();
            }

            // Refresh Add/Edit driver button state
            this.refreshAddDriverButtonLabel(name);
            this.refreshAddDriverButtonState();
        },

        // Add listener to driver selector change event.
        addJdbcDriverListener: function() {
            this.getDriverSelector().change(this.jdbcDriverSelectorListener.bindAsEventListener(this));
        },

        fillPreDefinedDriverInformation: function(name) {
            var driverData = this.getAllDriversData()[name];
            var jdbcFields = this.getFieldsFromJdbcUrlTemplate(driverData.jdbcUrl);

            this.hideDriverClassNameInput();
            this.getUrlHint().hide();

            this.addJdbcFieldsToDom(jdbcFields);

            var url, userName, password;
            if (this.getExistingDriverData().className === driverData.jdbcDriverClass) {
                url = this.getExistingDriverData().url;
                userName = this.getExistingDriverData().userName;
                password = this.getExistingDriverData().password;
            } else {
                url = this.replaceJdbcTemplatePlaceholdersWithValues(driverData.jdbcUrl, driverData.defaultValues);
                userName = password = "";
            }

            this.setConnectionData(driverData.jdbcDriverClass, url, userName, password);

            // Set current data BEFORE triggering url input keyup.
            this.setCurrentDriverData();

            this.removeUrlListener();
            this.addUrlListener();
            this.getUrlInput().keyup();
        },

        fillCustomDriverInformation: function(driverClassName) {
            this.getFieldsContainer().empty();
            this.removeUrlListener();
            this.hideDriverClassNameInput();

            var url, userName, password;
            if (this.getExistingDriverData().className === driverClassName) {
                url = this.getExistingDriverData().url;
                userName = this.getExistingDriverData().userName;
                password = this.getExistingDriverData().password;
            } else {
                url = userName = password = "";
            }

            this.setConnectionData(driverClassName, url, userName, password);
            this.getUrlHint().show();
        },

        enableOtherDriverMode: function() {
            this.getFieldsContainer().empty();
            this.removeUrlListener();
            this.setConnectionData("", "", "", "");
            this.showDriverClassNameInput();
            this.getUrlHint().show();
            this.setCurrentDriverData(true);
        },

        setConnectionData: function(driverClassName, url, userName, password) {
            this.getDriverClassNameInput().val(driverClassName);
            this.getUrlInput().val(url);
            this.getUserNameInput().val(userName);
            this.getPasswordInput().val(password);
        },

        // Create and add jdbc field inputs to Dom
        addJdbcFieldsToDom: function(jdbcFields) {
            var fragment = document.createDocumentFragment();

            var jdbcLabels = this.getLabelsForJdbcFields(jdbcFields);
            _.each(jdbcLabels, function(value, key) {
                fragment.appendChild($(this.getFilledTemplate({
                    name: key,
                    label: value + this.getLabel("required.field", "):", " ("),
                    title: this.replaceMessageWithFieldName(this.getLabel("requiredTitle"), value.toLowerCase())
                })).get(0));
            }, this);

            this.getFieldsContainer().html(fragment);

            _.each(jdbcFields, function(field) {
                this.addFieldListener(field);
            }, this);
        },

        // Replace placeholders with values, if value is not present, set empty string.
        replaceJdbcTemplatePlaceholdersWithValues: function(urlTemplate, valuesMap) {
            var groups = this.getRegExpFieldGroupsFromUrlTemplate(urlTemplate);
            _.each(groups, function(group) {
                urlTemplate = urlTemplate.replace(group[0], !_.isUndefined(valuesMap[group[1]]) ? valuesMap[group[1]] : "" );
            });
            return urlTemplate;
        },

        // Convert url template to regexp template
        convertUrlTemplateToRegex: function(urlTemplate) {
            var patternTemplate = urlTemplate;
            // escaping ? otherwise regexp will not match to url "jdbc:sybase:Tds:localhost:5433?ServiceName=name"
            patternTemplate = patternTemplate.replace(/\?/g, "\\?");

            // replacing dynamic parts
            for (var patternName in this.validationPatterns) {
                var placeholderPattern = new RegExp("\\$\\[" + patternName + "\\]","g")
                patternTemplate = patternTemplate.replace(placeholderPattern, this.dynamicUrlPartPattern);
            }
            return "^" + patternTemplate;
        },

        // Get labels for fields and return as a map
        getLabelsForJdbcFields: function(jdbcFields) {
            var jdbcLabels = {};
            _.each(jdbcFields, function(field) {
                jdbcLabels[field] = this.getLabel(field);
            }, this);
            return jdbcLabels;
        },

        // Fill mustache template with data and return as a string
        getFilledTemplate: function(data) {
            return Mustache.to_html(this.getFieldTemplateText(), data);
        },

        // Parse url template and return fields in array
        getFieldsFromJdbcUrlTemplate: function(urlTemplate) {
            var groups = this.getRegExpFieldGroupsFromUrlTemplate(urlTemplate);
            var fields = [];
            _.each(groups, function(group) {
                return fields.push(group[1]);
            });
            return fields;
        },

        // Evaluate regexp on urlTemplate and return all found groups.
        getRegExpFieldGroupsFromUrlTemplate: function(urlTemplate) {
            var groups = [], group;
            while (!_.isNull(group = this.FIELD_TEMPLATE_REGEXP.exec(urlTemplate))) {
                if (_.isArray(group) && group.length === 2) {
                    groups.push(group);
                }
            }
            return groups;
        },

        _regExpValidatorMethod: function(value, messages, options) {
            return {
                isValid: options.pattern && options.pattern.test(value),
                errorMessage: messages[0]
            };
        },

        _getFiledRegExpValidators: function(filed, regExp) {
            return {
                validators: [{
                    method: this._regExpValidatorMethod,
                    options: {pattern: regExp},
                    messages: [this.getErrorMessage(filed)]
                }],

                element: filed.get(0)
            };
        },

        // Check if entered url passed reg exp,
        // if yes, parse it accordingly to template and fill jdbc fields with values,
        // otherwise, show the error.
        getUrlListener: function(_this) {
            return function(e) {
                var urlInput = $(this);
                var url = urlInput.val();
                var regExp = _this.getCurrentDriverData().urlRegExp;

                var isValid = ValidationModule.validate(_this._getFiledRegExpValidators(urlInput, regExp), true);

                if (isValid) {
                    var fieldValues = _this.getFieldValuesFromUrl(url, regExp);
                    var jdbcFields = _this.getCurrentDriverData().jdbcFields;
                    _this.fillJdbcFieldsWithValues(jdbcFields, fieldValues);
                    _this.validateJdbcFields(jdbcFields);
                }
            }
        },

        // Refresh the Add/Edit Driver button state
        refreshAddDriverButtonState: function() {
            var btn = $("#" + this.ADD_DRIVER_BUTTON_ID);
            if(btn.length == 0) {
                return;
            }

            var input = this.getDriverClassNameInput();
            if (_.isEmpty(input.val())) {
                buttonManager.disable(this.ADD_DRIVER_BUTTON_ID);
            } else {
                buttonManager.enable(this.ADD_DRIVER_BUTTON_ID);
            }
        },

        // Set Add/Edit driver button label. Hide the driver class name input.
        refreshAddDriverButtonLabel: function(name) {
            var buttonLabel = (this.isDriverAvailable(name))
                ? this.getLabel("upload.editDriverButton") : this.getLabel("upload.addDriverButton");
            this.getAddDriverButton().find('.wrap').html(buttonLabel);
        },

        isDriverAvailable: function(name) {
            var data = this.getAllDriversData()[name];
            return data && data.available;
        },

        addDriverClassNameInputListener: function() {
            this.getDriverClassNameInput().keyup(this.refreshAddDriverButtonState.bindAsEventListener(this));
        },

        // Add listener to url field keyup event.
        addUrlListener: function() {
            this.getUrlInput().keyup(this.getUrlListener(this));
        },

        // Remove keyup listener from Url input.
        removeUrlListener: function() {
            this.getUrlInput().off("keyup");
        },

        // Extract jdbc field values from url accordingly to template.
        getFieldValuesFromUrl: function(url, regExp) {
            var groups = regExp.exec(url);
            return [].slice.call(groups || [], 1);
        },

        getFieldValuesFromUrlAsMap: function(url, regExp, jdbcFields) {
            var fieldsWithValues = {};

            _.each(this.getFieldValuesFromUrl(url, regExp), function(group, i) {
                fieldsWithValues[jdbcFields[i]] = group;
            });

            return fieldsWithValues;
        },

        // Set values to jdbc fields.
        fillJdbcFieldsWithValues: function(jdbcFields, fieldValues) {
            _.each(jdbcFields, function(field, i) {
                var fieldValue = fieldValues[i];
                $("#" + field).val(fieldValue);
            });
        },

        validateJdbcFields: function(jdbcFields) {
            var _this = this;
            _.each(jdbcFields, function(field, i) {
                var thisField = $("#" + field);
                var validationPattern = _this.validationPatterns[thisField.attr("id")];
                ValidationModule.validate(_this._getFiledRegExpValidators(thisField, validationPattern), true);
            });
        },

        hideJdbcFieldsErrors: function(jdbcFields) {
            var _this = this;
            _.each(jdbcFields, function(field, i) {
                var thisField = $("#" + field);
                ValidationModule.hideError(thisField.get(0));
            });
        },

        getErrorMessage: function(thisField) {
            var label = this.getCurrentDriverData().jdbcLabels[thisField.attr("id")];
            return this.replaceMessageWithFieldName(this.getLabel("invalidField"), label);
        },

        getFieldListener: function(_this) {
            return function(e) {
                var thisField = $(this);
                var fieldId = thisField.attr("id");
                var validationPattern = _this.validationPatterns[fieldId];

                var newFieldValues = {};
                _.each(_this.getCurrentDriverData().jdbcFields, function(field) {
                    newFieldValues[field] = $("#" + field).val();
                });

                var fullOldUrl = _this.getUrlInput().val();

                var isFieldValid = ValidationModule.validate(
                    _this._getFiledRegExpValidators(thisField, validationPattern), true);

                var newUrl;
                if (isFieldValid) {
                    var regExp = _this.getCurrentDriverData().urlRegExp;
                    newUrl = _this.updateUrl(fullOldUrl, fieldId, newFieldValues[fieldId]);

                    var isNewUrlValid = _this._regExpValidatorMethod(newUrl, [""], {pattern: regExp}).isValid;
                    if (isNewUrlValid) {
                        _this.getUrlInput().val(newUrl);
                    }
                } else if (_.isEmpty(newFieldValues[fieldId])) {
                    var driverData = _this.getAllDriversData()[_this.getCurrentDriverData().name] ;
                    var defaultValue = driverData.defaultValues[fieldId];

                    newUrl = _this.updateUrl(fullOldUrl, fieldId, defaultValue || fieldId);
                    _this.getUrlInput().val(newUrl);
                }
            }
        },

        generateNewUrl: function(url, values) {
            var regExp = this.getCurrentDriverData().urlRegExp;
            var jdbcUrl = this.getAllDriversData()[this.getCurrentDriverData().name].jdbcUrl;
            var newBaseUrl = this.replaceJdbcTemplatePlaceholdersWithValues.call(this, jdbcUrl, values);
            return url.replace(regExp, newBaseUrl);
        },

        updateUrl: function(url, fieldId, value) {
            var driverData = this.getCurrentDriverData();
            var regExp = driverData.urlRegExp;

            var fieldValues = this.getFieldValuesFromUrlAsMap(url, regExp, driverData.jdbcFields);
            fieldValues[fieldId] = value;

            var jdbcUrl = this.getAllDriversData()[driverData.name].jdbcUrl;
            var newBaseUrl = this.replaceJdbcTemplatePlaceholdersWithValues.call(this, jdbcUrl, fieldValues);
            return url.replace(regExp, newBaseUrl);
        },

        addFieldListener: function(fieldName) {
            var field = $("#" + fieldName);
            field.keyup(this.getFieldListener(this));
            field.change(this.getFieldListener(this));
        },

        // It's edit mode if driver exists.
        isEditMode: function() {
            return this._isEditMode;
        },

        // Get cached jQuery object of driver selector.
        getDriverSelector: function() {
            if(_.isNull(this._driverSelector)) {
                this._driverSelector = $("#" + this.DRIVER_SELECTOR_ID);
            }
            return this._driverSelector;
        },

        // Get cached jQuery object of url input.
        getUrlInput: function() {
            if(_.isNull(this._urlInput)) {
                this._urlInput = $("#" + this.URL_ID);
            }
            return this._urlInput;
        },

        // Get cached jQuery object of url input.
        getUrlHint: function() {
            if(_.isNull(this._urlHint)) {
                this._urlHint = this.getUrlInput().nextAll("span.message.hint");
            }
            return this._urlHint;
        },

        // Get cached jQuery object of driver class name input.
        getDriverClassNameInput: function() {
            if(_.isNull(this._driverClassNameInput)) {
                this._driverClassNameInput = $("#" + this.DRIVER_ID);
            }
            return this._driverClassNameInput;
        },

        // Get cached jQuery object of fields container.
        getFieldsContainer: function() {
            if(_.isNull(this._fieldsContainer)) {
                this._fieldsContainer = $("#" + this.FIELDS_CONTAINER);
            }
            return this._fieldsContainer;
        },

        // Get cached field template text.
        getFieldTemplateText: function() {
            if(_.isNull(this._fieldTemplateText)) {
                this._fieldTemplateText = $("#" + this.FIELD_TEMPLATE_ID).html();
            }
            return this._fieldTemplateText;
        },

        // Get cached jQuery object of the driver button.
        getAddDriverButton: function() {
            if(_.isNull(this._addDriverButton)) {
                this._addDriverButton = $("#" + this.ADD_DRIVER_BUTTON_ID);
            }
            return this._addDriverButton;
        },

        // Get cached field template text.
        getUserNameInput: function() {
            if(_.isNull(this._userNameInput)) {
                this._userNameInput = $("#" + this.USER_NAME_ID);
            }
            return this._userNameInput;
        },

        // Get cached field template text.
        getPasswordInput: function() {
            if(_.isNull(this._passwordInput)) {
                this._passwordInput = $("#" + this.PASSWORD_INPUT);
            }
            return this._passwordInput;
        },

        getLabel: function(key, postfix, prefix) {
            return (prefix ? prefix : "") + resource.messages[this.JDBC_BUNDLE_PREFIX + key] + (postfix ? postfix : "");
        },

        showDriverClassNameInput: function() {
            this.getDriverClassNameInput().parent().removeClass("hidden");
        },

        hideDriverClassNameInput: function() {
            this.getDriverClassNameInput().parent().addClass("hidden");
        },

        _uploadDrivers: function (inputs) {
            var that = this, uploadForm;
            var endUploadCallback = function(response) {
                if (typeof(response) == 'string') {
                    response = response.evalJSON();
                }
                if (response.result === true) {
                    // TODO: replace evalJSON with another approach.
                    var updatedJdbcDrivers = response.jdbcDriversJSON.evalJSON();
                    that.driverUploadedHandler(updatedJdbcDrivers);

                    that.uploadJDBCDriverDialog.hide();
                    dialogs.systemConfirm.show(resource.messages["resource.dataSource.jdbc.upload.driverUploadSuccess"]);
                } else {
                    that.uploadJDBCDriverDialog.setError(response.errorMessage);
                }
                uploadForm && uploadForm.remove();
            };

            var inputFiles = [];
            for (var i=0; i<inputs.length; i++) {
                var input = inputs[i];
                var value = $(input).val();
                if (value !== "" && value.match(/.jar$/)) {
                    input.name = "file_" + i;
                    inputFiles.push(input);
                }
            }

            if (inputFiles.size() > 0) {
                var options = {
                    className: $("#" + this.DRIVER_ID).val().trim(),
                    _eventId: "upload",
                    _flowExecutionKey: localContext.flowExecutionKey
                };

                uploadForm = fileSender.uploadMultiple(inputFiles, 'addDataSourceFlow', options, endUploadCallback)
            }
        }
    });

    /////////////////////////////////////////
    // Upload File Dialog
    /////////////////////////////////////////

    var UploadFileDialog = Dialog.extend({
        TEMPLATE_ID : 'uploadDriverDialogTemplate',
        _FILE_INPUTS_LIST_ID: "fileInputsList",
        _FILE_INPUT_TEMPLATE_ID: "fileUploadTemplate",
        _ERROR_MESSAGE_ID: "errorMessage",
        _WARNING_MESSAGE_ID: "warningMessage",

        _OK_BUTTON_ID: 'selectDialogOk',
        _CANCEL_BUTTON_ID: 'selectDialogCancel',
        _UPLOAD_DRIVER_PREFIX: "file_",
        _uploadFormEl: null,
        _fileUploadTemplateText: null,

        initialize : function(resourceDataSource) {
            Dialog.prototype.initialize.apply(this, arguments);
            _.bind(this.show, this);

            this.options.modal = true;
            this._resourceDataSource = resourceDataSource;

            this.render();
            this._uploadFormEl = $('#'+this._FILE_INPUTS_LIST_ID);

            // set Upload button label
            $('#'+this._OK_BUTTON_ID).find('.wrap').html(resource.messages["button.upload"]);
        },

        show: function() {
            Dialog.prototype.show.call(this);

            this.$el.find('#'+this._ERROR_MESSAGE_ID).removeClass(layoutModule.ERROR_CLASS);

            this._uploadFormEl.empty();
            this._addInput();

            var driverName = this._resourceDataSource.getDriverSelector().val();
            if (this._resourceDataSource.isDriverAvailable(driverName)) {
                this.setWarning(resource.messages["resource.dataSource.jdbc.upload.overwriteWarning"]);
            } else {
                this.clearWarning();
            }
        },

        setWarning: function(message) {
            this.$el.find('#'+this._WARNING_MESSAGE_ID+' span').html(message);
            this.$el.find('#'+this._WARNING_MESSAGE_ID).removeClass(layoutModule.HIDDEN_CLASS);

        },
        clearWarning: function() {
            this.$el.find('#'+this._WARNING_MESSAGE_ID).addClass(layoutModule.HIDDEN_CLASS);
        },
        clearError: function(inputId) {
            var errorDiv = $(this.$el.find('#'+inputId)[0].up());
            errorDiv.removeClass(layoutModule.ERROR_CLASS);
        },
        setError: function(message, inputId) {
            var errorDiv;
            if(_.isUndefined(inputId)) {
                errorDiv = $(this.$el.find('#'+this._ERROR_MESSAGE_ID)[0]);
            } else {
                errorDiv = $(this.$el.find('#'+inputId)[0].up());
            }
            errorDiv.find('span').html(message);
            errorDiv.addClass(layoutModule.ERROR_CLASS);
        },

        // Adds another file input
        _addInput: function() {
            var fileId = this._UPLOAD_DRIVER_PREFIX + this._uploadFormEl.children().size();
            this._uploadFormEl.append(this._getFileUploadTemplate({fileId: fileId}));
        },

        events : {
            "click .footer > .action.button" : "_dialogClickHandler",
            "change #fileInputsList input[type='file']" : "_fileInputChangeHandler"
        },

        // Handlers for Ok(Upload) and Cancel dialog buttons
        _dialogClickHandler: function(e) {
            var elem = Event.element(e);
            var button = matchAny(elem, [layoutModule.BUTTON_PATTERN], true);
            if (button) {
                if (button.match('button#' + this._OK_BUTTON_ID)) {
                    this._resourceDataSource._uploadDrivers(this.$el.find('input'));
                    return;
                }
                if (button.match('button#' + this._CANCEL_BUTTON_ID)) {
                    this.hide();
                    return;
                }
            }
        },

        _fileInputChangeHandler : function(e) {
            var elem = Event.element(e);
            var inputCount = this._uploadFormEl.children().size() - 1;
            this.clearError(elem.id);
            if (!$(elem).val().match(/.jar$/)) {
                this.setError(resource.messages["resource.dataSource.jdbc.upload.wrongExtension"],elem.id);
                return;
            } else if (elem.id === this._UPLOAD_DRIVER_PREFIX + inputCount) {
                this._addInput();
            }
        },

        // Fill mustache template with data and return as a string
        _getFileUploadTemplate: function(data) {
            return Mustache.to_html(this.getFileUploadTemplateText(), data);
        },

        // Get cached file upload template text.
        getFileUploadTemplateText: function() {
            if(_.isNull(this._fileUploadTemplateText)) {
                this._fileUploadTemplateText = $("#" + this._FILE_INPUT_TEMPLATE_ID).html();
            }
            return this._fileUploadTemplateText;
        }
    });

    exp.JdbcDataSourceEditor = JdbcDataSourceEditor;
    exp.UploadFileDialog = UploadFileDialog;

})({
    jQuery : jQuery,
    Dialog : jaspersoft.components.Dialog
}, window);