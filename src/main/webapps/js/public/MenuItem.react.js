var React = require("react");
var ReactRouter = require("react-router");
var Link = ReactRouter.Link;

var Btn = React.createClass({
    default:{
        icon:"",
        title:"",
        data:"",
    },
    click: function(event) {
        var obj = this.props.obj;
        if($.isFunction(this.props.click) ) {
            this.props.click(obj);
        }
    },
    render:function() {
        var data = isNullOrEmpty(this.props.data) ? "" : this.props.data;
        var css = isNullOrEmpty(this.props.css) ? "" :this.props.css;
        var obj= _.isNull(this.props.obj)?this.default:this.props.obj;
        var link =  isNullOrEmpty(this.props.link) ? "/" :this.props.link;
        return(
            <div className = {css}>
            <Link to={link}>
            <div>
                <img src={obj.icon} />
            </div>
            <p>
                {obj.title}
            </p>
            <h1 className="data">
                {
                    obj.data
                }
            </h1>
            

            </Link>
            </div>
        );

    },
});

module.exports = Btn;
