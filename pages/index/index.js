//index.js
//获取应用实例
var app = getApp()
Page({
    data: {
        motto: 'Hello World',
        userInfo: {},
        weather: {
            currentCity: "北京"
        }
    },
    onLoad: function() {
        this.getLocation();
    },
    getLocation: function() {
        let self = this;
        wx.getLocation({
            success: (res) => {
                let url = `http://api.map.baidu.com/telematics/v3/weather?location=${res.longitude},${res.latitude}&output=json&ak=551220f698647648162cd1b479ef71e2`;
                wx.request({
                    url: url,
                    success: function(data) {
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
        console.info(results);
        this.setData({
            weather: results,
            wtinfo: results.weather_data[0]
        });
    }
})
