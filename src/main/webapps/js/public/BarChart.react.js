var React = require("react");
var _ = require("underscore");
var $ = require("jquery");
var Util = require("./Util");

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
            barValueSpacing:20,
        };
        var chartData =  {
            labels: self.labels,
            datasets: [{
                    data: self.datas,
                    fillColor : "#3CC2DB",
                    strokeColor : "#3CC2DB",
                    highlightFill : "#45e1fe",
                    highlightStroke : "#45e1fe",
                }
            ]
        };
        return (
            <div className={css+" chart"}>
                {
                    Util.isNotEmptyArray(self.datas)?(<div className="unit">{unit}</div>):""
                }
                {
                    Util.isNotEmptyArray(self.datas)?(<Bar data={chartData} options={chartOptions}/>):(<div className="no-data">没有数据</div>)
                }
               
            </div>
        )
  }
});
module.exports = BarChart;
