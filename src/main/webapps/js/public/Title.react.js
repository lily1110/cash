var React = require("react");
var ReactRouter = require("react-router");
var Link = ReactRouter.Link;

var Title = React.createClass({
    clickTitle:function() {
        if($.isFunction(this.props.clickTitle)) {
            this.props.clickTitle();
        }
    },
    render:function() {
        return(
            <section className="content-header">
                <h1>
                    <a onClick={this.clickTitle}>{isNullOrEmpty(this.props.title) ?"":this.props.title}</a>
                    <small>
                        {isNullOrEmpty(this.props.subTitle) ?"":this.props.subTitle}
                    </small>
                    </h1>
            </section>
        );

    },
});

module.exports = Title;
