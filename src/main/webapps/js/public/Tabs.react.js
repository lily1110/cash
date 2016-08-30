var React = require("react");
var ReactRouter = require("react-router");
var Link = ReactRouter.Link;
var Util = require("./Util");

var Tabs = React.createClass({
    click: function(event) {
        var obj = this.props.obj;
        if($.isFunction(this.props.click) ) {
            this.props.click(obj);
        }
    },
    render:function() {
        return(
            <ul className={css}>

            </ul>
        );

    },
});

module.exports = Tabs;
