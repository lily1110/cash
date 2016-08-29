var React = require("react");
var ReactRouter = require("react-router");
var Link = ReactRouter.Link;
var Util = require("./Util");
var Btn = require("./Btn");

var TimeTab = React.createClass({
    click: function(event) {
        var obj = this.props.obj;
        if($.isFunction(this.props.click) ) {
            this.props.click(obj);
        }
    },
    render:function() {
        var data = Util.isNullOrEmpty(this.props.data) ? "" : this.props.data;
        var css = Util.isNullOrEmpty(this.props.css) ? "" :this.props.css;
        
        var t = this.props.current;
        if (Util.is)
        var current = this.props.current?this.props.current:(new Date());
        return(
            <ul className={css}>
                <li>
                    <Btn click={this.click} data="日"/>
                </li>
                <li>
                    <Btn click={this.click} data="周"/>
                </li>
                <li>
                    <Btn click={this.click} data="月"/>
                </li>
            </ul>
        );

    },
});

module.exports = TimeTab;
