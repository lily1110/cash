var React = require("react");
var ReactRouter = require("react-router");
var BarChart = require("./public/BarChart.react");
var Util = require("./public/Util");
var MenuItem = require("./public/MenuItem.react");
var Header = require("./public/Header.react");
var _ = require("underscore");

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
        this.queryList();
    },
    componentWillUnmount:function() {
    },
    filter:function(list){
        list =  _.filter(list, function(t){
            return t.date == "2016-05-29"
        });
        return list;
    },
    querySuccess: function(data) {
        var filterList = this.filter(data);
        var orderList = _.filter(filterList, function(t){
            return t.isPaid=="1"
        });
        var list = _.filter(filterList, function(t){
            return !Util.isNullOrEmpty(t.paymentType)
        });

        var receivable = 0;
        var actual = 0;
        _.each(orderList, function(t){
            receivable += parseInt(t.amount);
            actual += parseInt(t.amountActual); 
        });
        var groups = _.groupBy(list, "paymentType");
        var hashMap = {};
        _.map(groups, function(v,k) {
            var amount = 0;
            _.each(v,function(t) {
                amount+= parseInt(t.amountActual);
            });
            hashMap[k] = amount;
        });
        this.setState({"list":hashMap,"receivable":receivable,"actual":actual});
    }, 

    queryList:function() {
        var self = this;
        Util.getData("api/main.json",{},function(data){
            self.querySuccess(data);
        },function(v1,v2,v3){
            console.log(v1.status)
        });
    },


    render:function() {
        var staticHtml = [];
        _.map(this.state.list, function(v,k) {
            var t = (
                <div className="row"> 
                    <div className="col-md-6 col-xs-6 col-sm-6">
                    {k}
                    </div>
                    <div className="col-md-6 col-xs-6 col-sm-6">
                    {v}
                    </div>
                </div>
                )
            staticHtml.push(t);
        });
        return(
            <div className="row"> 
                <div className="col-md-12 col-xs-12 col-sm-12">
                    <Header title="收款构成" />
                    <BarChart title="收款构成" data={this.state.list} />
                    <div className="row"> 
                        <MenuItem css="col-md-6 col-xs-6 col-sm-6" obj={{"title":"应收合计","data":this.state.receivable}} />
                        <MenuItem css="col-md-6 col-xs-6 col-sm-6" obj={{"title":"实收合计","data":this.state.actual}} />
                    </div>
                    <div className="row"> 
                        <div className="col-md-12 col-xs-12 col-sm-12">
                        收款构成
                        </div>
                    </div>
                        
                        {staticHtml}
                </div>
            </div>
        );
    },
});

module.exports = PaymentForm;
