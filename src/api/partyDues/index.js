import axios from 'axios'
import qs from 'qs'
var instance = axios.create({
  baseURL: '/PD/api',
  // headers: {
  //   'Content-Type': 'application/json;charset=UTF-8'
  // }
})
/* name: 查询党组织架构
 * method: GET
 * url: /partyDues/getOrgList
 */
export function getOrgList() {
  return instance.get('/partyDues/getOrgList')
}
/* name: 验证码获取
 * method: GET
 * url: /partyDues/getSmsCode
 */
export function getSmsCode(userId) {
  return instance.get('/partyDues/getSmsCode', {
    params: {
      userId
    }
  })
}
/* name: 校验验证码
 * method: POST
 * url: /partyDues/checkSmsCode
 * data: {smsCode, userId}
 * 
 */
export function checkSmsCode(data) {
  return instance.post('/partyDues/checkSmsCode', JSON.parse(data))
}
/* name: 确认已缴纳
 * method: POST
 * url: /partyDues/confirmPay
 */
export function confirmPay(userId, month, year, desc) {
  let data = qs.stringify({
    userId, month, year, desc
  })
  return instance.post('/partyDues/confirmPay', data)
}
/* name: 支部党费缴纳信息
 * method: GET
 * url: /partyDues/getOrgPayDuesInfo
 */
export function getOrgPayDuesInfo(userId, month, year) {
  return instance.get('/partyDues/getOrgPayDuesInfo', {
    params: {
      userId,
      month,
      year
    }
  })
}
/* name: 个人缴费信息查询
 * method: POST
 * url: /partyDues/getPartyDuesList
 */
export function getPartyDuesList(userId, status) {
  return instance.post('/partyDues/getPartyDuesList', qs.stringify({
    userId, 
    status
  }))
}
/* name: 个人用户信息查询
 * method: GET
 * url: /partyDues/getPartyUserInfo
 */
export function getPartyUserInfo(userId, month=0, year=0) {
  return instance.get('/partyDues/getPartyUserInfo', {
    params: {
      userId,
      month,
      year
    }
  })
}
/* name: 未缴纳用户查询
 * method: GET
 * url: /partyDues/getUnPaidUser
 */
export function getUnPaidUser(userId, month, year,orgCode) {
  return instance.get('/partyDues/getUnPaidUser', {
    params: {
      userId,
      month,
      year,
      orgCode
    }
  })
}
/* name: 获取登录用户Id
 * method: GET
 * url: /partyDues/getWXUserId
 * params: code
 */
export function getWXUserId(code) {
  return instance.get('/partyDues/getWXUserId', {
    params: {
      code
    }
  })
}
/* name: 查询期数
 * method: GET
 * url: /partyDues/getYearMonth
 */
export function getYearMonth() {
  return instance.get('/partyDues/getYearMonth', {
    params: {
    }
  })
}
/* name: 一键催缴
 * method: POST
 * url: /partyDues/callCost
 */
export function callCost(callList) {
  // let data = qs.stringify({
  //   callList
  // })
  return instance.post('/partyDues/callCost', callList)
}