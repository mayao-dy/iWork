<template>
  <div>
    <div v-show="isloading" style="padding-top: 200px;text-align: center;width: 100%;color: #999;">
      <inline-loading></inline-loading>
    </div>
    <div v-show="!isloading">
      <div v-show="!containerSeen" style="padding-top: 200px;text-align: center;color: #999;width: 100%;">进入失败,请重新进入！</div>
      <div v-show="containerSeen">
        <div v-show="isAuthority" style="padding-top: 200px;text-align: center;color: #999;width: 100%;">仅支部书记及组织委员有权限查看</div>
        <div v-show="isInfo" style="padding-top: 200px;text-align: center;color: #999;width: 100%;">暂无数据</div>
        <div v-if="isGroup" class="group">
          <div class="item card">
            <div class="card-header">{{groupName}}</div>
            <div class="card-year">
              <!--<div class="title">2018年</div>-->
              <group class="card-month" v-for="item in groupData">
                <cell is-link :arrow-direction="item.showGroupUnPaid?'up':'down'" @click.native="getUnPaidUser(item.year,item.month,item.orgCode)">
                  <div slot="title">
                    <div class="card-content">
                      <div>
                        <div class="year-title">{{item.year}}年</div>{{item.month}}月</div>
                      <div>
                        <span>{{item.partyNum}}</span>
                        <br>党员总数</div>
                      <div>
                        <span>{{item.pay}}</span>
                        <br>已缴纳</div>
                      <div class="red">
                        <span>{{item.unpay}}</span>
                        <br>未缴纳</div>
                    </div>
                  </div>
                </cell>
                <div class="card-extend" v-if="!item.showGroupUnPaid">
                  <div class="extend-title">未缴纳人</div>
                  <div v-if="!item.unpay">无</div>
                  <!--<ul class="extend-list">
                                  <li v-for="people in item.groupUnPaidUser"> 
                                    <span>{{people.name}}</span>
                                  </li>
                                </ul>-->
                  <span class="unpaid-list" v-for="people in item.groupUnPaidUser">{{people.name}}</span>
                  <div class="extend-footer" v-if="item.unpay">
                    <a @click="callCost(item.year,item.month,item.groupUnPaidUser)">全部催交</a>
                  </div>
                </div>
              </group>
            </div>
          </div>
        </div>
        <div v-if="isDep">
          <van-tabs class="month-tabs" @click="handlerTabs" :swipe-threshold="5" sticky :active="active">
            <van-tab :key="index" v-for="(item, index) in tabData" :title="item | getMonth() + '月'">
              <template slot="title">
                <div class="year">{{item | getYear}}年</div>
                <div class="month">{{item | getMonth}}月</div>
              </template>
              <div class="item">
                <div class="card-header">{{depData.orgName}}党员缴费情况</div>
                <div class="card-content">
                  <div>
                    <span>{{depData.orgNum}}</span>
                    <br>支部总数</div>
                  <div class="border-r red">
                    <span>{{depData.OrgUnpay}}</span>
                    <br>未缴完数</div>
                  <div>
                    <span>{{depData.partyNum}}</span>
                    <br>党员总数</div>
                  <div class="red">
                    <span>{{depData.unPayNum}}</span>
                    <br>未缴纳</div>
                </div>
                <div class="card-footer"></div>
              </div>
              <div :key="index" class="item" v-for="(item, index) in depData.orgStatistics">
                <div class="card-header">{{item.orgName}}</div>
                <div class="card-content">
                  <div>
                    <span>{{item.partyNum}}</span>
                    <br>党员总数</div>
                  <div>
                    <span>{{item.pay}}</span>
                    <br>已缴纳</div>
                  <div class="red">
                    <span>{{item.unpay}}</span>
                    <br>未缴纳</div>
                </div>
                <div v-if="item.orgComm" class="card-footer">联系组织委员
                  <!--<a class="tel" :href="'tel:'+item.orgComm.mobile">{{item.orgComm.name}}</a>-->
                  <a class="tel" v-bind:href="'tel:'+item.orgComm.mobile">{{item.orgComm.name}}</a>
                </div>
              </div>
            </van-tab>
          </van-tabs>
        </div>
        <div v-if="isOrg">
          <van-tabs class="month-tabs" @click="handlerTabs" :swipe-threshold="5" sticky :active="active">
            <van-tab :key="index" v-for="(item, index) in tabData" :title="item | getMonth() + '月'">
              <template slot="title">
                <div class="year">{{item | getYear}}年</div>
                <div class="month">{{item | getMonth}}月</div>
              </template>
              <div class="item">
                <div class="card-header">全所党费缴纳情况</div>
                <div class="card-content">
                  <div>
                    <span>{{orgData.orgNum}}</span>
                    <br>党支部总数</div>
                  <div class="border-r red">
                    <span>{{orgData.OrgUnpay}}</span>
                    <br>未缴完数</div>
                  <div>
                    <span>{{orgData.partyNum}}</span>
                    <br>党员总数</div>
                  <div class="red">
                    <span>{{orgData.unPayNum}}</span>
                    <br>未缴纳</div>
                </div>
                <div class="card-footer"></div>
              </div>
              <div class="item" :key="index" v-for="(item, index) in orgData.orgStatistics">
                <div class="card-header">{{item.orgName}}</div>
                <div :key="index" v-for="(subItem, index) in item.dataList">
                  <div class="card-content">
                    <div class="title">{{subItem.orgName}}</div>
                    <div>
                      <span>{{subItem.partyNum}}</span>
                      <br>党员总数</div>
                    <div>
                      <span>{{subItem.pay}}</span>
                      <br>已缴纳</div>
                    <div class="red">
                      <span>{{subItem.unpay}}</span>
                      <br>未缴纳</div>
                  </div>
                  <div v-if="subItem.orgComm" class="card-footer">联系组织委员
                    <!--<a class="tel" :href="'tel:'+subItem.orgComm.mobile">{{subItem.orgComm.name}}</a>-->
                    <a class="tel" v-bind:href="'tel:'+subItem.orgComm.mobile">{{subItem.orgComm.name}}</a>
                  </div>
                </div>
              </div>
            </van-tab>
          </van-tabs>
  
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { MessageBox } from 'mint-ui'
import { queryURL, _tokenParams, _username } from '../../utils/index.js'
import moment from 'moment'
import { Group, Cell, InlineLoading} from 'vux'
import { Tab, Tabs } from 'vant'
import { fail } from 'assert'
import {
  getYearMonth,
  getPartyUserInfo,
  getOrgPayDuesInfo,
  getUnPaidUser,
  callCost,
  getWXUserId
} from '../../api/partyDues/index'
// import {InfiniteScroll} from 'mint-ui'

// Vue.use(InfiniteScroll)
export default {
  data() {
    return {
      isloading: true,
      containerSeen: false,
      tabData: [],
      type: '1',
      isGroup: false, // type == 1
      isDep: false, // type == 2
      isOrg: false, // type == 3
      year: moment().format('YYYY'),
      month: moment().format('M'),
      userId: sessionStorage.getItem('userId'),
      groupName: '',
      groupData: [],
      groupUnPaidUser: [],
      depData: {},
      orgData: {},
      depName: "",
      isAuthority: false,
      isInfo: false
    };
  },
  components: {
    Group,
    Cell,
    InlineLoading
  },
  computed: {
    active() {
      return this.tabData.indexOf(this.year + '-' + this.month)
    }
  },
  methods: {
    handlerTabs(index) {
      this.getOrgPayDuesInfo(
        this.userId,
        this.tabData[index].split('-')[1],
        this.tabData[index].split('-')[0]
      )
    },
    getOrgPayDuesInfo(userId, month, year) {
      console.log(month)
      getOrgPayDuesInfo(userId, month, year)
        .then(res => {
          return res.data
        })
        .then(data => {
          if (data) {
            this.isAuthority = false
            this.type = data.type
            let userType = data.type
            if (userType == '1') {
              this.isGroup = true
              this.isDep = false
              this.isOrg = false
              this.groupName = data.orgName
              this.groupData = data.orgStatistics
              this.groupData.map(x => {
                x.showGroupUnPaid = true
                return x
              })
            } else if (userType == '2') {
              this.isGroup = false
              this.isDep = true
              this.isOrg = false

              this.depData = data
            } else if (userType == '3') {
              this.isGroup = false
              this.isDep = false
              this.isOrg = true
              this.orgData = data
            } else {
              this.isAuthority = true
            }
          }
        })
    },
    getUnPaidUser(year, month, orgCode) {
      getUnPaidUser(this.userId, month, year, orgCode)
        .then(res => {
          return res.data
        })
        .then(data => {
          if (data) {
            let arr = this.groupData
            arr.map(x => {
              if (x.month == month && x.year == year) {
                if (x.showGroupUnPaid) {
                  x.showGroupUnPaid = false
                  x.groupUnPaidUser = data
                } else {
                  x.showGroupUnPaid = true
                }
              }
              return x
            })
            this.groupData = []
            arr.forEach(x => {
              this.groupData.push(x)
            })
          }
        })
    },
    callCost(year, month, user) {
      let callList = []
      user.forEach(x => {
        let obj = {
          month: month,
          userId: x.userId,
          year: year
        }
        // obj.month = month;
        // obj.year = year;
        // obj.userId = x.userId;
        callList.push(obj)
      })

      callCost(
        callList
      ).then(res => {
        return res.data
      }).then(data => {
        if (data.code == '200') {
          this.$vux.alert.show({
            // title: data.status,
            content: '催交成功'
          })
        } else {
          this.$vux.alert.show({
            title: data.status,
            content: data.desc
          })
        }
      })
    },
    getYearMonth() {
      getYearMonth()
        .then(res => {
          return res.data
        })
        .then(data => {
          let arr = []
          for (let key in data) {
            for (let i = 0; i < data[key].length; i++) {
              // arr.push({
              //   year:key,
              //   month:data[key][i]
              // });
              arr.push(key + '-' + data[key][i])
            }
          }
          this.tabData = arr.sort()
          this.month = this.tabData[this.tabData.length - 1].split('-')[1]
          this.year = this.tabData[this.tabData.length - 1].split('-')[0]
          console.log(this.month)
          //console.log(this.tabData)
          this.getOrgPayDuesInfo(this.userId, this.month, this.year)
        })
    },
    handleLogin: function () {
      const code = queryURL('code')
      if (code) {
        getWXUserId(code)
          .then(res => {
            return res.data
          })
          .then(data => {
            if (data) {
              if (data.userId) {
                //debugger
                //设置code  页面刷新的时候使用
                sessionStorage.setItem('code', code)

                sessionStorage.setItem('userId', data.userId || '')
                this.userId = sessionStorage.getItem('userId')
                this.getYearMonth()
                //this.getOrgPayDuesInfo(this.userId, this.month, this.year)
                this.containerSeen = true
              } else {
                this.containerSeen = false
              }
              this.isloading = false
            }
          })
      }
    },
  },
  filters: {
    getYear: function (item) {
      return item.split('-')[0]
    },
    getMonth: function (item) {
      return item.split('-')[1]
    }
  },
  mounted() {
    document.title = '缴费信息'
    // this.getYearMonth()
    let code = sessionStorage.getItem('code') || ''
    //alert('seesion|'+code)
    if (code) {
      this.isloading = false
      this.containerSeen = true
      this.getYearMonth()
      // this.getOrgPayDuesInfo(this.userId, this.month, this.year)
    } else {
      let code = queryURL('code')
      if (code != null && code.toString().length > 1) {
        this.handleLogin()
      } else {
        this.isloading = false
        this.containerSeen = false
      }
    }
    // this.getOrgPayDuesInfo(this.userId, this.month, this.year)

  }
}
</script>
<style lang="scss" scoped>
@import '../../styles/variable.scss';
.group {
  .unpaid-list {
    background-color: $color-gray-4;
    border-radius: 3px;
    padding: 2px 10px;
    font-size: $font-smaller;
    margin-right: 10px;
    min-width: 45px;
    display: inline-block;
  }
  .year-title {
    font-size: $font-smallest;
  }
  .card {
    background: none;
    padding: 0;
    .card-header {
      padding: 10px;
      background-color: $color-gray-1;
    }
  }
  .card-year,
  .card-month {
    &:not(:last-child) {
      border-bottom: 10px solid $color-gray-4;
    }
  }
  .card-year {
    padding: 10px;
    background-color: $color-gray-1;
    >.title {
      padding: 0 10px 5px;
      font-size: $font-smaller;
      color: $color-gray-7;
      border-bottom: 1px solid $color-gray-4;
    }
    /deep/ .weui-cells {
      margin: 0;
      .weui-cell {
        padding: 0;
      }
    }
    /deep/ .weui-cells:before {
      border: 0;
      height: 0;
    }
    /deep/ .weui-cells:after {
      border: 0;
      height: 0;
    }
  }
  .card-month {
    margin-left: -10px;
    margin-right: -10px;
    padding: 10px;
    background-color: $color-gray-1;
  }
  .card-content {
    padding: 0;
    >div {
      &:nth-child(1) {
        font-size: $font-largest;
        color: $color-gray-10;
        flex: none;
      }
      &:nth-child(2) {
        flex-grow: 2;
      }
    }
    span {
      font-size: $font-largest;
    }
  }
  .card-extend {
    .extend-title {
      padding: 10px 0;
      font-size: $font-smaller;
      color: $color-gray-6;
    }
    .extend-list {
      display: flex;
      flex-wrap: wrap;
      >li {
        flex: 1 1 auto;
        font-size: $font-smallest;
        box-sizing: border-box;
        white-space: nowrap;
        max-width: 25%;
        padding: 5px 10px;
        text-align: center;
        span {
          background-color: $color-gray-4;
          border-radius: 3px;
          padding: 2px 10px;
          font-size: 13px;
        }
      }
    }
    .extend-footer {
      padding: 10px 0;
      text-align: right;
      font-size: $font-smaller;
      a {
        color: $color-primary;
      }
    }
  }
}

.month-tabs {
  padding-top: 88px;
  /deep/ .van-tabs__wrap {
    height: 88px;
    top: 0 !important;
    position: fixed;
  }
  /deep/ .van-tab {
    flex: 0 0 20%;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    .year {
      display: none;
    }
  }
  .van-tab--active {
    .year {
      display: block;
    }
  }
}
</style>
