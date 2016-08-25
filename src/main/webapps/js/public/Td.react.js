var React = require("react");
var ReactRouter = require("react-router");
var Link = ReactRouter.Link;

var Td = React.createClass({
   
    render:function() {
        var obj = this.props.obj;
        var id = isNullOrEmpty(this.props.dataId) ? "" : this.props.dataId;
        var data = isNullOrEmpty(this.props.data) ? "" : this.props.data;
        var css = isNullOrEmpty(this.props.css) ? "" :this.props.css;
        var link = isNullOrEmpty(this.props.link) ? "" : this.props.link;
        var onclick = $.isFunction(this.props.click) ? this.props.click : "";
        var content;
        if (link != "") {
            content = (
                <Link to={link}>{data}</Link>
            );
            
        } else {
            content = (
                <div onClick={function() {
                    if($.isFunction(onclick)) {
                        onclick(obj);
                    }
                }} className={css}>{data}</div>
            );
        }
        return(
            <td className={css}>
               {
                content
               }
            </td>
        );

    },
});

module.exports = Td;
