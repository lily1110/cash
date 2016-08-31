var React = require("react");
var ReactRouter = require("react-router");
var Link = ReactRouter.Link;

var Header = React.createClass({

    render:function() {
        var left = this.props.left?this.props.left:(<div />);
        var title = this.props.title?this.props.title:("屏芯智能餐厅");
        var right = this.props.right?this.props.right:(<div />);
        
        return(
            <div className="row">

            <header className="col-md-12 col-xs-12 col-sm-12">
            <div>
            {left}
            </div>
            <div className="center">
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
            </div>
            );

    },
});

module.exports = Header;
