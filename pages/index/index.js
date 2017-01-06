//index.js
//获取应用实例
var app = getApp()
Page({
    data: {
        motto: 'Hello World',
        userInfo: {}
    },
    //事件处理函数
    bindViewTap: function() {
        wx.navigateTo({
            url: '../logs/logs'
        })
    },
    onLoad: function() {
        var that = this;

        //调用应用实例的方法获取全局数据
        app.getUserInfo(function(userInfo) {
            //更新数据
            that.setData({
                userInfo: userInfo
            })
        })
        that.getLocation();
    },
    getLocation: function() {
        let self = this;
        wx.getLocation({
            success: (res) => {
                // console.log(res);
                let url = `http://api.map.baidu.com/telematics/v3/weather?location=${res.longitude},${res.latitude}&output=json&ak=551220f698647648162cd1b479ef71e2`;
                wx.request({
                    url: url,
                    success: function(data) {
                        // console.log(data);
                        self.showWt(data.data);
                    }
                });
            }
        })
    },
    showWt: function(data) {
        if(data.status != "success"){
            wx.showToast({
                title: "请求天气信息失败,请稍后重试"
            });
            return;
        }
        let results = data.results[0];
    }
})
