<template>
  <div class="page">
    <div class="calendar">
      <div class="head-nav">
        <div v-for="e in week_day" :key="e.index" class="item">{{ e.name }}</div>
      </div>
      <div class="calendar-cont">
        <div v-for="e, index in timeMsg.monthMsg" :key="index" class="item" :class="{ out: e.out }">{{ e.num }}</div>
      </div>
    </div>
  </div>
  <!-- <router-view v-if="isRouterAlive" /> -->
</template>

<script setup>
import getDays from "@/util/index.js"
import { nextTick, provide, ref, reactive, getCurrentInstance } from 'vue'
import { useRouter, useRoute } from 'vue-router'


// const router = useRouter()
// const route = useRoute()
// let isRouterAlive = ref(true)
// let reload = () => {
//   isRouterAlive.value = false;
//   nextTick(() => {
//     isRouterAlive.value = true
//   })
// }
// const go = () => {
//   let r = route
//   console.log(r)
//   router.push({
//     name: '404'
//   })
// }
// provide('reload', reload)

const week_day = reactive([
  {
    index: 1,
    name: '星期一'
  },
  {
    index: 2,
    name: '星期二'
  },
  {
    index: 3,
    name: '星期三'
  },
  {
    index: 4,
    name: '星期四'
  },
  {
    index: 5,
    name: '星期五'
  },
  {
    index: 6,
    name: '星期六'
  },
  {
    index: 7,
    name: '星期日'
  },
])
const DAYS = new Date()
console.log(DAYS)
const { proxy } = getCurrentInstance()
const timeMsg = reactive({
  year: proxy.$dayjs().year(),
  month: proxy.$dayjs().month() + 1,
  monthOnceWeek: proxy.$dayjs().startOf('month').day(),
  monthMsg: []
})
timeMsg.nowMonthDays = getDays(timeMsg.month, timeMsg.year)
timeMsg.nowMonthDaysLast = getDays(timeMsg.month == 1 ? 12 : timeMsg.month - 1, timeMsg.year)
timeMsg.nowMonthDaysNext = getDays(timeMsg.month == 12 ? 1 : timeMsg.month + 1, timeMsg.year)

console.log(timeMsg.nowMonthDaysLast);
for (let i = 1; i <= 43; i++) {
  if (i < timeMsg.monthOnceWeek) {
    timeMsg.monthMsg.push({
      num: timeMsg.nowMonthDaysLast - timeMsg.monthOnceWeek + i + 1,
      out: true
    })
  }
  if (i > timeMsg.monthOnceWeek && i <= timeMsg.nowMonthDays + timeMsg.monthOnceWeek) {
    timeMsg.monthMsg.push({
      num: i - timeMsg.monthOnceWeek,
      out: false
    })
  }
  if (i > timeMsg.nowMonthDays + timeMsg.monthOnceWeek) {
    timeMsg.monthMsg.push({
      num: timeMsg.monthOnceWeek - 43 + i + 1,
      out: true
    })
  }
}
console.log(timeMsg.monthMsg)
</script>

<style lang="less" scoped>
.page {
  position: relative;
  padding: 10px;

  .calendar {
    width: 100%;

    .head-nav {
      width: 100%;
      display: flex;

      .item {
        width: calc(100% / 7);
        text-align: center;
        line-height: 40px;
      }
    }
  }

  .calendar-cont {
    width: 100%;
    display: flex;
    flex-wrap: wrap;

    .item {
      width: calc(100% / 7);
      text-align: center;
      line-height: 40px;

      &.out {
        opacity: .3;
      }
    }
  }
}
</style>
