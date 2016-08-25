var React = require("react");
var ReactRouter = require('react-router');
var Link = ReactRouter.Link;
var Td = require("./Td.react");

var Table = React.createClass({
    thead: function () {
        var items = [];
        if ($.isArray(this.props.heads)) {
            _.each(this.props.heads, function (t) {
                items.push(<th>{t.data}</th>);
            });
        }
        return (<tr>{items}</tr>);
    },

    tbody: function () {
        var datas = this.props.datas;
        var trs = [];
        if ($.isArray(datas)) {
            _.each(datas, function (d) {
                var tds = [];
                if ($.isArray(d)) {
                    _.each(d, function (t) {
                        if (!_.isNull(t)) {
                            var data = isNullOrEmpty(t.data) ? "" : t.data;
                            var css = isNullOrEmpty(t.css) ? "" : t.css;
                            var link = isNullOrEmpty(t.link) ? "" : t.link;
                            var click = $.isFunction(t.click) ? t.click : "";
                            tds.push(<Td obj={t.obj} css={css} link={link} click={click} data={data}/>)
                        }

                    });
                }
                trs.push(<tr>{tds}</tr>)

            })
        }
        return trs;
    },
    render: function () {
        return (
            <div className="box-body">
                <table className="table table-bordered table-hover">
                    <thead>
                    {this.thead()}
                    </thead>
                    <tbody>{this.tbody()}</tbody>
                </table>
            </div>
        );

    },
});

module.exports = Table;
