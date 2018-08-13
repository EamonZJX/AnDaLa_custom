var app = getApp();
Page({

  data: {
    
  },

  onLoad: function (options) {
      this.setData({
          headHeight:getApp().globalData.headHeight,
          textHeight: getApp().globalData.textHeight,
          backHeight:getApp().globalData.backHeight
      });
      if(app.globalData.showScheduleFlag){
          this.setData({
              imgSrc:"/icon/showScheduleS.png"
          })
      }
      else{
          this.setData({
              imgSrc:"/icon/showSchedule.png"
          })
      }
  },
    onBack:function(){
        wx.navigateBack();
    },
    showSchedule:function(){
      if(app.globalData.showScheduleFlag){
          app.globalData.showScheduleFlag = 0;
          this.setData({
              imgSrc:"/icon/showSchedule.png"
          })
      }
      else{
          app.globalData.showScheduleFlag = 1;
          this.setData({
              imgSrc:"/icon/showScheduleS.png"
          })
      }
    }
})