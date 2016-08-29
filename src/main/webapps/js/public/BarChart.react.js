var React = require("react");
var _ = require("underscore");

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
    render: function() {
        var self = this;
        var css = self.props.css;
        var hashMap = self.props.data;
        var title = self.props.title;

        self.handleList(hashMap);

        var chartOptions = {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero:true
                    }
                }]
            },
        };
        var chartData =  {
            labels: self.labels,
            datasets: [{
                    label: title?title:"",
                    backgroundColor: self.backgroundColors,
                    borderColor: self.borderColors,
                    borderWidth: 1,
                    data: self.datas
                }
            ]
        };
        return (
            <div css={css}>

                <Bar data={chartData} options={chartOptions}/>
            </div>
        )
  }
});
module.exports = BarChart;
