var React = require("react");
var ReactRouter = require("react-router");
var Link = ReactRouter.Link;
var Header = require("./public/Header.react");
var StaticItem = require("./public/StaticItem.react");
var MenuItem = require("./public/MenuItem.react");
var Util = require("./public/Util");
var OrderStore = require("./order/OrderStore");
var OrderItem = require("./order/OrderItem.react");
var _ = require("underscore");


function getStateFromStores() {
    return {
        orders:[]
    };
}
var Orders = React.createClass({
    getInitialState: function() {
        return getStateFromStores();
    },
    componentDidMount: function() {
        this.queryOrders();
      
    },
    componentWillUnmount:function() {
        
    },
    queryOrders:function() {
        var self = this;
        // var start = this.props.params.start;
        // var end = this.props.params.end;
        var tag = this.props.params.tag;
        // switch(tag) {
        //     case "gift":
        //         tag = "赠送";
        //         break;
        //     case "return":
        //         tag = "退菜";
        //         break;
        //     case "discount":
        //         tag = "打折";
        //         break;
        //     case "ledger":
        //         tag = "挂帐";
        //         break;
        //     case "free":
        //         tag = "免单";
        //         break;
        //     case "neglect":
        //         tag = "抹零";
        //         break; 
        //     case "back":
        //         tag = "返结";
        //         break;
        // }

        var orders = [];
        Util.getData("api/exception.json",{},function(data){
            var data = data;
            orders = _.filter(data, function(t){
                var date = t.date;
                var type = t.discountType;
                return type==tag;

            });
            self.setState({"orders":orders});

        },function(v1,v2,v3){
            console.log(v1.status)
        })
    },

    render:function() {
        var listView= [];
        _.each(this.state.orders, function(t) {
            listView.push(<OrderItem obj={t} css="col-md-12 col-xs-12 col-sm-12"/>)
        });
        return(
            <div className="row"> 
                <div className="col-md-12 col-xs-12 col-sm-12">{this.props.params.tag}</div>
            {
                listView
            }
            </div>
        );

    },
});

module.exports = Orders;
