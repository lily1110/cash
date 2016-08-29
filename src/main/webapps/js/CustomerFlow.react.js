var React = require("react");
var ReactRouter = require("react-router");
var LineChart = require("./public/LineChart.react");
var Util = require("./public/Util");
var MenuItem = require("./public/MenuItem.react");
var Header = require("./public/Header.react");
var _ = require("underscore");

function getStateFromStores() {
    return {
        tag: "daily",
        receivable:0,
        actual:0,
    };
}
var AbStatics = React.createClass({
    titles:["客流量"],
    dailyLabels:["4:00","5:00","6:00","7:00","8:00","9:00","10:00","11:00","12:00","13:00","14:00","15:00","16:00","17:00","18:00","19:00","20:00","21:00","22:00","23:00","0:00","1:00","2:00","3:00"],
    weeklyLabels:["周一","周二","周三","周四","周五","周六","周日"],
    monthlyLabels:["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24","25","26","27","28","29","30","31"],
    yearlyLabels:["1","2","3","4","5","6","7","8","9","10","11","12"],
    getInitialState: function() {
        return getStateFromStores();
    },
    componentDidMount: function() {
        this.queryList();
    },
    componentWillUnmount:function() {
    },
    querySuccess: function(data) {
        var self = this;
        var list = _.filter(data, function(t){
            return t.date == "2016-05-29"
        });
        list = _.sortBy(list, "hour");
        var pplNum = 0;
        _.each(list, function(t){
            pplNum += parseInt(t.pplNum);
        });
        var groups = _.groupBy(list, "hour");

        for (var i=0;i<12;i++) {
            var h = i+1;

        }
        this.setState({"titles":self.titles,"receivable":receivable,"actual":actual});
    }, 

    queryList:function() {
        var self = this;
        Util.getData("api/main.json",{},function(data){
            self.querySuccess(data);
        },function(v1,v2,v3){
            console.log(v1.status)
        });
        Util.getData("api/dailyStatic.json",{},function(data){
            var max = data.max;
            var avg = parseInt(data.avg);
            self.setState({"max":max,"avg":avg});
        },function(v1,v2,v3){
            console.log(v1.status)
        });
          
    },


    render:function() {
        var staticHtml = [];
        _.map(this.state.abs, function(v,k) {
            var t = (
                <MenuItem css="col-md-6 col-xs-6 col-sm-6" obj={{"title":k,"data":v}} link={"/order/"+k}/>)
            staticHtml.push(t);
        });
        return(
            <div className="row"> 
                <div className="col-md-12 col-xs-12 col-sm-12">
                    <Header title="客流量" />
                    <div className="row"> 
                        <MenuItem css="col-md-6 col-xs-6 col-sm-6" obj={{"title":"应收合计","data":this.state.receivable}} />
                        <MenuItem css="col-md-6 col-xs-6 col-sm-6" obj={{"title":"实收合计","data":this.state.actual}} />
                    </div>
                    <div className="row"> 
                        {staticHtml}
                    </div>

                    <LineChart title="异常监控" data={this.state.abs} />

                </div>
            </div>
        );
    },
});

module.exports = AbStatics;
