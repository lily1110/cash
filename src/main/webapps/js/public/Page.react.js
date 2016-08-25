var React = require("react");
var Btn = require("./Btn.react");
var Page = React.createClass({
    clickPage: function (obj) {
        var self = this;
        var _index = obj;
        if ($.isFunction(self.props.click)) {
            self.props.click(isNullOrEmpty(_index)?0:_index);
        }
    },

    render: function () {
        var self = this;
        var index = isNullOrEmpty(this.props.index)?0:parseInt(this.props.index);
        var count =  isNullOrEmpty(this.props.count)?10:parseInt(this.props.count);
        var total =  isNullOrEmpty(this.props.total)?0:parseInt(this.props.total);
        var total_page = total % count == 0 ? total / count : parseInt(total / count) + 1;
        var current_page = index / count;
        var paramsStr = "";
        var items = [];
        if (current_page > 0) {
            var t_index = index - count;
            if(isNullOrEmpty(t_index)||t_index<0) {
                t_index = 0;
            }
            
            items.push(<li><Btn obj={t_index} click={this.clickPage} data={<span>&laquo;</span>}>  </Btn></li>);
        }

        var i = 0;
        //var j=0;
        var pageItem = 0;
        if (current_page + 3 >= total_page) {
            pageItem = total_page - 6;
            if (pageItem < 0) {
                pageItem = 0;
            }
        } else {
            if (current_page - 3 < 0) {
                pageItem = 0;
            } else {
                pageItem = current_page - 3;
            }
        }
        while (i < 6 && pageItem < total_page) {
            var _index = pageItem * count;
            items.push(
                <li><Btn obj={_index} css={pageItem==current_page?"selected":""}
                       click={ this.clickPage } data={pageItem + 1} /></li>
            );
            i++;
            pageItem++;
        }
        if (current_page + 1 < total_page) {
            var e_index = count * (current_page + 1)
            items.push(<li><Btn obj={e_index}
                               click={ this.clickPage } data={<span>&raquo;</span> } /></li>);
        }

        return (
            <div className="box-footer">
                <nav>
                    <ul className="pagination" style={{"float":"right"}}>
                        {
                            items
                        }
                    </ul>
                </nav>
            </div>
        );

    },
});

module.exports = Page;
