var React = require("react");

var LineChart = require("react-chartjs").Line;

var MyChart = React.createClass({
  render: function() {
  	var chartOptions = {
        bezierCurve:false,
        legendTemplate : "<ul><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].strokeColor%>\"><%if(datasets[i].label){%><%=datasets[i].label%><%}%></span></li><%}%></ul>",
        legend: {
            display: true,
            labels: {
                fontColor: 'rgb(255, 99, 132)'
            }
        },
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero:true
                }
            }]
        },
    //String - A legend template
    };
    var chartData =  {
        labels: ["January", "February", "March", "April", "May", "June", "July"],

        datasets: [  {
            label: "My First dataset",
            fillColor: "rgba(100,200,225,0.1)",
            strokeColor: "#3CC2DB",//折线的颜色
            pointColor: "#3CC2DB",//点的颜色
            // pointStrokeColor: "yellow",
            // pointHighlightFill: "green",//鼠标移到点上面的颜色
            // pointHighlightStroke: "white",//点的边框颜色
            data: [65, 59, 80, 81, 56, 55, 40],
        },
        {
            label: "My Second dataset",
            fillColor: "rgba(200,200,225,0.1)",
            strokeColor: "#D6D6D6",
            pointColor: "#D6D6D6",
            pointStrokeColor: "#D6D6D6",
            // pointHighlightStroke: "rgba(151,187,205,1)",
            data: [28, 48, 40, 19, 86, 27, 90],
        }
        ]
    };
    return (
    	<div>
    	<LineChart data={chartData} options={chartOptions} width="600" height="250"/>
    	</div>
    	)
  }
});
module.exports = MyChart;
