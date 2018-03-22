<template>
  <div>
    <div class="month-selector"></div>
    <div class="item">
      <div class="card-header">技术公司党员总支党员缴费情况</div>
      <div class="card-content">
        <div><span>3</span><br>支部总数</div>
        <div class="border-r red"><span>1</span><br>未缴完数</div>
        <div><span>10</span><br>党员总数</div>
        <div class="red"><span>9</span><br>未缴纳</div>
      </div>
      <div class="card-footer"></div>
    </div>
    <div class="item">
      <div class="card-header">技术开发总部支部</div>
      <div class="card-content">
        <div><span>100</span><br>党员总数</div>
        <div><span>10</span><br>已缴纳</div>
        <div class="red"><span>90</span><br>未缴纳</div>
      </div>
      <div class="card-footer">联系组织委员<a class="tel" href="tel:11111111111">孙荔丽</a></div>
    </div>
  </div>
</template>
<script>
import { queryURL, _tokenParams, _username } from '../../utils/index.js'
export default {
  data() {
    return {}
  },
}
</script>
<style lang="scss" scoped>
</style>
