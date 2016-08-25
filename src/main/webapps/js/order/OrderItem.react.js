var React = require("react");
var ReactRouter = require("react-router");
var Link = ReactRouter.Link;

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
        var data = isNullOrEmpty(this.props.data) ? this.data : this.props.data;
        var css = isNullOrEmpty(this.props.css) ? "" :this.props.css;
        
        return(
            <div>
                <div>
                <p>单号:{data.orderId}</p>
                <p>总计:{data.amountAcutal}</p>
                </div>
                <ul>
                    <li><i>收银员：</i><p>{data.operator}</p></li>
                    <li><i>桌号：</i><p>{data.tableNo}</p></li>
                    <li><i>结账方式：</i><p>{data.paymentType}</p></li>
                    <li><i>开台时间：</i><p>{data.createDate}</p></li>
                    <li><i>结账时间</i><p>{data.operDate}</p></li>
                </ul>
                <div>
                    <p>{data.discountType}</p>
                    <p>{data.discountAmount}</p>
                </div>
            </div>
        );

    },
});

module.exports = OrderItem;
