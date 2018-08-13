var app = getApp();
Page({
    data: {
        colorArrays: [
            ["#b0b0b0","#b0b0b0","#b0b0b0","#b0b0b0","#b0b0b0","#b0b0b0"],
            ["#cad9a2", "#aac78f", "#87a770", "#577557", "#91a89a", "#e8dada"]
        ],
        detailFlag:0,
        wlist: [],
        array:[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20],
        weekday:[
            ["一","--/--"],
            ["二","--/--"],
            ["三","--/--"],
            ["四","--/--"],
            ["五","--/--"],
            ["六","--/--"],
            ["日","--/--"]
        ],
        timeTable:[
            ["1","8:20"],
            ["2","9:15"],
            ["3","10:20"],
            ["4","11:15"],
            ["5","14:00"],
            ["6","14:55"],
            ["7","15:50"],
            ["8","16:45"],
            ["9","19:00"],
            ["10","19:55"],
            ["11","20:50"]
        ],
        weekNow:1,
        beginWeek:20180903
    },
    onLoad: function () {
        var that = this;
        var height = 0;
        var width = 0;
        var platform = "";
        wx.getSystemInfo({
            success: function (res) {
                console.log(res);
                console.log('height=' + res.windowHeight);
                console.log('width=' + res.windowWidth);
                height = res.windowHeight;
                width = res.windowWidth;
                platform = res.platform;
                if(platform === "ios"){
                    if((height/width)>1.67){
                        that.setData({
                            textHeight:height*0.1
                        });
                        app.globalData.textHeight = height*0.1;
                    }else{
                        that.setData({
                            textHeight:height*0.08
                        });
                        app.globalData.textHeight = height*0.08;
                    }
                    that.setData({
                        headHeight:height*0.185,
                        scrollHeight:1200,
                        innerHeight:1300,
                        topIndex:15
                    });
                    app.globalData.headHeight=height*0.185;
                    app.globalData.backHeight=parseInt(that.data.textHeight);
                }
                else{
                    if((height/width)>1.67){
                        that.setData({
                            textHeight:height*0.14
                        });
                        app.globalData.textHeight = height*0.14;
                    }else{
                        that.setData({
                            textHeight:height*0.17
                        });
                        app.globalData.textHeight = height*0.17;
                    }
                    that.setData({
                        headHeight:height*0.27,
                        scrollHeight:1250,
                        innerHeight:1400,
                        topIndex:15
                    });
                    app.globalData.headHeight=height*0.27;
                    app.globalData.backHeight=parseInt(that.data.textHeight)-12;
                }
            }
        });
      wx.request({
        url: "https://www.windytrees.cn/users/week_number",
        method: "GET",
        header: {
          "content-type": "application/json"
        },
        success: function (res) {
          console.log(res.statusCode);
          /*that.setData({
            beginWeek: res.data[0].week_number
          })*/
        }
      })
      that.setData({
        beginWeek: "20180806"
      });
        var colorSelection = ["#f2cc8d", "#eb9176", "#d66565","#b33950"];
        var str = ["一","二","三","四","五","六","日"];
        var dd = new Date();
        var weekColor = [];
        var weekFontColor = [];
        weekColor[dd.getDay()] = colorSelection[Math.floor(Math.random()*4)];
        weekFontColor[dd.getDay()] = "white";
        that.setData({
          weekColor:weekColor,
          weekFontColor:weekFontColor
        })
        dd.setDate(dd.getDate()+1-dd.getDay());
        var weekday = new Array();
        var m = dd.getMonth()+1;
        for(var i=0;i<7;i++){
            weekday[i] = new Array();
            weekday[i][0] = str[i];
            weekday[i][1] = m + "/" + dd.getDate();
            dd.setDate(dd.getDate()+1);
            m = dd.getMonth()+1;
        }
        this.setData({
            weekday:weekday
        });

    },
    onShow:function(){
      var that = this;
      var beginWeek = String(that.data.beginWeek);
      var yyyy = parseInt(beginWeek.substring(0, 4));
      if (parseInt(beginWeek[4])){
        var mm = parseInt(beginWeek.substring(4, 6))-1;
      }
      else{
        var mm = parseInt(beginWeek[5])-1;
      }
      if (parseInt(beginWeek[6])){
        var dd = parseInt(beginWeek.substring(6, 8));
      }
      else{
        var dd = parseInt(beginWeek[7]);
      }
      var currentTime = Date.now();
      var targetTime = (new Date(yyyy, mm, dd, 0, 0, 0)).getTime();
      var offsetTime = currentTime - targetTime;
      var offsetDays = Math.floor(offsetTime / (7 * 3600 * 24 * 1e3)) +1;
      console.log(currentTime);
      that.setData({
        weekNow:offsetDays
      })
      var list = wx.getStorageSync('wlist');
      var arr = [];
      for(var i=0;i<list.length;i++){
          arr.push(list[i]);
          if(this.data.weekNow>=arr[i].qszs && this.data.weekNow<=arr[i].jszs){
              arr[i].show = 1;
              arr[i].showColor = 1;
          }
          else{
              arr[i].show = 0;
              arr[i].showColor = 0;
          }
          if(app.globalData.showScheduleFlag){
              arr[i].show = 1;
          }
          //console.log(list[i].kcdd.substring(0,2));
          arr[i].kcdd = "@" + list[i].kcdd;
          if(list[i].kcdd.substring(1,3)=="博学"){
              arr[i].kcddjc = "@博" + list[i].kcdd[3] + list[i].kcdd.substring(5,list[i].kcdd.length);
          }
          else if(list[i].kcdd.substring(1,3)=="笃南"){
              arr[i].kcddjc = arr[i].kcdd.substring(0,7);
          }
          else if(list[i].kcdd.substring(2,5)=="体育场"){
              arr[i].kcddjc = "@" + list[i].kcdd[0] + "体";
          }
          else{
              arr[i].kcddjc = arr[i].kcdd;
          }
      }
      this.setData({
        wlist: arr,
        index:that.data.weekNow-1
      });
    },
    onSetting:function(){
        var that = this;
        wx.showActionSheet({
            itemList: ['导入课表', '手动添加课程','自定义背景','设置'],
            success: function (res) {
                if(res.tapIndex===0){
                    wx.navigateTo({
                      url: '../get-schedule/get-schedule'
                    });
                }
                else if (res.tapIndex === 1){
                  wx.navigateTo({
                    url: '../insert-schedule/insert-schedule'
                  });
                }
                else if(res.tapIndex ===2){
                    /*wx.chooseImage({
                        count: 1,
                        sizeType: ['original'],
                        sourceType:['album'],
                        success:function(res){
                            wx.getImageInfo({
                                src: res.tempFilePaths[0],
                                success: function (res) {
                                    //console.log(res.width);
                                    //console.log(res.height);
                                    var standard = 16/9;
                                    if(res.height/res.width > standard){//横版图片
                                        that.data.height = res.width * standard;
                                        that.data.width = res.width;

                                    }else{//竖版图片
                                        that.data.width = res.height/standard;
                                        that.data.height = res.height;
                                    }
                                }
                            })
                        }
                    })*/
                    wx.showModal({
                        title: '敬请期待',
                        content: '略略略(๑•̀ㅂ•́)و✧',
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
                else if(res.tapIndex ===3){
                    wx.navigateTo({
                        url: '../schedule-set/schedule-set'
                    });
                }
            },
            fail: function (res) {
                console.log(res.errMsg)
            }
        })
    },
    showCardView:function(e){
        var that = this;
        var start = this.data.wlist[e.currentTarget.dataset.index].skjc;
        var last = this.data.wlist[e.currentTarget.dataset.index].skcd;
        var jie = "";
        for(var i=0;i<last;i++){
            jie = jie + start + ",";
            start++;
        }
        jie = jie.substring(0,jie.length-1);
        setTimeout(function () {
            that.setData({
                detailNum:e.currentTarget.dataset.index,
                detailJie:jie,
                detailFlag:1
            });
        }, 50);
        app.globalData.detailNum = parseInt(e.currentTarget.dataset.index);

    },
    closeDetail:function(){
        if(this.data.detailFlag){
            this.setData({
                detailFlag:0
            });
        }
    },
    onEdit:function(){
        app.globalData.editFlag = 1;
        wx.navigateTo({
          url: '../edit-schedule/edit-schedule'
        })
    },
    bindPickerChange:function(e) {
        var that = this;
        this.setData({
            index: e.detail.value
        });
        var arr = [];
        for (var i = 0; i < that.data.wlist.length; i++) {
            arr.push(that.data.wlist[i]);
            if (parseInt(e.detail.value) + 1 >= parseInt(that.data.wlist[i].qszs) && parseInt(e.detail.value) + 1 <= parseInt(that.data.wlist[i].jszs)) {
                arr[i].show = 1;
                arr[i].showColor = 1;
            }
            else {
                arr[i].show = 0;
                arr[i].showColor = 0;
            }
            if (app.globalData.showScheduleFlag) {
                arr[i].show = 1;
            }
        }
        that.setData({
            wlist:arr
        })
    }
})
