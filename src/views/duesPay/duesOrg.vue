<template>
  <div>
    <van-tabs class="month-tabs" :swipe-threshold="5" sticky>
      <van-tab :key="index" v-for="index in 12" :title="index + '月'">
        <template slot="title">
          <div class="year">2018年</div>
          <div class="month">{{index}}月</div>
        </template>
        <div class="item">
          <div class="card-header">全所党费缴纳情况</div>
          <div class="card-content">
            <div>
              <span>24</span><br>党支部总数</div>
            <div class="border-r red">
              <span>10</span><br>未缴完数</div>
            <div>
              <span>10</span><br>党员总数</div>
            <div class="red">
              <span>9</span><br>未缴纳</div>
          </div>
          <div class="card-footer"></div>
        </div>
        <div class="item">
          <div class="card-header">国际发展部·基建工作小组·自贸区交易平台筹备工作小组联合党支部</div>
          <div class="card-content">
            <div>
              <span>100</span><br>党员总数</div>
            <div>
              <span>10</span><br>已缴纳</div>
            <div class="red">
              <span>90</span><br>未缴纳</div>
          </div>
          <div class="card-footer">联系组织委员
            <a class="tel" href="tel:11111111111">孙荔丽</a>
          </div>
        </div>
        <div class="item">
          <div class="card-header">技术公司党总支</div>
          <div class="card-content">
            <div class="title">技术开发总部支部</div>
            <div>
              <span>100</span><br>党员总数</div>
            <div>
              <span>10</span><br>已缴纳</div>
            <div class="red">
              <span>90</span><br>未缴纳</div>
          </div>
          <div class="card-footer">联系组织委员
            <a class="tel" href="tel:11111111111">孙荔丽</a>
          </div>
          <div class="card-content">
            <div class="title">规划·综合·金桥·总工办联合支部</div>
            <div>
              <span>100</span><br>党员总数</div>
            <div>
              <span>10</span><br>已缴纳</div>
            <div class="red">
              <span>90</span><br>未缴纳</div>
          </div>
          <div class="card-footer">联系组织委员
            <a class="tel" href="tel:11111111111">孙荔丽</a>
          </div>
        </div>
      </van-tab>
    </van-tabs>

  </div>
</template>
<script>
import { queryURL, _tokenParams, _username } from '../../utils/index.js'
import { Tab, Tabs } from 'vant'
export default {
  data() {
    return {}
  },
  components: {
    Tab,
    Tabs
  }
}
</script>
<style lang="scss" scoped>
.month-tabs {
  padding-top: 88px;
  /deep/ .van-tabs__wrap {
     height: 88px;
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
