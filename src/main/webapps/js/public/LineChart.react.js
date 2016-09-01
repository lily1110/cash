var React = require("react");
var _ = require("underscore");
var $ = require("jquery");
var Line = require("react-chartjs").Line;

var LineChart = React.createClass({
    fillColor: ["rgba(100,200,225,0.1)","rgba(200,200,225,0.1)"],
    strokeColor:["#3CC2DB","#D6D6D6"],
    pointColor:["#3CC2DB","#D6D6D6"],
    datasets:[],
    chartOptions :{
        bezierCurve:false,
        responsive: true,
         title: {
            display: true,
            text: 'Custom Chart Title'
        },
        scales: {
            yAxes: [{
                stacked: true,
                ticks: {
                    beginAtZero:true,
                }
            }],
            xAxes: [{
                stacked: true
            }]
        },
    //String - A legend template
    },
    handleList: function(hashMap) {
        var labels = [];
        var datas = [];
        var backgroundColors = [];
        var borderColors = [];
        _.map(hashMap, function(v,k) {
            labels.push(k);
            datas.push(v);
        });
        this.labels = labels;
        this.datas = datas;
        this.backgroundColors = backgroundColors;
        this.borderColors = borderColors;
    },
    getHandleSets: function(titles, datas) {
        var self = this;
        var sets = [];
        if (!$.isArray(titles)) {
            console.log("titles's length is 0");
            return;
        }
        if (!$.isArray(datas)) {
            console.log("datas's length is 0");
            return;
        }
        if (titles.length!=datas.length) {
            console.log("titles's length is different from datas's");
            return;
        }

        for(var i=0;i< titles.length;i++) {
            var set = {
                label:titles[i],
                fillColor: self.fillColor[i],
                strokeColor: self.strokeColor[i],
                pointColor: self.pointColor[i],
                data:datas[i]
            };
            sets.push(set);
        }
        self.datasets = sets;
    },
    getLegend: function() {
        var view= [];
        var titles = this.props.titles;
        var colors = this.pointColor;
        for(var i=0;i<titles.length&&i<colors.length;i++){
            var c = (<dt style={{backgroundColor:colors[i]}}></dt>);
            var d = (<dd>{titles[i]}</dd>)
            var v = (<dl>{c}{d}</dl>)
            view.push(v);
        }
        return view;
    },
    render: function() {
        var self = this;
        var css = self.props.css;
        var datas = self.props.datas;
        var titles = self.props.titles;
        var labels = self.props.labels;
        var unit = self.props.unit?"单位："+self.props.unit:"";
        self.getHandleSets(titles,datas);
        var chartData =  {
            labels: labels,
            datasets: self.datasets
        };
        if(!$.isArray(datas)||datas.length<1||!$.isArray(labels)||labels.length<1) {
            return <div/>
        }

        return (
            <div className={css+" chart"}>
                <div className="unit">{unit}</div>
                <div className="legend">
                 {this.getLegend()}
                </div>
                <Line data={chartData} options={this.chartOptions}/>
            </div>
        )
  }
});
module.exports = LineChart;
