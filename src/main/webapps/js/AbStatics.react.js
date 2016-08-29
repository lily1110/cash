var React = require("react");
var ReactRouter = require("react-router");
var BarChart = require("./public/BarChart.react");
var Util = require("./public/Util");
var MenuItem = require("./public/MenuItem.react");
var Header = require("./public/Header.react");
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
        this.queryAbs();
    },
    componentWillUnmount:function() {
    },
    querySuccess: function(data) {
        var orderList = _.filter(data, function(t){
            return t.date == "2016-05-29"&&t.isPaid=="1"
        });
        var absList = _.filter(data, function(t){
            return t.date == "2016-05-29"&&!Util.isNullOrEmpty(t.discountType)
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

    queryAbs:function() {
        var self = this;
        Util.getData("api/main.json",{},function(data){
            self.querySuccess(data);
        },function(v1,v2,v3){
            console.log(v1.status)
        });
    },


    render:function() {
        var staticHtml = [];
        _.map(this.state.abs, function(v,k) {
            var t = (
                <MenuItem css="col-md-6 col-xs-6 col-sm-6" obj={{"title":k,"data":v}} link={"/order/"+k}/>)
            staticHtml.push(t);
        });
        return(
            <div className="row"> 
                <div className="col-md-12 col-xs-12 col-sm-12">
                    <Header title="异常监控" />
                    <BarChart title="异常监控" data={this.state.abs} />
                    <div className="row"> 
                        <MenuItem css="col-md-6 col-xs-6 col-sm-6" obj={{"title":"应收合计","data":this.state.receivable}} />
                        <MenuItem css="col-md-6 col-xs-6 col-sm-6" obj={{"title":"实收合计","data":this.state.actual}} />
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
