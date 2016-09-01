var React = require("react");
var ReactRouter = require("react-router");
var BarChart = require("./public/BarChart.react");
var Util = require("./public/Util");
var MenuItem = require("./public/MenuItem.react");
var StaticItem = require("./public/StaticItem.react");
var Header = require("./public/Header.react");
var TimeTab = require("./public/TimeTab.react");
var _ = require("underscore");

function getStateFromStores() {
    return {
        abs:{},
        receivable:0,
        actual:0,
    };
}
var AbStatics = React.createClass({
    getInitialState: function() {
        return getStateFromStores();
    },
    componentDidMount: function() {
        var params = {
            start:"2016-05-29",
            end:"2016-05-30",
        };
        this.queryAbs(params);
    },
    componentWillUnmount:function() {
    },
    filter: function(list,params) {
        list = _.filter(list, function(t) {
            return t.date >=params.start && t.date< params.end;
        })
        return list;
    },
    querySuccess: function(data,params) {
        var list = this.filter(data,params);
        var orderList = _.filter(list, function(t){
            return t.isPaid=="1"
        });
        var absList = _.filter(list, function(t){
            return !Util.isNullOrEmpty(t.discountType)
        });

        var receivable = 0;
        var actual = 0;
        _.each(orderList, function(t){
            receivable += parseInt(t.amount);
            actual += parseInt(t.amountActual); 
        });
        var groups = _.groupBy(absList, "discountType");
        var hashMap = {};
        _.map(groups, function(v,k) {
            var count = 0;
            _.each(v,function(t) {
                count+= parseInt(t.orderQty);
            });
            hashMap[k] = count;
        });
        this.setState({"abs":hashMap,"receivable":receivable,"actual":actual});
    }, 

    queryAbs:function(params) {
        var self = this;
        Util.getData("api/main.json",{},function(data){
            self.querySuccess(data,params);
        },function(v1,v2,v3){
            console.log(v1.status)
        });
    },

    clickTab: function(tag, start,end){
        var params = {
            start:start,
            end: end,
        };
        this.queryAbs(params);
    },
    render:function() {
        var staticHtml = [];
        var i=0;
        _.map(this.state.abs, function(v,k) {
            var t = (
                <StaticItem tag={true} css="col-md-6 col-xs-6 col-sm-6" obj={{"title":k,"data":v}} link={"/order/"+k}/>)
            staticHtml.push(t);
            i++;
        });
        if((i)%2==1) {
            staticHtml.push(<StaticItem css="col-md-6 col-xs-6 col-sm-6"/>)
        } 
        return(
            <div className="row abnormal"> 
                <div className="col-md-12 col-xs-12 col-sm-12">
                    <Header left="back" backTo="/" title="异常监控" />
                    <TimeTab css="tab" click={this.clickTab} current="2016-05-29"/>
                    <div className="row"> 
                        <BarChart css="col-md-12 col-xs-12 col-sm-12" title="异常监控" data={this.state.abs} unit={"¥"} />
                    </div>
                    <div className="row"> 
                        <MenuItem css="col-md-6 col-xs-6 col-sm-6" obj={{"title":"应收合计","data":"￥"+parseFloat(this.state.receivable).toFixed(2)}} />
                        <MenuItem css="col-md-6 col-xs-6 col-sm-6" obj={{"title":"实收合计","data":"￥"+parseFloat(this.state.actual).toFixed(2)}} />
                    </div>
                    <div className="row"> 
                        {staticHtml}
                    </div>
                </div>
            </div>
        );
    },
});

module.exports = AbStatics;
