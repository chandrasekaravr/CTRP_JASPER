;(function(imp, exp) {
    var $ = imp.jQuery;

    var VirtualResourceDataSource = ResourceDataSource.extend({
        SUB_DATASOURCES_TREE_ID: "subDataSourcesTree",
        SELECTED_SUB_DATASOURCES_LIST_ID: "selectedSubDataSourcesList",

        initialize : function(options) {
            var that = this;
            ResourceDataSource.prototype.initialize.call(this, options);

            this._showDependentResources(options.dependentResources);

            this._selDsList = new dynamicList.List(this.SELECTED_SUB_DATASOURCES_LIST_ID, {
                listTemplateDomId: "selectedDataSourcesTemplate",
                itemTemplateDomId: "selectedDataSourcesTemplate:leaf",
                dragPattern: '', //no DnD for now
                multiSelect: true,
                selectOnMousedown: !isIPad()
            });

            var valEntry = {
                element: that._selDsList._getElement(),
                selector: "input.dataSourceID",
                validators: [
                    {method: "wordChars",
                        messages: resource.messages},
                    {method: "startsWithLetter",
                        messages: resource.messages},
                    {method: "mandatory",
                        messages: {mandatory: resource.messages['resourceIdIsEmpty']}},
                    {method: "minMaxLength",
                        messages: {tooLong: resource.messages['resourceIdToLong']},
                        options: {maxLength: resource.resourceIdMaxLength}}]
            };

            this._validationEntries.push(valEntry);
            that._selDsList._getElement().validationEntry = valEntry;


            this._selDsList.show();
            this._$selectedSubDs = $("#selectedSubDs");
            this._validationEntries.push(this._$selectedSubDs[0].validationEntry = {
                element: this._$selectedSubDs[0],
                method: this._subDatasourcesValidator.bind(this)
            });

            var readOnlyIDs = options.dependentResources && options.dependentResources.length > 0;
            var subDsArray = this._updateSelectedSubDsFromField(readOnlyIDs);

            var treeOptions = {
                treeId: this.SUB_DATASOURCES_TREE_ID,
                providerId: 'joinableDsTreeDataProvider',
                selectLeavesOnly: true,
                multiSelectEnabled: true,
                treeOptions: {
                    organizationId: this.organizationId,
                    publicFolderUri: this.publicFolderUri
                }
            };
            this._subDsTree = dynamicTree.createRepositoryTree(this.SUB_DATASOURCES_TREE_ID, treeOptions);
            var prefetchNodesUri = [];
            if(subDsArray) {
                prefetchNodesUri = _.map(subDsArray, function(subDs) {return subDs.dsUri});
            }
            this._subDsTree.showTreePrefetchNodes(prefetchNodesUri.join(","), function(arg) {
                that._hideAvailableSubDs(prefetchNodesUri);
            });

            this._initVDSEvents()
        },

        _showDependentResources: function(dependentResources) {
            if(!dependentResources || dependentResources.length == 0) {
                return;
            }
            dialogs.dependentResources.show(dependentResources,
                {}, //no actions, just inform user
                {
                    canSave: false,
                    okOnly: true,
                    topMessage: resource.messages["dependenciesTopMessage"],
                    bottomMessage: resource.messages["dependenciesBottomMessage"]
                });
        },

        _subDatasourcesValidator: function(value) {
            /**
             * Find all duplicated IDs of sub-datasources
             * @param subDS
             */
            function findDuplicateID(subDS) {
                var visitedIds = {};
                for(var i=0; i<subDS.length; i++) {
                    var dsId = subDS[i].dsId.toLowerCase();
                    if(visitedIds[dsId]) {
                        return dsId;
                    }
                    visitedIds[dsId] = true;
                }
                return null;
            }
            var subDSJson = this._$selectedSubDs.val();
            if(!subDSJson || subDSJson.length == 0) {
                subDSJson = "[]";
            }
            var subDS = subDSJson.evalJSON();

            var msg = null;
            if(!subDS || subDS.length < 2) {
                return resource.messages["subDatasourcesNeeded"];
            }
            var dupID = findDuplicateID(subDS);
            if(dupID) {
                return resource.messages["subDatasourcesIdDuplicates"].replace("{0}", dupID);
            }
            return null;
        },

        _updateSelectedSubDsFromField: function(readOnly) {
            var that = this;
            var subDsJson = this._$selectedSubDs.val();
            if(subDsJson == null || subDsJson.length == 0) {
                return null;
            }
            //TODO clean previous items
            var subDsArray = subDsJson.evalJSON(true);
            _.each(subDsArray, function(subDs) {
                subDs.readOnly = readOnly;
                that._addSubDsCore(subDs);
            });
            return subDsArray;
        },

        _updateSelectedSubDsField: function() {
            var list = this.getSubDatasources();
            var json = list.toJSON();
            this._$selectedSubDs.val(json);
        },

        getSubDatasources: function() { //get list of subDS objects
            var list = this._selDsList.getItems();
            list = _.map(list, function(item) {return item.getValue()});
            return list;
        },

        _initVDSEvents: function() { //init Virtual Data Source events
            var that = this;

            //init table selection buttons
            var butContainer = $("#subDsSelectionContainer .moveButtons");
            var btn = this._$dsSelButtons = {
                right: butContainer.find(".right"),
                left: butContainer.find(".left"),
                allLeft: butContainer.find(".toLeft")
            }

            function node2SubDs(node) { //convert tree node into subDs object
                if(!node) {
                    return null;
                } else {
                    return {dsName: node.name, dsId: node.param.id, dsUri: node.param.uri};
                };
            }
            that._subDsHiddenNodes = {};

            function handleDsChoiceEvent(ev) {
                btn.right.attr("disabled", true);
                btn.right.removeClass("over");
                ev.preventDefault();
                var nodes = that._subDsTree.selectedNodes;
                _.each(nodes, function(node) {
                    var selDs = node2SubDs(node);
                    if(selDs) {
                        that._addSubDsCore(selDs);
                    }
                });
                var nodeUris = _.map(nodes, function(node) {
                    return node.param.uri;
                });
                that._hideAvailableSubDs(nodeUris);
                that._updateSelectedSubDsField();

                //select moved nodes in selected DS list
                that._selDsList.resetSelected();
                _.each(that._selDsList.getItems(), function(item) {
                    if(_.indexOf(nodeUris, item.getValue().dsUri) >= 0 ) {
                        that._selDsList.selectItem(item, true);
                    }
                });
                updateAllLeftState();
            };
            btn.right.click(handleDsChoiceEvent);
            this._subDsTree.observe("leaf:dblclick", handleDsChoiceEvent);

            btn.left.click(function(ev) {
                ev.preventDefault();
                that._removeSelectedSubDs();
                updateAllLeftState();
                updateRightState();
            });
            btn.allLeft.click(function(ev) {
                ev.preventDefault();
                that._removeAllSubDs();
                updateAllLeftState();
                updateRightState();
            });

            function updateAllLeftState() {
                var items = that._selDsList.getItems();
                if(items.length > 0 && !containsReadOnly(items)) {
                    btn.allLeft.removeAttr("disabled");
                } else {
                    btn.allLeft.attr("disabled", true);
                    btn.allLeft.removeClass("over");
                }
            }
            function updateRightState() {
                var nodes = that._subDsTree.selectedNodes;
                var hasMovables = false;
                var hasUnmovables = false;
                for(var i=0; i<nodes.length; i++) {
                    if(nodes[i].isParent() || isDsSelected(nodes[i].param.uri)) {
                        hasUnmovables = true;
                        break;
                    } else {
                        hasMovables = true;
                    }
                }

                if(hasMovables && !hasUnmovables) {
                    btn.right.removeAttr("disabled");
                } else {
                    btn.right.attr("disabled", true);
                }
            }
            function updateLeftState() {
                var items = that._selDsList.getSelectedItems();
                if(items.length > 0) {
                    btn.left.removeAttr("disabled");
                } else {
                    btn.left.attr("disabled", true);
                    btn.left.removeClass("over");
                }
            }
            function isDsSelected(uri) {
                var subDS = that.getSubDatasources();
                for(var i=0; i<subDS.length; i++) {
                    if(subDS[i].dsUri == uri) {
                        return true;
                    }
                }
                return false;
            }
            function containsReadOnly(items) {
                for(var i=0; i<items.length; i++) {
                    if(items[i].getValue().readOnly) {
                        return true;
                    }
                }
                return false;
            }
            updateAllLeftState();

            this._subDsTree.observe('node:selected', updateRightState);
            this._subDsTree.observe('node:unselected', updateRightState);
            this._subDsTree.observe('leaf:selected', updateRightState);
            this._subDsTree.observe('leaf:unselected', updateRightState);
            this._selDsList.observe('item:unselected', updateLeftState);
            this._selDsList.observe('item:selected', updateLeftState);
            $(this._selDsList._getElement()).on("focus", "input.dataSourceID", function(event) {
                enableSelection(that._selDsList._getElement());
            });
            $(this._selDsList._getElement()).on("blur", "input.dataSourceID", function(event) {
                disableSelectionWithoutCursorStyle(that._selDsList._getElement());
            });
            $(this._selDsList._getElement()).on("change", "input.dataSourceID", function(event) {
                var item = that._selDsList.getItemByEvent(event);
                var dsId = $(this).val();
                if(!item) {
                    return;
                }
                item.getValue().dsId = dsId;
                that._updateSelectedSubDsField();
            });
        },

        _addSubDsCore: function(subDs) { //add sub-datasource to selected subDatasources list. Don't update subDS JSON
            var listItem = new dynamicList.TemplatedListItem({
                cssClassName: layoutModule.LEAF_CLASS,
                value: subDs, //contains dsName, dsId, dsUri
                tooltipText: subDs.dsUri
            });

            this._selDsList.addItems([listItem]);
            this._selDsList.show();
            _.each(this._selDsList.getItems(), function(item) { //update validation message containers
                var dsID = $(item._getElement()).find("input.dataSourceID")[0]
                dsID.validatorMessageContainer = $(item._getElement()).find(".validatorMessageContainer")[0];
            }, this);
        },

        _addSubDs: function(subDs) { //add sub-datasource to selected subDatasources list
            this._addSubDsCore(subDs);
            this._updateSelectedSubDsField();
        },

        _removeSelectedSubDs: function() {
            var that = this;
            that._subDsTree._deselectAllNodes();
            var selItems = this._selDsList.getSelectedItems();
            _.each(selItems, function(item) {
                var elm = $(item._getElement()).find("input.dataSourceID")[0];
                that._unhideAvailableSubDs(item.getValue().dsUri);
            });
            this._selDsList.removeItems(selItems);
            this._updateSelectedSubDsField();
        },

        _removeAllSubDs: function() {
            var that = this;
            var items = this._selDsList.getItems();
            _.each(items, function(item) {
                that._unhideAvailableSubDs(item.getValue().dsUri);
            });
            this._selDsList.setItems([]);
            this._selDsList.show();
            this._updateSelectedSubDsField();
        },

        _hideAvailableSubDs: function(uri) {
            var that = this;
            if(_.isArray(uri)) {
                _.each(uri, function(uriItem) {
                    that._hideAvailableSubDs(uriItem);
                })
            } else {
                var node = this._subDsTree.findLastLoadedNode(uri);
                //keep removed node for the case if user unselects it
                this._subDsHiddenNodes[uri] = {parent: node.parent,
                    child: node};
                var parent = node.parent;
                parent.removeChild(node);
                parent.resortChilds();
            }
        },

        _unhideAvailableSubDs: function(uri) {
            function expandTreePath(tree, uri) {
                tree.processNodePath(uri, function(node) {
                    if(node.parent) {
                        if (tree.rootNode != node.parent && tree.getState(node.parent.id) == dynamicTree.TreeNode.State.CLOSED) {
                            node.parent.handleNode();
                        }
                    }
                });
            }
            var that = this;
            if(_.isArray(uri)) {
                _.each(uri, function(uriItem) {
                    that._unhideAvailableSubDs(uriItem);
                })
            } else {
                var hiddenNode = this._subDsHiddenNodes[uri];
                if(hiddenNode) {
                    hiddenNode.parent.addChild(hiddenNode.child);
                    hiddenNode.parent.resortChilds();
                    hiddenNode.parent.refreshNode();
                    expandTreePath(this._subDsTree, uri);
                    hiddenNode.child.select();
                }
            }
        }

    });
    exp.VirtualResourceDataSource = VirtualResourceDataSource;
})({jQuery : jQuery}, window);