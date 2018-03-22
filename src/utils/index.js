
// 日期格式化
Date.prototype.format = function (format) {
  const o = {
    'M+': this.getMonth() + 1,
    'd+': this.getDate(),
    'h+': this.getHours(),
    'H+': this.getHours(),
    'm+': this.getMinutes(),
    's+': this.getSeconds(),
    'q+': Math.floor((this.getMonth() + 3) / 3),
    S: this.getMilliseconds(),
  }
  if (/(y+)/.test(format)) {
    format = format.replace(RegExp.$1, `${this.getFullYear()}`.substr(4 - RegExp.$1.length))
  }
  for (let k in o) {
    if (new RegExp(`(${k})`).test(format)) {
      format = format.replace(RegExp.$1, RegExp.$1.length === 1 ? o[k] : (`00${o[k]}`).substr(`${o[k]}`.length))
    }
  }
  return format
}


/**
 * @param   {String}
 * @return  {String}
 */

const queryURL = (name) => {
  let reg = new RegExp(`(^|&)${name}=([^&]*)(&|$)`, 'i')
  let r = window.location.search.substr(1).match(reg)
  if (r != null) return decodeURI(r[2])
  return null
}
//ymzhao
const _tokenParams = `userId=${localStorage.getItem('userId')}&token=${localStorage.getItem('token')}`
//const _tokenParams = 'userId=ctshi@sse.com.cn&token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1MTkzODkxODYwNzIsInBheWxvYWQiOiJ7XCJlcnJDb2RlXCI6MCxcImVyck1zZ1wiOlwib2tcIixcInVzZXJJZFwiOlwiY3RzaGlAc3NlLmNvbS5jblwiLFwibmFtZVwiOlwi5Y-y5rez54SYXCIsXCJkZXBhcnRtZW50XCI6WzE4XSxcIm9yZGVyXCI6WzBdLFwicG9zaXRpb25cIjpcIlwiLFwibW9iaWxlXCI6XCIxODkxODUwMzIxMlwiLFwiZ2VuZGVyXCI6XCIxXCIsXCJlbWFpbFwiOlwiY3RzaGlAc3NlLmNvbS5jblwiLFwiaXNMZWFkZXJcIjowLFwiYXZhdGFyXCI6XCJcIixcInRlbGVwaG9uZVwiOlwiNjg4Mjg5NTFcIixcImVuZ2xpc2hOYW1lXCI6XCJcIixcImV4dEF0dHJcIjp7XCJhdHRyc1wiOlt7XCJuYW1lXCI6XCLkuKrkurrnlLXor51cIixcInZhbHVlXCI6XCIxMzY3MTcwMDQ3MFwifSx7XCJuYW1lXCI6XCLlt6Xlj7dcIixcInZhbHVlXCI6XCJUMjY2XCJ9XX0sXCJlbmFibGVcIjoxLFwic3RhdHVzXCI6MSxcImV4dEF0dHJKc29uU3RyXCI6bnVsbH0ifQ.ybB8xurwaFbDP-uVC4Q07KL5BN4yTSOBnaIGzbEg2l8'
const _username = localStorage.getItem('username')
//const _username = 'ctshi@sse.com.cn'

module.exports = {
  queryURL,
  _tokenParams,
  _username
}