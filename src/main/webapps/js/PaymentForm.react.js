var React = require("react");
var ReactRouter = require("react-router");
var BarChart = require("./public/BarChart.react");
var Util = require("./public/Util");
var MenuItem = require("./public/MenuItem.react");
var Header = require("./public/Header.react");
var _ = require("underscore");
var TimeTab = require("./public/TimeTab.react");

function getStateFromStores() {
    return {
        list:{},
        receivable:0,
        actual:0,
    };
}
var PaymentForm = React.createClass({
    getInitialState: function() {
        return getStateFromStores();
    },
    componentDidMount: function() {
        var params = {
            start:"2016-05-29",
            end:"2016-05-30",
        };
        this.queryList(params);
    },
    componentWillUnmount:function() {
    },
    filter:function(list,params){
        list =  _.filter(list, function(t){
            return t.date >= params.start && t.date< params.end
        });
        return list;
    },
    querySuccess: function(data,params) {
        var filterList = this.filter(data,params);
        var orderList = _.filter(filterList, function(t){
            return t.isPaid=="1"
        });
        var list = _.filter(filterList, function(t){
            return !Util.isNullOrEmpty(t.paymentType)
        });

        var receivable = 0;
        var actual = 0;
        _.each(orderList, function(t){
            receivable += parseFloat(t.amount);
            actual += parseFloat(t.amountActual); 
        });
        var groups = _.groupBy(list, "paymentType");
        var hashMap = {};
        _.map(groups, function(v,k) {
            var amount = 0;
            _.each(v,function(t) {
                amount+= parseFloat(t.amountActual);
            });
            hashMap[k] = amount;
        });
        this.setState({"list":hashMap,"receivable":receivable,"actual":actual});
    }, 

    queryList:function(params) {
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
        this.queryList(params);
    },

    render:function() {
        var staticHtml = [];
        _.map(this.state.list, function(v,k) {
            var t = (
                <div className="row"> 
                    <dt className="col-md-6 col-xs-6 col-sm-6">
                    {k}
                    </dt>
                    <dd className="col-md-6 col-xs-6 col-sm-6">
                    {"￥ "+parseFloat(v).toFixed(2)}
                    </dd>
                </div>
                )
            staticHtml.push(t);
        });
        return(
            <div className="row payment"> 
                <div className="col-md-12 col-xs-12 col-sm-12">
                    <Header  left="back" backTo="/" title="收款构成" />
                    <TimeTab css="tab" click={this.clickTab} current="2016-05-29"/>
                    <div className="row"> 
                        <BarChart css="col-md-12 col-xs-12 col-sm-12" 
                            title="收款构成" 
                            data={this.state.list} 
                            unit={"¥"}
                         />
                    </div>
        
                    <div className="row"> 
                        <MenuItem css="col-md-6 col-xs-6 col-sm-6" 
                        obj={{"title":"应收合计","data":"￥"+parseFloat(this.state.receivable).toFixed(2)}} />
                        <MenuItem css="col-md-6 col-xs-6 col-sm-6" 
                        obj={{"title":"实收合计","data":"￥"+parseFloat(this.state.actual).toFixed(2)}} />
                    </div>
                    <div className="row list"> 
                        <div className="col-md-12 col-xs-12 col-sm-12 title">
                        收款构成
                        </div>
                    </div>
                    <div className="row list"> 
                        <dl className="col-md-12 col-xs-12 col-sm-12">    
                        {staticHtml}
                        </dl>
                    </div>
                </div>
            </div>
        );
    },
});

module.exports = PaymentForm;
