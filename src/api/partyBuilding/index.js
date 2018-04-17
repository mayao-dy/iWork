import axios from 'axios'
import qs from 'qs'
var instance = axios.create({
        baseURL: '/api'
    })
    /* name: 用于获取当前活动全部打卡点。
     * method: GET
     * url: /v1/clock/place/all
     */
export function getClockPlaceAll() {
    return instance.get('/v1/clock/place/all')
}
/* name: 用于获取该用户当前活动已打卡点信息
 * method: GET
 * url: /v1/clock/place/clocked/{userId}
 */
export function getClockedPlace(userId) {
    return instance.get('/v1/clock/place/clocked/' + userId)
}
/* name: 用于获取当前活动打卡排行,要获取全部时top填0。
 * method: GET
 * url: /v1/clock/rank/{top}
 */
export function getClockRank() {
    return instance.get('/v1/clock/rank/20')
}
/* name: 用于获取当前活动事件,要获取全部时top填0。
 * method: GET
 * url: /v1/clock/event/{top}
 */
export function getClockEvent(top) {
    return instance.get('/v1/clock/event/' + top)
}
/* name: 用于用户活动打卡。#######测试#########
 * method: POST
 * url: /v1/clock/place1
 */
export function postClockPlaceTest(userId, place, longitude, latitude) {
    let data = qs.stringify({
        userId,
        place,
        longitude,
        latitude
    })
    return instance.post('/v1/clock/place1', data)
}
/* name: 用于用户活动打卡。
 * method: POST
 * url: /v1/clock/place1
 */
export function postClockPlace(userId, content) {
    let data = qs.stringify({
        userId,
        content
    })
    return instance.post('/v1/clock/place', data)
}
/* name: 用于企业微信用户登陆。
 * method: POST
 * url: /v1/login/in/{code}
 */
export function handleLogin(code) {
    return instance.post('/v1/login/in/' + code)
}
/* name: 用于页面获取企业微信js-sdk签名。
 * method: GET
 * url: /v1/login/sign
 */
export function getLoginSign() {
    // let url="http://121.40.142.191:8585/"
    // return instance.get('/v1/login/sign?url=' + url)
    return instance.get('/v1/login/sign')
}