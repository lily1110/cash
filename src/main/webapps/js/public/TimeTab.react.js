var React = require("react");
var ReactRouter = require("react-router");
var Link = ReactRouter.Link;
var Util = require("./Util");
var Btn = require("./Btn.react");
var $ = require("jquery");
function getStateFromStores() {
    return {
        
   }
}
var TimeTab = React.createClass({
    fmt:"yyyy-MM-dd",
    getInitialState: function() {
        var data = getStateFromStores();
        data.current = this.getCurrent();
        data.currentDesc = this.getCurrentFmt();
        data.tag = "day";
        return data;
    },
    clickDay: function(obj,event) {
        $(".time-btns ul a").removeClass("selected");
        $(event.target).addClass("selected");
        this.clickTab("day");
    },
    clickWeek: function(obj,event) {
        $(".time-btns ul a").removeClass("selected");
        $(event.target).addClass("selected");
        this.clickTab("week");
    },
    clickMonth: function(obj,event) {
        $(".time-btns ul a").removeClass("selected");
        $(event.target).addClass("selected");
        this.clickTab("month");
    },
    clickYear: function(obj,event) {
        $(".time-btns ul a").removeClass("selected");
        $(event.target).addClass("selected");
        this.clickTab("year");
    },
    clickTab: function(tag,current) {
        var d = new Date(this.getCurrent());
        if(current) {
            d = current;
        }
        var current = Util.getDateStart(d,tag, "");
        var fmt = "yyyy-MM-dd";

        switch (tag) {
            case "day":
                fmt="yyyy-MM-dd";
                break;
            case "week":
                fmt="yyyy-MM-dd";
                break;
            case "month":
                fmt="yyyy-MM";
                break;
            case "year":
                fmt="yyyy";
                break;
        }
        if($.isFunction(this.props.click) ) {
            var s = Util.getDateStart(d,tag, this.fmt);
            var e = Util.getDateEnd(d,tag, this.fmt);
            this.props.click(tag,s,e);
            var currentDesc = Util.getDateStart(d,tag,fmt);
            if(tag=="week") {
                currentDesc+=("~"+Util.getDateEnd(d,tag,fmt));
            }
            this.setState({tag:tag, current:current,currentDesc:currentDesc});
        }
    },
    getCurrent: function() {
        var c = this.props.current?this.props.current:"2016-06-01";
        var current = new Date(c);
        return current;
    },
    getCurrentFmt: function() {
        var fmt = Util.formatDate(this.getCurrent(),this.fmt);
        return fmt;
    },
    clickPre: function() {
        var tag = this.state.tag;
        var current = this.state.current;
        current = Util.getPreDate(current,tag,"");
        this.clickTab(tag, current);
    },
    clickNext: function() {
        var tag = this.state.tag;
        var current = this.state.current;
        current = Util.getNextDate(current,tag,"");
        this.clickTab(tag, current);
    },
    render:function() {
        var data = Util.isNullOrEmpty(this.props.data) ? "" : this.props.data;
        var css = Util.isNullOrEmpty(this.props.css) ? "" :this.props.css;
        var current = this.state.current;
        var currentDesc = this.state.currentDesc;
        return(
            <div className={css+" time-btns"}>
                <ul>
                    <li>
                        <Btn css="selected" click={this.clickDay} data="日"/>
                    </li>
                    <li>
                        <Btn click={this.clickWeek} data="周"/>
                    </li>
                    <li>
                        <Btn click={this.clickMonth} data="月"/>
                    </li>
                    <li>
                        <Btn click={this.clickYear} data="年"/>
                    </li>
                </ul>
                <div>
                    <Btn click={this.clickPre} data="<" />
                    <div>{currentDesc}</div>
                    <Btn click={this.clickNext} data=">"/>
                </div>
            </div>
        );

    },
});

module.exports = TimeTab;
