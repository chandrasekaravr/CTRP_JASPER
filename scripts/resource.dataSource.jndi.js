;(function(imp, exp) {
    var $ = imp.jQuery;

    var JndiResourceDataSource = ResourceDataSource.extend({
        SERVICE_ID: "#serviceID",

        initialize : function(options) {
            ResourceDataSource.prototype.initialize.call(this, options);

            this._service = $(this.SERVICE_ID);

            this._validationEntries.push({element: this._service[0],
                method: "mandatory",
                messages: {mandatory: resource.messages['serviceIsEmpty']}
            });
        }
    });

    exp.JndiResourceDataSource = JndiResourceDataSource;

})({jQuery : jQuery}, window);