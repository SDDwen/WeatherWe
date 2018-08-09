import { getWeatherType, weatherColorMap } from '../../util/index.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nowTemp: [0, 0],
    nowType: '--',
    nowWeatherBg: '/images/sunny-bg.png',
    AirIndex: [{ title: 'PM2.5', content: 61 }, { title: 'PM10', content: 61 },
    { title: 'AQI', content: 61 }, { title: '湿度', content: '90%' }],
    tipContent: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getNow()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.getNow(() => {
      wx.stopPullDownRefresh()
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  getNow(callback) {

    wx.request({
      url: 'https://www.sojson.com/open/api/weather/json.shtml',
      data: {
        city: '阳江'
      },
      success: res => {

        if (res.data.status && res.data.status === 304) {
          console.log('操作太频繁')
          return
        }
        let result = res.data.data
        if (!result.forecast) return
        this.getTemp(result)
        this.getAirIndex(result)
        console.log(result)
      },
      fail: err => {
        console.log('出错了')
      },
      complete: () => {
        callback && callback()
      }

    })
  },

  // 获取大屏空气信息
  getTemp(result){
    let wType = result.forecast[0].type
    let temp = [
      Math.round((result.forecast[0].low.split(' ')[1]).split('℃')[0]),
      Math.round((result.forecast[0].high.split(' ')[1]).split('℃')[0])
    ]
    this.setData({
      nowTemp: temp,
      nowType: wType,
      nowWeatherBg: `/images/${getWeatherType(wType)}-bg.png`,
    })
    wx.setNavigationBarColor({
      frontColor: '#000000',
      backgroundColor: weatherColorMap[getWeatherType(wType)]
    })
  },

  // 获取空气指数
  getAirIndex(result){
    const list = [...this.data.AirIndex]
    const listValue = [
      result.pm25, result.pm10, result.forecast[0].aqi, result.shidu]
    for (let i = 0; i < listValue.length; i++) {
      list[i].content = listValue[i]
    }
    this.setData({
      AirIndex: list,
      tipContent: `${result.quality}，${result.ganmao}。${result.forecast[0].notice}。`
    })
  }
})