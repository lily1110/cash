var React = require("react");
var ReactRouter = require("react-router");
var Link = ReactRouter.Link;
var Util = require("../public/Util");

var OrderItem = React.createClass({
    data:{
        orderId:"",
        operator:"",
        tableNo:"",
        paymentType:"",
        createDate:"",
        operDate:"",
        discountType:"",
        discountAmount:"",
        amountAcutal:"",
    },
    render:function() {
        var data = Util.isNullOrEmpty(this.props.obj) ? this.data : this.props.obj;
        var css = Util.isNullOrEmpty(this.props.css) ? "" :this.props.css;
        
        return(
            <div className="order-item">
                <div className="info">
                <p className="no left">单号:{data.orderId}</p>
                <p  className="total right">总计:{data.amountActual}</p>
                </div>
                <ul>
                    <li><p className="desc">收银员：</p><p className="value">{data.operator}</p></li>
                    <li><p className="desc">桌号：</p><p className="value">{data.tableNo}</p></li>
                    <li><p className="desc">结账方式：</p><p className="value">{data.paymentType}</p></li>
                    <li><p className="desc">开台时间：</p><p className="value">{data.createDate}</p></li>
                    <li><p className="desc">结账时间</p><p className="value"de>{data.operDate}</p></li>
                </ul>
                <div className="discount">
                    <p className="type left">{data.discountType}</p>
                    <p className="amount right">{"￥"+ parseFloat(data.discountAmount).toFixed(2)}</p>
                </div>
            </div>
        );

    },
});

module.exports = OrderItem;
