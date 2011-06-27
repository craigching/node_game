define(
[
"dojo/_base/kernel",
"dojo/_base/lang", // dojo.hitch dojo.isString
"dojo/_base/declare",
"dojo/parser",
"dojo/_base/html",
"dojo/text!./templates/T3View.html",
"dijit/place",
"dijit/_Widget",
"dijit/_TemplatedMixin"
],
 function(dojo, declare, parser, dhtml, place, t3ViewTemplate/*, Widget, TemplatedMixin*/) {
    dojo.declare(
        "webasap.ui.T3View",
        [dijit._Widget, dijit._TemplatedMixin],
        {
            templateString: t3ViewTemplate,

            constructor: function(args) {
                var i;
                for (i = 0; i < 9; ++i) {
                    this["v" + i] = i;
                }
            }
        });
return webasap.ui.T3View;
});
