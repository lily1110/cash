var React = require("react");
var ReactRouter = require("react-router");
var Link = ReactRouter.Link;

var Header = React.createClass({
    
    render:function() {
        var left = this.props.left?this.props.left:(<div />);
        var title = this.props.title?this.props.title:(<p>屏芯智能餐厅</p>);
        var right = this.props.right?this.props.right:(<div />);
        
        return(
            <header>
                <div>
                {left}
                </div>
                <div>
                {
                    title
                }
                </div>
                <div>
                {
                    right
                }
                </div>
            </header>
        );

    },
});

module.exports = Header;
