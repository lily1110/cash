var React = require("react");
var ReactRouter = require("react-router");
var Link = ReactRouter.Link;
var Util = require("./Util");
var $ = require("jquery");
var _ = require("underscore");
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
        var css = Util.isNullOrEmpty(this.props.css) ? "" :this.props.css;
        var obj= _.isNull(this.props.obj)?this.default:this.props.obj;
        var link =  Util.isNullOrEmpty(this.props.link) ? "" :this.props.link;
        return(
            <div className = {css+" menu-item"}>
            {
                link==""?(
                    <div>
                        <div className="icon">
                            {
                                obj.icon?obj.icon:""
                            }
                        </div>
                        <div className="title">
                            {obj.title}
                        </div>
                        <div className="data">
                            {
                                obj.data
                            }
                        </div>
                    </div>
            ):(
             <Link to={link}>
                    <div className="icon">
                            {
                                obj.icon?obj.icon:""
                            }
                        </div>
                    <div className="title">
                        {obj.title}
                    </div>
                    <div className="data">
                        {
                            obj.data
                        }
                    </div>

            </Link>
            )
            }
           
            </div>
        );

    },
});

module.exports = Btn;
