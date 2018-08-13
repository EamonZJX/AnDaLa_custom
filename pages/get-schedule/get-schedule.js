Page({

  data: {
    "schoolTerm":"2018-2019学期 上学期",
    "lastID":"",
    "id":"",
    "pw":""
  },
  
  onLoad: function (options) {
    this.setData({
      headHeight:getApp().globalData.headHeight,
      textHeight: getApp().globalData.textHeight,
      backHeight:getApp().globalData.backHeight
    })
  },
  getID:function(e){
    this.setData({
        "id":e.detail.value
    });
    wx.setStorageSync('studentID', e.detail.value);
  },
  getPW:function(e){
      this.setData({
          "pw":e.detail.value
      });
  },
    getSchedule:function(){
      wx.showLoading({
        title: '正在获取...',
      });
      var that=this;
      setTimeout(function () {
          wx.request({
              url: "https://www.windytrees.cn/users/ahu_spider",
              method: "POST",
              header: {
                "content-type": "application/x-www-form-urlencoded"
              },
              data: {
                "number": that.data.id,
                "password": that.data.pw
              },
              success: function (res) {
                  wx.hideLoading();
                  if(res.statusCode == 500){
                      wx.showModal({
                          title: '错误',
                          content: '用户名或密码错误\n' +
                          '请重试',
                          showCancel:false,
                          success: function(res) {
                              if (res.confirm) {
                                  console.log('用户点击确定')
                              } else if (res.cancel) {
                                  console.log('用户点击取消')
                              }
                          }
                      });
                  }
                  else{
                      wx.setStorageSync('wlist', res.data);
                      console.log(res.data);
                      wx.showToast({
                          title: '获取成功',
                          icon: 'success',
                          duration: 1000
                      });
                      setTimeout(function () {
                          wx.navigateBack()
                      }, 1000)
                  }
              }
          })
      }, 50);

    },
    onBack:function(){
      wx.navigateBack();
    }
})