var React = require("react");
var ReactRouter = require("react-router");
var Home = require("./Home.react");
var Cash = React.createClass({
    render:function() {
        return(
            <Home />
        );
    },
});

module.exports = Cash;
