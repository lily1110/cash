var React = require("react");
var ReactRouter = require("react-router");
var Link = ReactRouter.Link;

var Header = React.createClass({

    render:function() {
        var left = this.props.left?this.props.left:"";
        var backTo= "/";
        var title = this.props.title?this.props.title:("鱼堂科技");
        var right = this.props.right?this.props.right:(<div />);
        if(left=="back") {
            backTo = this.props.backTo?this.props.backTo:"/";
        }
        
        return(
            <div className="row">

            <header className="col-md-12 col-xs-12 col-sm-12">
            <div>
            {left=="back"?(<Link to={backTo}><i className="fa fa-chevron-left" ariaHidden="true"></i></Link>):""}
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
