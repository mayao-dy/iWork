<template>
  <div class="dues-history">
    <div v-show="isloading" style="padding-top: 200px;text-align: center;width: 100%;color: #999;">
      <inline-loading></inline-loading>
    </div>
    <div v-show="!isloading">
      <div v-show="!containerSeen" style="padding-top: 200px;text-align: center;color: #999;width: 100%;">进入失败,请重新进入！</div>
      <div v-show="containerSeen" :key="index" v-for="(item, index) in partyDuesList" :class="{'show-detail': item.year+item.month==currentMonth, 'no-pay': item.status=='01', 'paid': item.status=='02'}" class="item pay-list no-pay">
        <div class="pay-base">
          <div class="title">{{item.year}}年{{item.month}}月党费信息</div>
          <div class="money">{{item.amt}}</div>
          <div class="confirm">
            <span v-if="item.status=='01'" class="state" @click="handleConfirm(item)">未确认</span>
            <span v-else-if="item.status=='02'" class="state">已确认</span>
            <span v-if="item.status=='02'" class="payDate">{{item.payDate}}</span>
          </div>
        </div>
        <!--<div class="pay-detail">
                  <div class="title">{{item.year}}年{{item.month}}月党费应缴</div>
                  <div class="money">{{item.amt}}</div>
                  <ul class="info">
                    <li class="info-item">
                      <span>收款方</span>
                      <span>中国共产党上海证券交易所委员会</span>
                    </li>
                    <li class="info-item">
                      <span>收款卡号</span>
                      <span>03340300040026582</span>
                    </li>
                    <li class="info-item">
                      <span>收款行</span>
                      <span>中国农业银行</span>
                    </li>
                    <li class="info-item">
                      <span class="clipboard-text">备注信息请填写：
                        <br>{{userInfo.id+'+'+userInfo.name+'+'+item.month+'月+'+item.amt+'元'}}</span>
                      <span class="clipboard-button" :data-clipboard-text="userInfo.id+'+'+userInfo.name+'+'+item.month+'月+'+item.amt+'元'">复制</span>
                    </li>
                  </ul>
                  <div v-if="item.status=='01'" class="state">
                    <div class="button">缴费确认</div>
                    <div class="tips">在线支付功能正在开发中，敬请期待...</div>
                  </div>
                  <div v-else-if="item.status=='02'" class="state">
                    <div class="text">3月党费已确认--{{item.payDate | toDate}}</div>
                  </div>
                </div>-->
      </div>
    </div>
  </div>
</template>
<script>
import { InlineLoading } from 'vux'
import { queryURL, _tokenParams, _username } from '../../utils/index.js'
import clipboard from 'clipboard'
import moment from 'moment'
import {
  getOrgList,
  getPartyUserInfo,
  getPartyDuesList,
  getWXUserId,
  getYearMonth,
  confirmPay
} from '../../api/partyDues/index'
export default {
  components: {
    InlineLoading
  },
  data() {
    return {
      isloading: true,
      containerSeen: false,
      userInfo: {},
      partyDuesList: [],
      currentMonth: this.$route.params.month,
      tabData: [],
      year: moment().format('YYYY'),
      month: moment().format('M'),
    }
  },
  methods: {
    showDetail: function (month) {
      this.currentMonth = month
    },
    sessionStorageSet: function (key, value) {
      sessionStorage.setItem(key, JSON.stringify(value))
    },
    sessionStorageGet: function (key, isRemove) {
      let result = JSON.parse(sessionStorage.getItem(key))
      isRemove && sessionStorage.removeItem(key)
      return result
    },
    getPartyDuesList: function (userId, status) {
      return getPartyDuesList(userId, status)
    },
    openItem(item) {
      this.currentMonth = item.year + item.month
    },
    handleConfirm(item) {
      let self = this
      this.$vux.confirm.show({
        // title: data.status,
        content: "确认" + item.month + "月党费已缴纳",
        onConfirm() {
          self.confirmPay(item)
        }
      })
    },
    confirmPay(item) {
      confirmPay(
        sessionStorage.getItem('userId'),
        item.month,
        item.year,
        this.userInfo.id +
        '+' +
        this.userInfo.name +
        '+' +
        item.month +
        '月+' +
        item.amt +
        '元'
      )
        .then(res => {
          return res.data
        })
        .then(data => {
          if (data.code == '200') {
            // this.$vux.alert.show({
            //   title: "¥"+item.amt,
            //   content: item.year+"年"+item.month+"月缴费确认成功",
            // })
            //this.getPartyDuesList(sessionStorage.getItem('userId'), '03')
            this.getPartyDuesList(sessionStorage.getItem('userId'), '03')
              .then(res => {
                return res.data
              })
              .then(data => {
                this.partyDuesList = data
              })
          } else {
            this.$vux.alert.show({
              // title: data.status,
              //content: data.desc
              title: "确认失败！",
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
          !this.sessionStorageGet('userInfo') &&
            getPartyUserInfo(sessionStorage.getItem('userId'))
              .then(res => {
                return res.data
              })
              .then(data => {
                if (data) {
                  this.userInfo = data
                  this.sessionStorageSet('userInfo', data)
                }
              })
          this.userInfo = this.sessionStorageGet('userInfo')
          this.getPartyDuesList(sessionStorage.getItem('userId'), '03')
            .then(res => {
              return res.data
            })
            .then(data => {
              this.partyDuesList = data
            })
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
                this.getYearMonth()

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
  // created() {
  //   let cb = new clipboard('.clipboard-button')
  //   cb.on('success', () => {
  //     this.$vux.toast.text('复制成功')
  //   })
  //   cb.on('error', () => {
  //     this.$vux.toast.text('复制失败')
  //   })
  //   !this.sessionStorageGet('userInfo') &&
  //     getPartyUserInfo('xuandong@sse.com.cn')
  //       .then(res => {
  //         return res.data
  //       })
  //       .then(data => {
  //         if (data) {
  //           this.userInfo = data
  //           this.sessionStorageSet('userInfo', data)
  //         }
  //       })
  //   this.userInfo = this.sessionStorageGet('userInfo')
  //   this.getPartyDuesList(this.userInfo.userId, '03')
  //     .then(res => {
  //       return res.data
  //     })
  //     .then(data => {
  //       this.partyDuesList = data
  //     })
  // },
  filters: {
    toDate: function (payDate) {
      return moment(payDate).format('YYYY.M.DD')
    }
  },
  mounted() {
    document.title = '历史缴费'
    let code = sessionStorage.getItem('code') || ''
    //alert('seesion|'+code)
    if (code) {
      this.isloading = false
      this.containerSeen = true
      this.getYearMonth()
      // !this.sessionStorageGet('userInfo') &&
      //   getPartyUserInfo(sessionStorage.getItem('userId'))
      //     .then(res => {
      //       return res.data
      //     })
      //     .then(data => {
      //       if (data) {
      //         this.userInfo = data
      //         this.sessionStorageSet('userInfo', data)
      //       }
      //     })
      // this.userInfo = this.sessionStorageGet('userInfo')
      // this.getPartyDuesList(sessionStorage.getItem('userId'), '03')
      //   .then(res => {
      //     return res.data
      //   })
      //   .then(data => {
      //     this.partyDuesList = data
      //   })
    } else {
      let code = queryURL('code')
      if (code != null && code.toString().length > 1) {
        this.handleLogin()
      } else {
        this.isloading = false
        this.containerSeen = false
      }
    }

    let cb = new clipboard('.clipboard-button')
    cb.on('success', () => {
      this.$vux.toast.text('复制成功')
    })
    cb.on('error', () => {
      this.$vux.toast.text('复制失败')
    })
    // !this.sessionStorageGet('userInfo') &&
    //   getPartyUserInfo(sessionStorage.getItem('userId'))
    //     .then(res => {
    //       return res.data
    //     })
    //     .then(data => {
    //       if (data) {
    //         this.userInfo = data
    //         this.sessionStorageSet('userInfo', data)
    //       }
    //     })
    // this.userInfo = this.sessionStorageGet('userInfo')
    // this.getPartyDuesList(sessionStorage.getItem('userId'), '03')
    //   .then(res => {
    //     return res.data
    //   })
    //   .then(data => {
    //     this.partyDuesList = data
    //   })

  }
}
</script>
<style lang="scss" scoped>
@import '../../styles/variable.scss';
.weui-dialog__title {
  color: $color-money;
  &:before {
    content: '¥';
  }
}
</style>
