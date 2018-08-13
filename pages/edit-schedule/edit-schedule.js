var app = getApp();
Page({

    data: {
        array:["一","二","三","四","五","六","日"],
        multiArray:[
            ['请选择',1,2,3,4,5,6,7,8,9,10,11],
            ['请先选择开始周数']
        ],
        lesson:"",
        teacher:"",
        startWeek:"",
        endWeek:"",
        building:"",
        classroom:"",
        skcd:0
    },

    onLoad: function (options) {
        var list = wx.getStorageSync('wlist');
        var data = [list[app.globalData.detailNum].skjc,parseInt(list[app.globalData.detailNum].skjc)+parseInt(list[app.globalData.detailNum].skcd)-1];
        if(list[app.globalData.detailNum].skjc){
            var multiArray = [['请选择',1,2,3,4,5,6,7,8,9,10,11],['请选择',1,2,3,4,5,6,7,8,9,10,11]];
            this.setData({
                multiArray:multiArray
            })
        }
        this.setData({
            headHeight: getApp().globalData.headHeight,
            textHeight: getApp().globalData.textHeight,
            backHeight:getApp().globalData.backHeight,
            multiIndex:data,
            index:list[app.globalData.detailNum].xqj-1,
            lesson:list[app.globalData.detailNum].kcmc,
            teacher:list[app.globalData.detailNum].ls,
            startWeek:list[app.globalData.detailNum].qszs,
            endWeek:list[app.globalData.detailNum].jszs,
            place:list[app.globalData.detailNum].kcdd
        });
    },
    onBack: function () {
        wx.navigateBack();
    },
    getDetail:function(e){
        var data = {};
        data[e.target.id] = e.detail.value;
        this.setData(data);
    },
    bindPickerChange: function(e) {
        this.setData({
            index: e.detail.value
        })
    },
    bindMultiPickerChange: function (e) {
        if(e.detail.value[1].name<e.detail.value[0].name){
            /*wx.showModal({
                title: '错误',
                content: '结束节数应不小于开始节数',
                showCancel:false,
                success: function(res) {
                    if (res.confirm) {
                        console.log('用户点击确定')
                    } else if (res.cancel) {
                        console.log('用户点击取消')
                    }
                }
            });*/
            var data = [0,1];
            this.setData({
                multiIndex: data,
            })
        }else{
            this.setData({
                multiIndex: e.detail.value,
            })
        }
    },
    bindMultiPickerColumnChange:function(e){
        if(e.detail.column === 0){
            var data = new Array();
            data[0] = [1,2,3,4,5,6,7,8,9,10,11];
            data[1] = data[0].slice(e.detail.value,10);
            console.log(data[1]);
            this.setData({
                multiArray:data
            });
        }
    },
    insertSchedule:function(){
        var list = wx.getStorageSync('wlist');
        var arr = {};
        console.log(this.data);
        arr.kcmc = this.data.lesson;
        arr.ls = this.data.teacher;
        arr.xqj = parseInt(this.data.index)+1;
        arr.qszs = this.data.startWeek;
        arr.jszs = this.data.endWeek;
        arr.skjc = this.data.multiArray[0][this.data.multiIndex[0]];
        arr.skcd = parseInt(this.data.multiArray[1][this.data.multiIndex[1]])-parseInt(arr.skjc)+1;
        arr.kcdd = this.data.place;
        list[app.globalData.detailNum] = arr;
        wx.setStorageSync('wlist', list);
        wx.showToast({
            title: '更新成功',
            icon: 'success',
            duration: 1000
        });
        setTimeout(function () {
            wx.navigateBack()
        }, 1000)
    },
    deleteSchedule:function(){
        wx.showModal({
            title: '确认',
            content: '是否要删除这节课？',
            success: function(res) {
                if (res.confirm) {
                    var list = wx.getStorageSync('wlist');
                    list.splice(app.globalData.detailNum,1);
                    wx.setStorageSync('wlist', list);
                    wx.navigateBack();
                }
            }
        });
    }
})