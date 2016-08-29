var ReactRouter = require("react-router");
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var browserHistory = ReactRouter.browserHistory;
var IndexRoute = ReactRouter.IndexRoute;
var React = require("react");
var ReactDOM = require("react-dom");
var Cash = require("./Cash.react");
var MyChart = require("./public/MyChart.react");
var AbStatics =require("./AbStatics.react");
var Orders =require("./Orders.react");
var PaymentForm = require("./PaymentForm.react");
window.React = React;

var routes = (
    <Route>

        <Route path="/" component={Cash}>
            <IndexRoute component={Cash} />
            <Route path="user" component={MyChart} />
        </Route>
        <Route path="abstatic" component={AbStatics}  />
        <Route path="paymentForm" component={PaymentForm}  />
        <Route path="order/:tag" component={Orders}  />
    </Route>
);


ReactDOM.render(<Router history={browserHistory}  routes={routes}/>, document.getElementById("body"));
