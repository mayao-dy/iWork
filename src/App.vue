<template>
  <div id="app">
      <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      draftsLength: 0,
      searchValue: ''
      //loginToken: this.loginTokenInit(),
    }
  },
  methods: {
    loginTokenInit: function() {
      if (!localStorage.getItem('token')) {
        this.$router.push('/')
      }
    },
    getResult() {
      console.log(this.searchValue)
    }
  }
}
</script>
<style lang="scss">
@import './styles/variable.scss';
//弹框修改
.weui-dialog__btn_primary{
  color: $color-primary !important;
}
.weui-dialog__bd{
  color: $color-gray-9;
  font-size: 18px !important;
}
.weui-dialog__title{
  color: $color-money;
  font-size:$font-largest;
}
.item {
  display: flex;
  // flex: 1 1 auto;
  flex-direction: column;
  background-color: $color-gray-1;
  padding: 14px;
  &:not(:last-child) {
    margin-bottom: 10px;
  }
}
.pay-list {
  font-size: $font-smaller;
}
.pay-base {
  margin-top: 6px;
  height: 36px;
  font-size: $font-large;
  display: flex;
  justify-content: space-between;
  .title {
    width: 50%;
    white-space: nowrap;
    color: $color-gray-9;
  }
  .money {
    width: 20%;
    color: $color-money;
    &:before {
      content: '¥';
    }
  }
  .state {
    // width: 30%;
    padding: 0 10px;
    border-radius: 10px;
  }
  .confirm{
    width:28%;
    text-align:center
  }
  .payDate{
    display:block;
    font-size:$font-smallest;
  }
}
.pay-detail {
  display: none;
  .title {
    text-align: center;
  }
  .money {
    text-align: center;
    font-size: 36px;
    &:before {
      content: '¥';
    }
  }
  .info {
    .info-item {
      display: flex;
      justify-content: space-between;
      padding: 10px;
      span:first-child {
        white-space: nowrap;
        margin-right: 10px;
      }
      &:not(:last-child) {
        border-bottom: 1px solid $color-gray-3;
      }
      .clipboard-text {
        color: $color-gray-6;
      }
      .clipboard-button {
        color: $color-primary;
      }
    }
  }
  .state {
    padding: 10px 0;
    text-align: center;
  }
}
// 展开状态
.show-detail {
  .pay-base {
    display: none;
  }
  .pay-detail {
    display: block;
  }
}
// 未缴纳状态
.no-pay {
  .pay-base {
    .state {
      border: 1px solid $color-danger;
      color: $color-danger;
    }
  }
  .pay-detail {
    .state {
      .button {
        width: 90%;
        margin: 0 auto;
        padding: 10px 0;
        background-color: $color-primary;
        color: $color-gray-1;
        border-radius: 5px;
      }
      .tips {
        font-size: $font-smallest;
        color: $color-gray-6;
        margin-top:10px;
      }
    }
  }
}
// 已缴纳状态
.paid {
  .pay-base {
    .state {
      // border: 1px solid $color-primary;
      border: none;
      color: $color-primary;
    }
  }
  .pay-detail {
    .state {
      .text {
        font-size: $font-larger;
        color: $color-gray-6;
      }
      .button-default {
        width: 90%;
        margin: 0 auto;
        padding: 10px 0;
        background-color: $color-gray-5;
        color: $color-gray-1;
        border-radius: 5px;
      }
    }
  }
}

.card-header {
  font-weight: bold;
}
.card-content {
  display: flex;
  flex-wrap: wrap;
  font-size: $font-smaller;
  text-align: center;
  padding: 10px 0;
  align-items: center;
  .title {
    width: 100%;
    text-align: left;
    font-weight: bold;
    border-top: 1px solid $color-gray-4;
    line-height: 2;
    color: $color-gray-7;
  }
  > div {
    flex: 1 1 auto;
    font-size: $font-smaller;
    color: $color-gray-6;
    &.red {
      color: $color-danger;
      span {
        color: $color-danger;
      }
    }
    span {
      font-size: $font-larger;
      color: $color-gray-7;
    }
  }
}
.card-footer {
  text-align: right;
  font-size: $font-smallest;
  color: $color-gray-6;
  .tel {
    margin-left: 10px;
    color: $color-primary;
  }
}
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: $color-gray-9;
  background-color: $color-gray-4;
  height: 100%;
}
.border-r {
  border-right: 1px solid $color-gray-4;
}
</style>
