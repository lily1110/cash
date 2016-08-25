var React = require("react");
var ReactRouter = require("react-router");
var Link = ReactRouter.Link;

var Btn = React.createClass({
    default:{
        title:"",
        data:"",
    },
    render:function() {
        var obj = isNullOrEmpty(this.props.obj) ? "" : this.props.obj;
        var css = isNullOrEmpty(this.props.css) ? "" :this.props.css;
        var link = isNullOrEmpty(this.props.link) ? "" :this.props.link;
        var showTag = this.props.tag;
        
        return(
            <div className={css}>
            <Link to={link}>
                <p className="title">{obj.title}</p>
                <h className="data">{obj.data}</h>
                {
                    showTag?<i></i>:""
                }
             </Link>
             </div>
        );

    },
});

module.exports = Btn;
