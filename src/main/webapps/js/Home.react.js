var React = require("react");
var ReactRouter = require("react-router");
var Link = ReactRouter.Link;
var Header = require("./public/Header.react");
var StaticItem = require("./public/StaticItem.react");
var MenuItem = require("./public/MenuItem.react");
var Util = require("./public/Util");
var OrderStore = require("./order/OrderStore");

function getStateFromStores() {
    return {
        homeData:{}
    };
}
var Home = React.createClass({
    getInitialState: function() {
        return getStateFromStores();
    },
    componentDidMount: function() {
        this.queryHome();
      
    },
    componentWillUnmount:function() {
        
    },
    queryHome:function() {
        var self = this;
        Util.getData("api/home.json",{},function(data){
            var homeData = data;
            self.setState({"homeData":homeData});
        },function(v1,v2,v3){
            console.log(v1.status)
        })
    },

    render:function() {
        var homeData = this.state.homeData;
        if(homeData==null) {
            homeData = {
                "receivable":"0",
                "actual":"0",
                "orderQty":"0",
                "notFinishedReceivable":"0",
                "notFinishedOrderQty":"0",
                "pplNum":"0",
                "abOrderQty":"0",
                "cashType":"0",
            }
        }
        return(
            <div className="row"> 
            <div className="col-md-12 col-xs-12 col-sm-12">
                <Header />
                <div className="row">
                    <StaticItem css="col-md-6 col-xs-6 col-sm-6" obj={{"title":"今日应收（元）", "data":parseFloat(homeData.receivable).toFixed(2)}}/>
                    <StaticItem css="col-md-6 col-xs-6 col-sm-6" obj={{"title":"今日实收（元）", "data":parseFloat(homeData.actual).toFixed(2)}}/>
                </div>   
                <div className="row static-row-1" style={{backgroundColor: '#21232A'}}>
                    <StaticItem css="col-md-4 col-xs-4 col-sm-4"  obj={{"title":"未结金额","data":parseFloat(homeData.notFinishedReceivable).toFixed(2)}}/>
                    <StaticItem css="col-md-4 col-xs-4 col-sm-4" obj={{"title":"未结／已结", "data":homeData.notFinishedOrderQty+"/"+(homeData.orderQty-homeData.notFinishedOrderQty)}}/>
                    <StaticItem css="col-md-4 col-xs-4 col-sm-4" obj={{"title":"就餐人数", "data":homeData.pplNum}}/>
                </div> 
                <div className="row">
                    <MenuItem css="col-md-6 col-xs-6 col-sm-6 customer" link="/customerFlow" obj={{"title":"客流量", "data":homeData.pplNum,"icon":(<i className="fa fa-users" ariaHidden="true"></i>)}}/>
                    <MenuItem css="col-md-6 col-xs-6 col-sm-6 abnormal" link="/abstatic" obj={{"title":"异常监控", "data":homeData.abOrderQty,"icon":(<i className="fa fa-exclamation-triangle" ariaHidden="true"></i>)}}/>
                    <MenuItem css="col-md-6 col-xs-6 col-sm-6 payment" link="/paymentForm" obj={{"title":"收款构成", 
                    "data":parseFloat(homeData.cashType).toFixed(2)+"现金","icon":(<i className="fa fa-pie-chart" ariaHidden="true"></i>)}}/>
                    <MenuItem css="col-md-6 col-xs-6 col-sm-6 report" link="/report" obj={{"title":"营业日报", "data":homeData.receivable,"icon":(<i className="fa fa-line-chart" ariaHidden="true"></i>)}}/>
                    
                </div>   
                   
            </div>    
            </div>
        );

    },
});

module.exports = Home;
