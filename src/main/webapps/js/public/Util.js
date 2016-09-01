var $ = require("jquery");
var _ = require("underscore");
var host_addr ="";
module.exports = {
    isNotEmptyArray: function(list) {
        return $.isArray(list)&&list.length>0;
    },
    sendData: function (_method, _url, _data, _success, _error) {
        var json_data = JSON.stringify(_data);
        $.ajax({
            type: _method,
            url: host_addr + _url,
            contentType: "application/json; charset=utf-8",
            data: json_data,
            success: _success,
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                if (XMLHttpRequest.status == '401')
                    toLogin(XMLHttpRequest)
                _error(XMLHttpRequest, textStatus, errorThrown);
            },
        });
    },
    postData: function (_url, _data, _success, _error) {
        this.sendData("POST", _url, _data, _success, _error);
    },
    deleteData : function (_url, _data, _success, _error) {
	    this.sendData("DELETE", _url, _data, _success, _error);
	},
    putData:function (_url, _data, _success, _error) {
	    this.sendData("PUT", _url, _data, _success, _error);
	},
	patchData:function (_url, _data, _success, _error) {
	    this.sendData("PATCH", _url, _data, _success, _error);
	},

	getData:function (_url, params, _success, _error) {
	    var paramsStr = "1=1";
	    _.map(params, function (v, k) {
	        if (!isNullOrEmpty(v)) {
	            paramsStr += ("&" + k + "=" + v);
	        }
	    })
	    $.ajax({
	        url: host_addr + _url + "?" + paramsStr,
	        contentType: "application/json; charset=utf-8",
	        cache: false,
	        async: true,
	        success: _success,
	        error: function (XMLHttpRequest, textStatus, errorThrown) {
	            _error(XMLHttpRequest, textStatus, errorThrown);
	        },
	    });
	},
	trim:function (str) { //删除左右两端的空格
	    return str.replace(/(^\s*)|(\s*$)/g, "");
	},
	isNullOrEmpty:function (strVal) {
	    if (strVal == '' || strVal == null || strVal == undefined) {
	        return true;
	    } else {
	        return false;
	    }
	},
    formatDate: function (date,fmt) {
        if(this.isNullOrEmpty(fmt)) {
            fmt="yyyy-MM-dd HH:mm:ss"
        }
        var o = {
            "M+": date.getMonth() + 1, //月份
            "d+": date.getDate(), //日
            "h+": date.getHours() % 12 == 0 ? 12 : date.getHours() % 12, //小时
            "H+": date.getHours(), //小时
            "m+": date.getMinutes(), //分
            "s+": date.getSeconds(), //秒
            "q+": Math.floor((date.getMonth() + 3) / 3), //季度
            "S": date.getMilliseconds() //毫秒
        };
        var week = {
            "0": "日",
            "1": "一",
            "2": "二",
            "3": "三",
            "4": "四",
            "5": "五",
            "6": "六"
        };
        if (/(y+)/.test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
        }
        if (/(E+)/.test(fmt)) {
            fmt = fmt.replace(RegExp.$1, ((RegExp.$1.length > 1) ? (RegExp.$1.length > 2 ? "星期" : "周") : "") + week[date.getDay() + ""]);
        }
        for (var k in o) {
            if (new RegExp("(" + k + ")").test(fmt)) {
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
            }
        }
        return fmt;
    },
    getPreDate:function(date, tag, fmt){
        var d = new Date();
        var self = this;
        switch(tag) {
            case "year":
                d = self.getYearStart(date,"");
                d.setYear(d.getFullYear()-1);
                break;
            case "month":
                d = self.getMonthStart(date, "");
                d.setMonth(d.getMonth()-1);
                break;
            case "week":
                d = self.getWeekStart(date, "");
                d.setDate(d.getDate()-7);
                break;
            case "day":
                d = self.getDayStart(date, "");
                d.setDate(d.getDate()-1);
                break;
        }
        return d;
    },

    getNextDate:function(date, tag, fmt){
        var d = {};
        var self = this;
        switch(tag) {
            case "year":
                d = self.getYearStart(date,"");
                d.setYear(d.getFullYear()+1);
                break;
            case "month":
                d = self.getMonthStart(date, "");
                d.setMonth(d.getMonth()+1);
                break;
            case "week":
                d = self.getWeekStart(date, "");
                d.setDate(d.getDate()+7);
                break;
            case "day":
                d = self.getDayStart(date, "");
                d.setDate(d.getDate()+1);
                break;
        }
        return d;
    },
    getDateStart: function(date, tag, fmt) {
        var d = {};
        var self = this;
        switch(tag) {
            case "year":
                d = self.getYearStart(date,fmt);
                break;
            case "month":
                d = self.getMonthStart(date, fmt);

                break;
            case "week":
                d = self.getWeekStart(date, fmt);
                break;
            case "day":
                d = self.getDayStart(date, fmt);
                break;
        }
        return d;
    },
    getDateEnd: function(date, tag, fmt) {
        var d = {};
        var self = this;
        switch(tag) {
            case "year":
                d = self.getYearEnd(date,fmt);
                break;
            case "month":
                d = self.getMonthEnd(date, fmt);

                break;
            case "week":
                d = self.getWeekEnd(date, fmt);
                break;
            case "day":
                d = self.getDayEnd(date, fmt);
                break;
        }
        return d;
    },
    getYearStart: function(date, fmt) {
        var d = new Date();
        d.setTime(date.getTime());
        d.setMonth(0);
        d.setDate(1);
        if(this.isNullOrEmpty(fmt)) {
            return d;
        } else {
            return this.formatDate(d,fmt);
        } 
        return d;
    },
    getYearEnd:function(date, fmt) {
        var d = new Date();
        d.setTime(date.getTime());
        d.setMonth(0);
        d.setMonth(d.getMonth()+12);
        d.setDate(1);
        if(this.isNullOrEmpty(fmt)) {
            return d;
        } else {
            return this.formatDate(d,fmt);
        } 
    },
    getMonthStart: function(date, fmt) {
        var d = new Date();
        d.setTime(date.getTime());
        d.setDate(1);
        if(this.isNullOrEmpty(fmt)) {
            return d;
        } else {
            return this.formatDate(d,fmt);
        } 
    },
    getMonthEnd: function(date, fmt) {
        var d = new Date();
        d.setTime(date.getTime());
        d.setMonth(date.getMonth()+1);
        d.setDate(1);
        if(this.isNullOrEmpty(fmt)) {
            return d;
        } else {
            return this.formatDate(d,fmt);
        } 
    },
    getWeekStart: function(date, fmt) {
        var d = new Date();
        d.setTime(date.getTime());
        d.setDate(d.getDate()-d.getDay()+1);
        if(this.isNullOrEmpty(fmt)) {
            return d;
        } else {
            return this.formatDate(d,fmt);
        } 
    },
    getWeekEnd: function(date, fmt) {
        var d = new Date();
        d.setTime(date.getTime());
        d.setDate(d.getDate()-d.getDay()+1+7);
        if(this.isNullOrEmpty(fmt)) {
            return d;
        } else {
            return this.formatDate(d,fmt);
        } 
    },
    getDayStart: function(date, fmt) {
        var d = new Date(this.formatDate(date,"yyyy-MM-dd"));
        if(this.isNullOrEmpty(fmt)) {
            return d;
        } else {
            return this.formatDate(d,fmt);
        } 

    },
    getDayEnd: function(date, fmt) {
        var d = new Date(this.formatDate(date,"yyyy-MM-dd"));
        d.setDate(d.getDate()+1);
        if(this.isNullOrEmpty(fmt)) {
            return d;
        } else {
            return this.formatDate(d,fmt);
        } 
    },
};
