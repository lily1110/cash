var React = require("react");
var ReactRouter = require("react-router");
var Link = ReactRouter.Link;
var Header = require("./public/Header.react");
var StaticItem = require("./public/StaticItem.react");

var OrderStore = require("./order/OrderStore");

var Home = React.createClass({
    componentDidMount: function() {
      
    },
    componentWillUnmount:function() {
        
    },

    render:function() {
        return(
            <div className="row"> 
            <div className="col-md-12 col-xs-12 col-sm-12">
                <Header />
                <div className="row">
                <StaticItem css="col-md-6 col-xs-6 col-sm-6"  />
            </div>    
            </div>    
            </div>
        );

    },
});

module.exports = Home;
