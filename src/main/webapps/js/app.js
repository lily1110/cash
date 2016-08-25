var ReactRouter = require("react-router");
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var browserHistory = ReactRouter.browserHistory;
var IndexRoute = ReactRouter.IndexRoute;
var React = require("react");
var ReactDOM = require("react-dom");
var Cash = require("./Cash.react");
var MyChart = require("./public/MyChart.react");
window.React = React;

var routes = (
    <Route path="/" component={MyChart}>
        <IndexRoute component={MyChart} />
        <Route path="user" component={MyChart} />
    </Route>
);


ReactDOM.render(<Router history={browserHistory}  routes={routes}/>, document.getElementById("body"));
