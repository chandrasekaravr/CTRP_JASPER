;(function(imp, exp) {
    var $ = imp.jQuery;

    var BeanResourceDataSource = ResourceDataSource.extend({
        BEAN_NAME_ID: "#beanNameID",
        BEAN_METHOD_ID: "#beanMethodID",

        initialize : function(options) {
            ResourceDataSource.prototype.initialize.call(this, options);

            this._beanName = $(this.BEAN_NAME_ID);
            this._beanMethod = $(this.BEAN_METHOD_ID);

            this._validationEntries.push({element: this._beanName[0],
                method: "mandatory",
                messages: {mandatory: resource.messages['beanNameIsEmpty']}
            });
            this._validationEntries.push({element: this._beanMethod[0],
                method: "mandatory",
                messages: {mandatory: resource.messages['beanMethodIsEmpty']}
            });
        }
    });

    exp.BeanResourceDataSource = BeanResourceDataSource;

})({jQuery : jQuery}, window);