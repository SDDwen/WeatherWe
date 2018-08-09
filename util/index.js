/*
 * 获取中文天气情况英文字符
 * @param:type => 中文字符
*/
export const getWeatherType = (type) => {
  if (type.indexOf('晴天')>-1){
    return 'sunny'
  }
  if (type.indexOf('云')>-1){
    return 'cloudy'
  }
  if (type.indexOf('阴')>-1){
    return 'overcast'
  }
  if (type.indexOf('大雨') > -1) {
    return 'heavyrain'
  }
  if (type.indexOf('雨')>-1){
    return 'lightrain'
  }
  if (type.indexOf('雪')>-1){
    return 'snow'
  }
  else{
    return 'sunny'
  }
}

// 不同天气情况对应不同字符串
export const weatherColorMap = {
  'sunny': '#cbeefd',
  'cloudy': '#deeef6',
  'overcast': '#c6ced2',
  'lightrain': '#bdd5e1',
  'heavyrain': '#c5ccd0',
  'snow': '#aae1fc'
}