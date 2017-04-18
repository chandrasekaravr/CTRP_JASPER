;(function(imp, exp) {
    var $ = imp.jQuery,
        JdbcDataSourceEditor = imp.JdbcDataSourceEditor;

    var AwsResourceDataSource = JdbcDataSourceEditor.extend({

        initialize : function (options) {
            JdbcDataSourceEditor.prototype.initUploadDriverOnly.call(this, options);

            // Inputs initialization
            this.driver = $("#" + this.DRIVER_ID);
            this.url = $("#" + this.URL_ID);
            this.userName = $("#" + this.USER_NAME_ID);
            this.dbName = $("#dbName");
            this.awsAccessKey = $("#awsAccessKey");
            this.awsSecretKey = $("#awsSecretKey");
            this.awsArn = $("#arn");
            this.region = $("#region");
            this.dbInstanceIdentifier = $("#dbInstanceIdentifier");
            this.dbService = $("#dbService");
            this.refreshTreeButton = $("#refresh_tree_button");
            this.settingsRadio = $("input[name='awsSettings']");

            this.treePath = this.dbInstanceIdentifier.val() ? "/" + this.dbService.val() + "/" + this.dbInstanceIdentifier.val() : null;

            this.initValidation();
            this.initDatasourceTree(options);
            this.renderFromState(options);
            this._initAwsEvents();
        },

        renderFromState : function(options) {
            var isEdit = options.isEditMode;

            !isEdit && this.resetFieldValues(this.driver, this.url, this.userName, this.getPasswordInput());

            this.updateDriverUploadButton();
            // Do not try to load AWS Tree if we are creating DS in non-AWS environment without properly set credentials
            if (isEdit || this.settingsRadio.filter(':checked').val() == 0) {
                this.showAwsDsTree(this.treePath);
            }

        },

        initDatasourceTree : function (options) {
            var treeOptions = {
                hideLoader : true,
                bShowRoot : false,
                treeId : "awsDataSourceTree",
                providerId : 'awsDataSourceTreeDataProvider',
                selectLeavesOnly : true,
                treeOptions : {
                    organizationId : this.organizationId,
                    publicFolderUri : this.publicFolderUri
                },
                additionalParams : function () {
                    var awsParams = {};
                    $('#aws_settings, #aws_region').find("input, select").each(function (i, awsEl) {
                        awsParams[awsEl.id] = $(awsEl).val();
                    });
                    return awsParams;
                }
            };
            this.tree = dynamicTree.createRepositoryTree("awsDataSourceTree", treeOptions);

            this.node = null;

            // Init values for DS edit
            var isEdit = options.isEditMode,
                that = this;

            // Initialize tree events: auto-fill connection setting from tree leaf
            this.tree.observe('leaf:selected', function (ev) {
                that.node = ev.memo.node.param;
                if (that.node.type === "awsDb" && !isEdit) {
                    var extra = that.node.extra,
                        uriComponents = extra.dbUri.split("/"),
                        values = {dbHost : extra.dnsAddress, dbPort : extra.dbPort, dbName : extra.dBName, sName : extra.dBName};

                    that.url.val(that.generateDbUri(values, that.node.extra.jdbcTemplate));
                    that.driver.val(extra.jdbcDriverClass);
                    that.dbName.val(extra.dBName);
                    that.dbService.val(uriComponents[1]);
                    that.dbInstanceIdentifier.val(uriComponents[2]);
                    that.treePath = extra.dbUri;
                    that.updateDriverUploadButton();
                }
            });
            this.tree.observe('tree:loaded', function () {
                that.node = null;
                that.treePath && that.tree.openAndSelectNode(that.treePath, function () {
                    isEdit = false;
                });
            });
        },

        resetFieldValues : function(/* fields to remove */) {
            _.invoke(arguments, "val", "");
        },

        initValidation : function() {
            this.awsValidators = [];
            this.driverInstallValidationEntry = {
                element : this.driver[0],
                method : _.bind(this._driverValidator, this),
                messages : resource.messages['driverNotInstalled']
            };

            // Fields validation
            this._validationEntries.push({element : this.driver[0],
                validators : [{
                    method : "mandatory",
                    messages : {mandatory : resource.messages['driverIsEmpty']}
                },
                    this.driverInstallValidationEntry
                ]
            });
            this._validationEntries.push({element : this.url[0],
                method : "mandatory",
                messages : {mandatory : resource.messages['urlIsEmpty']}
            });
            this._validationEntries.push({element : this.userName[0],
                method : "mandatory",
                messages : {mandatory : resource.messages['userNameIsEmpty']}
            });
            this._validationEntries.push({element : this.dbName[0],
                method : "mandatory",
                messages : {mandatory : resource.messages['dbNameIsEmpty']}
            });

            this.awsValidators.push({element : this.awsAccessKey[0],
                method : this._awsUseDefaultDependentValidator,
                messages : {mandatory : resource.messages['awsAccessKeyIsEmpty']}
            });
            this.awsValidators.push({element : this.awsSecretKey[0],
                method : this._awsUseDefaultDependentValidator,
                messages : {mandatory : resource.messages['awsSecretKeyIsEmpty']}
            });
            this.awsValidators.push({element : this.region[0],
                method : "mandatory",
                messages : {mandatory : resource.messages['regionIsEmpty']}
            });

            this._validationEntries.concat(this.awsValidators);
        },

        ///////////////////////////////////
        // Event Handlers
        ///////////////////////////////////
        events :  {
            "keyup #dbName" : "fillDbName",
            "input #dbName" : "fillDbName",
            "keyup #driverID" : "updateDriverUploadButton"
        },

        _initAwsEvents : function() {
            var that = this;

            // Enable disable AWS Settings fields depending on selected radio
            this.settingsRadio.change(function (ev) {
                var checkedDefaults = $(ev.currentTarget).val() == "0";
                $.each([that.awsAccessKey, that.awsSecretKey, that.awsArn], function (i, input) {
                    input[checkedDefaults ? 'attr' : 'removeAttr']("readonly", "true");
                    input.val("");
                });
                if (checkedDefaults) {
                    that.showAwsDsTree(that.treePath);
                }
            });

            // Refresh tree button handler
            this.refreshTreeButton.click(function (e) {
                e.preventDefault();
                that.showAwsDsTree("/");
            });
        },

        fillDbName : function (ev) {
            if (this.node) {
                var newDbName = $(ev.target).val(),
                    extra = this.node.extra,
                    values = {dbHost : extra.dnsAddress, dbPort : extra.dbPort, dbName : newDbName, sName : newDbName};

                this.url.val(this.generateDbUri(values, extra.jdbcTemplate));
            }
        },

        driverUploadedHandler : function(newDriversData) {
            this.setAllDriversData(newDriversData);
            this.updateDriverUploadButton();
        },

        updateDriverUploadButton: function() {
            ValidationModule.validateEntry(this.driverInstallValidationEntry);
            this.refreshAddDriverButtonLabel(this.driver.val());
            this.refreshAddDriverButtonState();
        },
        /**
         * Overriden changeType handler to reset field values for driver, url, userName, password
         *
         * @param e Change Type Select input Event
         */
        changeType : function(e) {
            this.resetFieldValues(this.driver, this.url, this.userName, this.getPasswordInput());
            AwsResourceDataSource.__super__.changeType.call(this, e);
        },
        /**
         * Generate database URL from the given template in the form:
         *
         * jdbc:oracle:thin:@$[dbHost]:$[dbPort]:$[sName]
         *
         * @param object
         * @param template
         * @return {*}
         */
        generateDbUri : function(object, template) {
            if (!template) {
                return "";
            }
            var variablePattern = /\$\[([\w]+)\]/g, result, uri = template;
            while ((result = variablePattern.exec(template)) != null) {
                uri = uri.replace(result[0], object[result[1]] || "");
            }
            return uri;
        },

        showAwsDsTree : function (path) {
            if (ValidationModule.validate(this.awsValidators)) {
                this.tree.showTreePrefetchNodes(path || "/");
            }
        },

        _awsUseDefaultDependentValidator : function (value, messages) {
            if (!$("#awsUseDefault").prop("checked") && !$.trim(value)) {
                return this._getMessage("mandatory", messages);
            }
            return null;
        },

        _driverValidator : function(value, message) {
            return this.getDriverSelector().val() && !this.isDriverAvailable(value) ? message : null;
        },

        getDriverSelector: function() {
            return this.driver;
        },

        isDriverAvailable: function(driverClass) {
            var driver = _.find(this.getAllDriversData(), function(driver) {
                return driver.jdbcDriverClass === driverClass;
            });
            return driver && driver.available;
        }
    });

    exp.AwsResourceDataSource = AwsResourceDataSource;
})({
    jQuery : jQuery,
    JdbcDataSourceEditor : JdbcDataSourceEditor
}, window);