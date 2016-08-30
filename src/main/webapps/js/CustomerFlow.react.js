var React = require("react");
var ReactRouter = require("react-router");
var LineChart = require("./public/LineChart.react");
var Util = require("./public/Util");
var StaticItem = require("./public/StaticItem.react");
var Header = require("./public/Header.react");
var _ = require("underscore");
var TimeTab = require("./public/TimeTab.react");

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
         var params = {
            start:"2016-05-29",
            end:"2016-05-30",
            tag:"day",
        };
        this.queryList(params);
    },
    componentWillUnmount:function() {
    },
   
    querySuccess: function(data,params) {
        var self = this;
        var list = data;
        list = _.sortBy(list, "hour");
        var pplNum = 0;
        var tag = params.tag;

        _.each(list, function(t){
            pplNum += parseInt(t.pplNum);
            var d = new Date(t.date);
            var week = Util.formatDate(d,"EE");
            var month = Util.formatDate(d,"MM");
            var day = Util.formatDate(d,"dd");
            var hour = t.hour;
            t["hourDesc"] = parseInt(hour)+":00";
            t["week"] = week;
            t["month"] = parseInt(month)+"";
            t["day"] = parseInt(day)+"";
        });

        var groups ={};
        var labels = [];

        var datas=[];
        var data=[];

        switch(tag) {
            case "day":
                labels = labels.concat(self.dailyLabels);
                groups = _.groupBy(list, "hourDesc");
                break;
            case "week":
                labels = labels.concat(self.weeklyLabels);
                groups = _.groupBy(list, "week");

                
                break;
            case "month":
                labels = labels.concat(self.monthlyLabels);
                groups = _.groupBy(list, "day");

                break;
            case "year":
                labels = labels.concat(self.yearlyLabels);
                groups = _.groupBy(list, "month");
                break;

        }


        _.each(labels,function(l){
            var d = 0;
            if(!Util.isNullOrEmpty(groups[l]) ) {
                var g = groups[l];
                _.each(g,function(t) {
                    d+= parseInt(t.pplNum)
                });
            } 
            data.push(d);
        });
        datas.push(data);

        this.setState({"pplNum":pplNum,"labels":labels,"titles":self.titles,"datas":datas});
    }, 
    filter: function(list,params) {
        list = _.filter(list, function(t){
            return t.date >= params.start && t.date< params.end;
        });
        return list;
    },
    queryList:function(params) {
        var self = this;
        Util.getData("api/main.json",{},function(data){
            data = self.filter(data,params)
            self.querySuccess(data,params);
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
    clickTab: function(tag, start,end){
        var params = {
            start:start,
            end: end,
            tag:tag,
        };
        this.queryList(params);
    },

    render:function() {
        return(
            <div className="row"> 
                <div className="col-md-12 col-xs-12 col-sm-12">
                    <div className="row"> 
                        <Header title="客流量" />
                    </div>
                    <TimeTab css="tab" click={this.clickTab} current="2016-05-29"/>
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
