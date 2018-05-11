import Vue from 'vue'
import Router from 'vue-router'

// 党费缴纳
import duesIndex from '@/views/duesPay/duesIndex' // 缴费确认
import duesHistory from '@/views/duesPay/duesHistory' // 历史缴费
import duesInfo from '@/views/duesPay/duesInfo'  // 党费缴纳信息
import duesOrg from '@/views/duesPay/duesOrg'  // 党费缴纳信息

import partyIndex from '@/views/partyBuilding/index'
Vue.use(Router)

export default new Router({
	mode: 'hash',
  routes: [
    {
      path: '/PD/duesPay/duesIndex',
      name: 'duesIndex',
      component: duesIndex,
      meta: {
        title: '缴费确认'
      }
    },
    {
      path: '/PD/duesPay/duesIndex/:month',
      name: 'duesIndexMonth',
      component: duesIndex,
      meta: {
        title: '缴费确认'
      }
    },
    {
      path: '/PD/duesPay/duesHistory',
      name: 'duesHistory',
      component: duesHistory,
      meta: {
        title: '历史缴费'
      }
    },
    {
      path: '/PD/PD/duesPay/duesHistory/:month',
      name: 'duesHistoryMonth',
      component: duesHistory,
      meta: {
        title: '历史缴费'
      }
    },
    {
      path: '/PD/duesPay/duesInfo',
      name: 'duesInfo',
      component: duesInfo,
      meta: {
        title: '党费缴纳信息'
      }
    },
    {
      path: '/partyBuilding/index',
      name: 'partyIndex',
      component: partyIndex,
      meta: {
        title: '党建活动'
      }
    },
    {path: '/', 
    name: 'partyIndex',
    component: partyIndex}
  ]
})
