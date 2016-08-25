var React = require("react");
var ReactRouter = require("react-router");
var Link = ReactRouter.Link;

var Search = React.createClass({
    componentDidMount: function() {
        
    },
    componentWillMount:function() {
        $(".search input").val("");
    },
    input_search:function(event) {
        var x;
        if(window.event) // IE8 以及更早版本
        {
            x=event.keyCode;
        }
        else if(event.which) // IE9/Firefox/Chrome/Opera/Safari
        {
            x=event.which;
        }

        if(x == 13) {
            var key = $(event.target).val();
            if(isNullOrEmpty(key)) {
                key = "";
            }
            if($.isFunction(this.props.search)) {
                this.props.search(key)
            }
        }
    },
    btn_search:function(event) {
        var key = this.state.key;
        if(isNullOrEmpty(key)) {
            return
        }
        if($.isFunction(this.props.search)) {
            this.props.search(key)
        }
    },
    changeText:function(event) {
        this.setState({"key":$(event.target).val()});
    },

    render:function() {
        return(
                <div className="box-header search">
                    <input type="text"
                           onChange={this.changeText}
                           onKeyPress={this.input_search}
                           onKeyDown={this.input_search}
                           className="form-control xxg-valid search_input"
                           placeholder="输入关键字"
                    />
                    <a onClick={this.btn_search}>搜索</a>
                </div>
        );

    },
});

module.exports = Search;
