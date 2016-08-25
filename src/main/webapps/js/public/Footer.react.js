var React = require("react");

var Footer = React.createClass({
    render:function() {
        return(
            <footer className="main-footer">
                <div className="pull-right hidden-xs">
                    <b>Version</b> 0.0.1
                </div>
                <strong>Copyright &copy; 2014-2016 <a href="">CunLiYouRen</a>.</strong> All rights
                reserved.
            </footer>
        );

    },
});

module.exports = Footer;
