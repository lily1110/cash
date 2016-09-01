var React = require("react");
var ReactRouter = require("react-router");
var LineChart = require("./public/LineChart.react");
var Util = require("./public/Util");
var StaticItem = require("./public/StaticItem.react");
var Header = require("./public/Header.react");
var _ = require("underscore");
var TimeTab = require("./public/TimeTab.react");

function getStateFromStores() {
    return {
        tag: "daily",
        max:0,
        avg:0,
        pplNum:0,
        receivable:0,
        actual:0,
        reback:0,
        discount:0,
        orderQty:0,
        pplNum:0,
        orderAvg:0,
        pplAvg:0,
        titles:["实收金额","应收金额"],
        dailyLabels:["10:00","11:00","12:00","13:00","14:00","15:00","16:00","17:00","18:00","19:00","20:00","21:00","22:00","23:00","0:00","1:00","2:00","3:00"],
        weeklyLabels:["周一","周二","周三","周四","周五","周六","周日"],
        monthlyLabels:["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24","25","26","27","28","29","30","31"],
        yearlyLabels:["1","2","3","4","5","6","7","8","9","10","11","12"],
    };
}

var Report = React.createClass({
    
    getInitialState: function() {
        return getStateFromStores();
    },
    componentDidMount: function() {
        var params = {
            start:"2016-05-29",
            end:"2016-05-30",
            tag:"day",
        };
        this.queryList(params);
    },
    componentWillUnmount:function() {
    },
    filter: function(list,params) {
        list = _.filter(list, function(t){
            return t.date>=params.start&&t.date<params.end&&t.isPaid=="1";
        });
        return list;
    },
    querySuccess: function(data,params) {
        var self = this;
        var list = _.sortBy(data, "hour");
        var pplNum = 0;
        var receivable = 0;
        var actual = 0;
        var reback = 0;
        var orderQty = 0;
        var discount = 0;
        var tag = params.tag;
        _.each(list, function(t){
            pplNum += parseInt(t.pplNum);
            actual += parseFloat(t.amountActual);
            receivable+= parseFloat(t.amount);
            orderQty += parseInt(t.orderQty);
            discount += parseFloat(t.discount);
            reback += parseFloat(t.numberBack);
            var d = new Date(t.date);
            var week = Util.formatDate(d,"EE");
            var month = Util.formatDate(d,"MM");
            var day = Util.formatDate(d,"dd");
            var hour = t.hour;

            t["hourDesc"] = parseInt(hour)+":00";
            t["week"] = week;
            t["month"] = parseInt(month)+"";
            t["day"] = parseInt(day)+"";
        });
        var orderAvg =  parseFloat(orderQty==0?0:(actual/orderQty));
        var pplAvg = parseFloat(pplNum==0?0:(actual/pplNum));
        var datas=[];
        var receivableData=[];
        var actualData=[];
        var groups ={};
        var labels = [];

        switch(tag) {
            case "day":
                labels = labels.concat(this.state.dailyLabels);
                groups = _.groupBy(list, "hourDesc");
                break;
            case "week":
                labels = labels.concat(this.state.weeklyLabels);
                groups = _.groupBy(list, "week");
                break;
            case "month":
                labels = labels.concat(this.state.monthlyLabels);
                groups = _.groupBy(list, "day");

                break;
            case "year":
                labels = labels.concat(this.state.yearlyLabels);
                groups = _.groupBy(list, "month");
                break;
            default:
                labels=[];

        }
        _.each(labels,function(l){
                    var receivable = 0;
                    var actual = 0;

                    if(!Util.isNullOrEmpty(groups[l]) ) {
                        var g = groups[l];
                        _.each(g,function(t) {
                            receivable+= parseFloat(t.amount)
                            actual+= parseFloat(t.amountActual)
                        });
                    }
                    receivableData.push(receivable);
                    actualData.push(actual);
                });
        datas.push(actualData);
        datas.push(receivableData);
        this.setState({
            "labels":labels,
            "datas":datas,
            "pplNum":pplNum,
            "receivable":parseFloat(receivable).toFixed(2),
            "actual":parseFloat(actual).toFixed(2),
            "orderQty":orderQty,
            "discount":discount.toFixed(2),
            "reback":reback.toFixed(2),
            "orderAvg":orderAvg.toFixed(2),
            "pplAvg":pplAvg.toFixed(2),
        });
    }, 
    queryList:function(params) {
        var self = this;
        Util.getData("api/main.json",{},function(data){
            data = self.filter(data, params);
            self.querySuccess(data, params);
        },function(v1,v2,v3){
            console.log(v1.status)
        });
        Util.getData("api/reportStatic.json",{},function(data){
            var max = parseFloat(data.max).toFixed(2);
            var avg = parseFloat(data.avg).toFixed(2);
            self.setState({"max":max,"avg":avg});
        },function(v1,v2,v3){
            console.log(v1.status)
        });
          
    },
    clickTab: function(tag, start,end){
        var params = {
            start:start,
            end: end,
            tag:tag,
        };
        this.queryList(params);
    },

    render:function() {
        return(
            <div className="row report"> 
                <div className="col-md-12 col-xs-12 col-sm-12">
                    <Header  left="back" backTo="/" title="营业日报" />
                     <TimeTab css="tab" click={this.clickTab} current="2016-05-29"/>

                    <div className="row"> 
                        <StaticItem css="col-md-6 col-xs-6 col-sm-6" obj={{"title":"日最高值","data":(<div><i>¥</i>{this.state.max}</div>)}} />
                        <StaticItem css="col-md-6 col-xs-6 col-sm-6" obj={{"title":"日平均值","data":(<div><i>¥</i>{this.state.avg}</div>)}} />
                    </div>
                    <div className="row"> 
                        <LineChart css="col-md-12 col-xs-12 col-sm-12" title="营业日报"
                            titles={this.state.titles}
                            labels={this.state.labels} 
                            datas={this.state.datas}
                            unit={"¥"}
                             />
                    </div>
                    <div className="row"> 
                        <StaticItem css="col-md-6 col-xs-6 col-sm-6" obj={{"title":"应收合计","data":(<div><i>¥</i>{this.state.receivable}</div>)}} />
                        <StaticItem css="col-md-6 col-xs-6 col-sm-6" obj={{"title":"实收合计","data":(<div><i>¥</i>{this.state.actual}</div>)}} />
                        <StaticItem css="col-md-6 col-xs-6 col-sm-6" obj={{"title":"退菜合计","data":(<div><i>¥</i>{this.state.reback}</div>)}} />
                        <StaticItem css="col-md-6 col-xs-6 col-sm-6" obj={{"title":"优惠合计","data":(<div><i>¥</i>{this.state.discount}</div>)}} />
                        <StaticItem css="col-md-6 col-xs-6 col-sm-6" obj={{"title":"总单数","data":this.state.orderQty}} />
                        <StaticItem css="col-md-6 col-xs-6 col-sm-6" obj={{"title":"总人数","data":this.state.pplNum}} />
                        <StaticItem css="col-md-6 col-xs-6 col-sm-6" obj={{"title":"单均消费","data":(<div><i>¥</i>{this.state.orderAvg}</div>)}} />
                        <StaticItem css="col-md-6 col-xs-6 col-sm-6" obj={{"title":"人均消费","data":(<div><i>¥</i>{this.state.pplAvg}</div>)}} />
                    
                    </div>

                </div>
            </div>
        );
    },
});

module.exports = Report;
