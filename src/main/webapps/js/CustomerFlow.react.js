var React = require("react");
var ReactRouter = require("react-router");
var LineChart = require("./public/LineChart.react");
var Util = require("./public/Util");
var StaticItem = require("./public/StaticItem.react");
var Header = require("./public/Header.react");
var _ = require("underscore");

function getStateFromStores() {
    return {
        tag: "daily",
        max:0,
        avg:0,
        pplNum:0,
    };
}
var CustomerFlow = React.createClass({
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
    filter: function(list) {
        list = _.filter(list, function(t){
            return t.date == "2016-05-29"
        });
        return list;
    },
    querySuccess: function(data) {
        var self = this;
        var list = self.filter(data);
        list = _.sortBy(list, "hour");
        var pplNum = 0;
        _.each(list, function(t){
            pplNum += parseInt(t.pplNum);
        });
        var groups = _.groupBy(list, "hour");
        var datas=[];
        var data=[];
        _.each(self.dailyLabels,function(t){
            var h = t.substring(0,t.indexOf(":"));
            var d = 0;

            if(Util.isNullOrEmpty(groups[h]) ) {
                d=0;
            }
            else {
                var g = groups[h];

                _.each(g,function(t) {
                    d+= parseInt(t.pplNum)
                });
            }
            data.push(d);
        });
        datas.push(data);

        this.setState({"pplNum":pplNum,"labels":self.dailyLabels,"titles":self.titles,"datas":datas});
    }, 

    queryList:function() {
        var self = this;
        Util.getData("api/main.json",{},function(data){
            self.querySuccess(data);
        },function(v1,v2,v3){
            console.log(v1.status)
        });
        Util.getData("api/customerStatic.json",{},function(data){
            var max = parseInt(data.max);
            var avg = parseInt(data.avg);
            self.setState({"max":max,"avg":avg});
        },function(v1,v2,v3){
            console.log(v1.status)
        });
          
    },


    render:function() {
        return(
            <div className="row"> 
                <div className="col-md-12 col-xs-12 col-sm-12">
                    <Header title="客流量" />
                    <div className="row"> 
                        <StaticItem css="col-md-4 col-xs-4 col-sm-4" obj={{"title":"日最高值","data":this.state.max+"/人"}} />
                        <StaticItem css="col-md-4 col-xs-4 col-sm-4" obj={{"title":"日平均值","data":this.state.avg+"/人"}} />
                        <StaticItem css="col-md-4 col-xs-4 col-sm-4" obj={{"title":"就餐人数","data":this.state.pplNum+"/人"}} />
                    </div>
                    <div className="row"> 
                        <LineChart css="col-md-12 col-xs-12 col-sm-12" title="客流量"
                            titles={this.titles}
                            labels={this.state.labels} 
                            datas={this.state.datas}
                             />
                    </div>
                </div>
            </div>
        );
    },
});

module.exports = CustomerFlow;
