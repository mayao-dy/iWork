<template>
  <div>
    <div v-show="isloading" style="padding-top: 200px;text-align: center;width: 100%;color: #999;">
      <inline-loading></inline-loading>
    </div>
    <div v-show="!isloading">
      <div v-show="!containerSeen" style="padding-top: 200px;text-align: center;color: #999;width: 100%;">进入失败,请重新进入！</div>
      <div v-show="containerSeen" :key="index" v-for="(item, index) in partyDuesList" :class="{'show-detail': item.year+item.month==currentMonth, 'no-pay': item.status=='01', 'paid': item.status=='02'}" class="item pay-list" @click="openItem(item)">
        <div class="pay-base">
          <div class="title">{{item.year}}年{{item.month}}月党费信息</div>
          <div class="money">{{item.amt}}</div>
          <div>
            <!--<span class="state">未缴纳</span>-->
            <span v-if="item.status=='01'" class="state">未缴纳</span>
            <span v-else-if="item.status=='02'" class="state">已缴纳</span>
          </div>
        </div>
        <div class="pay-detail">
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
              <div class="clipboard-text">请缴至以上账户并填写备注信息：</div>
            </li>
            <li class="info-item remark">
              <!--<span class="clipboard-text">请缴至以上账户并填写备注信息：</span>-->
  
              <span class="clipboard-text">{{userInfo.id+'+'+userInfo.name+'+'+item.month+'月+'+item.amt+'元'}}</span>
              <span class="clipboard-button" :data-clipboard-text="userInfo.id+'+'+userInfo.name+'+'+item.month+'月+'+item.amt+'元'">复制</span>
            </li>
          </ul>
          <!--<div class="state">
              <div class="button" @click="confirmPay(item)">缴费确认</div>
              <div class="tips">在线支付功能正在开发中，敬请期待...</div>
            </div>-->
          <div v-if="item.status=='01'" class="state">
            <div class="button" @click="handleConfirm(item)">缴费确认</div>
            <div class="tips">在线支付功能正在开发中，敬请期待...</div>
          </div>
          <div v-else-if="item.status=='02'" class="state">
            <div class="text">{{item.month}}月党费缴纳成功</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { InlineLoading } from "vux";
import { queryURL, _tokenParams, _username } from "../../utils/index.js";
import clipboard from "clipboard";
import moment from "moment";
import {
  getOrgList,
  getPartyUserInfo,
  getPartyDuesList,
  confirmPay,
  getWXUserId,
  getYearMonth
} from "../../api/partyDues/index";
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
      year: moment().format("YYYY"),
      month: moment().format("M")
    };
  },
  methods: {
    showDetail: function(month) {
      this.currentMonth = month;
    },
    sessionStorageSet: function(key, value) {
      sessionStorage.setItem(key, JSON.stringify(value));
    },
    sessionStorageGet: function(key, isRemove) {
      let result = JSON.parse(sessionStorage.getItem(key));
      isRemove && sessionStorage.removeItem(key);
      return result;
    },
    getPartyDuesList: function(userId, status, time) {
      getPartyDuesList(userId, status)
        .then(res => {
          return res.data;
        })
        .then(data => {
          this.partyDuesList = data.splice(0, 3);
          if (time) {
            this.openItem(time);
          } else {
            let item = {
              year: this.partyDuesList[0].year,
              month: this.partyDuesList[0].month
            };
            this.openItem(item);
          }
        });
    },
    openItem(item) {
      this.currentMonth = item.year + item.month;
    },
    closeItem(item) {
      this.currentMonth = "close";
    },
    handleConfirm(item) {
      let self = this;
      this.$vux.confirm.show({
        // title: data.status,
        content: "确认" + item.month + "月党费已缴纳",
        onConfirm() {
          self.confirmPay(item);
        }
      });
    },
    confirmPay(item) {
      confirmPay(
        sessionStorage.getItem("userId"),
        item.month,
        item.year,
        this.userInfo.id +
          "+" +
          this.userInfo.name +
          "+" +
          item.month +
          "月+" +
          item.amt +
          "元"
      )
        .then(res => {
          return res.data;
        })
        .then(data => {
          if (data.code == "200") {
            // this.$vux.confirm.show({
            //   // title: data.status,
            //   content: "确认成功！"
            // })
            this.getPartyDuesList(sessionStorage.getItem("userId"), "03", item);
            //this.openItem(item)
          } else {
            this.$vux.alert.show({
              // title: data.status,
              //content: data.desc
              title: "确认失败！"
            });
          }
        });
    },
    getYearMonth() {
      getYearMonth()
        .then(res => {
          return res.data;
        })
        .then(data => {
          let arr = [];
          for (let key in data) {
            for (let i = 0; i < data[key].length; i++) {
              // arr.push({
              //   year:key,
              //   month:data[key][i]
              // });
              arr.push(key + "-" + data[key][i]);
            }
          }
          this.tabData = arr.sort();
          this.month = this.tabData[this.tabData.length - 1].split("-")[1];
          this.year = this.tabData[this.tabData.length - 1].split("-")[0];

          !this.sessionStorageGet("userInfo") &&
            getPartyUserInfo(sessionStorage.getItem("userId"))
              .then(res => {
                return res.data;
              })
              .then(data => {
                if (data) {
                  this.userInfo = data;
                  this.sessionStorageSet("userInfo", data);
                }
              });
          this.userInfo = this.sessionStorageGet("userInfo");
          let time = {
            year: this.year,
            month: this.month
          };
          this.getPartyDuesList(sessionStorage.getItem("userId"), "03", time);
        });
    },
    handleLogin: function() {
      const code = queryURL("code");
      if (code) {
        getWXUserId(code)
          .then(res => {
            return res.data;
          })
          .then(data => {
            if (data) {
              //debugger
              //设置code  页面刷新的时候使用
              sessionStorage.setItem("code", code);

              sessionStorage.setItem("userId", data.userId || "");
              !this.sessionStorageGet("userInfo") &&
                getPartyUserInfo(sessionStorage.getItem("userId"))
                  .then(res => {
                    return res.data;
                  })
                  .then(data => {
                    if (data) {
                      this.userInfo = data;
                      this.sessionStorageSet("userInfo", data);
                    }
                  });
              this.userInfo = this.sessionStorageGet("userInfo");
              this.getPartyDuesList(sessionStorage.getItem("userId"), "03");
              //this.getYearMonth()
              this.containerSeen = true;
            } else {
              this.containerSeen = false;
            }
            this.isloading = false;
          });
      }
    }
  },
  filters: {
    toDate: function(payDate) {
      return moment(payDate).format("YYYY.M.DD");
    }
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
  //   this.getPartyDuesList(sessionStorage.getItem('userId'), '01')
  // },
  mounted() {
    document.title = "缴费确认";
    // this.getYearMonth()
    let code = sessionStorage.getItem("code") || "";
    //alert('seesion|'+code)
    if (code) {
      this.isloading = false;
      this.containerSeen = true;
      !this.sessionStorageGet("userInfo") &&
        getPartyUserInfo(sessionStorage.getItem("userId"))
          .then(res => {
            return res.data;
          })
          .then(data => {
            if (data) {
              this.userInfo = data;
              this.sessionStorageSet("userInfo", data);
            }
          });
      this.userInfo = this.sessionStorageGet("userInfo");
      this.getPartyDuesList(sessionStorage.getItem("userId"), "03");
      //this.getYearMonth()
    } else {
      let code = queryURL("code");
      console.log(code);
      if (code != null && code.toString().length > 1) {
        this.handleLogin();
      } else {
        this.isloading = false;
        this.containerSeen = false;
      }
    }
    let cb = new clipboard(".clipboard-button");
    cb.on("success", () => {
      this.$vux.toast.text("复制成功");
    });
    cb.on("error", () => {
      this.$vux.toast.text("复制失败");
    });
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
    // this.getPartyDuesList(sessionStorage.getItem('userId'), '01')
  }
};
</script>
<style lang="scss" scoped>
@import "../../styles/variable.scss";
.remark {
  padding: 0 10px !important;
}
</style>