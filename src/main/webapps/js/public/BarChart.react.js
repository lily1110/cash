var React = require("react");
var _ = require("underscore");
var $ = require("jquery");

var Bar = require("react-chartjs").Bar;

var BarChart = React.createClass({
    labels:[],
    datas:[],
    backgroundColors:[],
    borderColors:[],
    handleList: function(hashMap) {
        var labels = [];
        var datas = [];
        var backgroundColors = [];
        var borderColors = [];
        _.map(hashMap, function(v,k) {
            labels.push(k);
            datas.push(v);
            backgroundColors.push("rgba(100,200,225,0.1)");
            borderColors.push("#3CC2DB");
        });
        this.labels = labels;
        this.datas = datas;
        this.backgroundColors = backgroundColors;
        this.borderColors = borderColors;
    },
    getLegend: function() {
        var view= [];
        var titles = this.props.titles;
        var colors = this.backgroundColors;
        for(var i=0;$.isArray(titles)&&i<titles.length&&i<colors.length;i++){
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
        var hashMap = self.props.data;
        var title = self.props.title;
        var unit = self.props.unit?"单位："+self.props.unit:"";

        self.handleList(hashMap);

        var chartOptions = {
            responsive : true,
        };
        var chartData =  {
            labels: self.labels,
            datasets: [{
                    data: self.datas,
                    fillColor : "rgba(220,220,220,0.5)",
                    strokeColor : "rgba(220,220,220,0.8)",
                    highlightFill : "rgba(151,187,205,0.75)",
                    highlightStroke : "rgba(151,187,205,1)",
                }
            ]
        };
        return (
            <div className={css+" chart"}>
                <div className="unit">{unit}</div>
                {
                    hashMap?( <Bar data={chartData} options={chartOptions}/>):""
                }
               
            </div>
        )
  }
});
module.exports = BarChart;
