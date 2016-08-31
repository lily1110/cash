var React = require("react");
var ReactRouter = require("react-router");
var Link = ReactRouter.Link;
var Util = require("./Util");
var $ = require("jquery");

var Btn = React.createClass({
    click: function(event) {
        var obj = this.props.obj;
        if($.isFunction(this.props.click) ) {
            this.props.click(obj,event);
        }
    },
    render:function() {
        var data = Util.isNullOrEmpty(this.props.data) ? "" : this.props.data;
        var css = Util.isNullOrEmpty(this.props.css) ? "" :this.props.css;
        
        return(
            <a className={css} onClick={this.click}>
               {data}
            </a>
        );

    },
});

module.exports = Btn;
