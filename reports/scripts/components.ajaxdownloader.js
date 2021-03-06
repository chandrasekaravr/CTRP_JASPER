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

/*
* @author inesterenko
*/

jaspersoft.components.AjaxDownloader = (function($, _, Backbone) {

//module:
//
//  AjaxDownloader
//
//summary:
//
//
//
    return Backbone.View.extend({

        initialize:function () {
            _.bindAll(this);
            $(document).ready(this.defaultLayout);
        },

        start:function (url) {
            $(this.el).attr("src",url);
        },

        defaultLayout: function(){
            $("body").append(this.render().el);
        },

        render: function(){
            var htmlContent = "<iframe data-downloader-id='{cid}' style='display:none;' src=''></iframe>"
                .replace("{cid}", this.cid);
            this.el = $(htmlContent)[0];
            return this;
        }
    });

})(
    jQuery,
    _,
    Backbone
);
