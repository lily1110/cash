var React = require("react");
var ReactRouter = require("react-router");
var Link = ReactRouter.Link;
var Util = require("./Util");
var StaticItem = React.createClass({
    default:{
        title:"",
        data:"",
    },
    render:function() {
        var obj = Util.isNullOrEmpty(this.props.obj) ? "" : this.props.obj;
        var css = Util.isNullOrEmpty(this.props.css) ? "" :this.props.css;
        var link = Util.isNullOrEmpty(this.props.link) ? "" :this.props.link;
        var showTag = this.props.tag;
        
        return(
            <div className={css}>
                <p className="title">{obj.title}</p>
                <h1 className="data">{obj.data}</h1>
                {
                    showTag?<i></i>:""
                }
             </div>
        );

    },
});

module.exports = StaticItem;
