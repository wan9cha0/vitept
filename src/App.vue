<template>
  <div class="page">
    <div class="calendar">
      <div class="title">
        <div class="item">{{ timeMsg.yearNum }}</div>
        <div class="item">{{ timeMsg.monthNum }}</div>
      </div>
      <div class="head-nav">
        <div v-for="e in week_day" :key="e.index" class="item">{{ e.name }}</div>
      </div>
      <div class="calendar-cont">
        <div v-for="e, index in timeMsg.monthMsg" :key="index" class="item"
          :class="[{ out: e.out }, { nowDay: e.nowDay }]">
          {{ e.num }}</div>
      </div>
      <div class="set-box">
        <div class="btn l" @click="chenge('last')"></div>
        <div class="btn n" @click="chenge('next')"></div>
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
    name: '一'
  },
  {
    index: 2,
    name: '二'
  },
  {
    index: 3,
    name: '三'
  },
  {
    index: 4,
    name: '四'
  },
  {
    index: 5,
    name: '五'
  },
  {
    index: 6,
    name: '六'
  },
  {
    index: 7,
    name: '日'
  },
])
const { proxy } = getCurrentInstance()
const timeMsg = reactive({
  dateNum: proxy.$dayjs().date(),
  yearNum: proxy.$dayjs().year(),
  monthNum: proxy.$dayjs().month() + 1,
  monthOnceWeek: proxy.$dayjs().startOf('month').day() == 0 ? 7 : proxy.$dayjs().startOf('month').day(),
  monthMsg: []
})
const createCalendar = () => {
  timeMsg.nowMonthDays = getDays(timeMsg.monthNum, timeMsg.yearNum)
  timeMsg.nowMonthDaysLast = getDays(timeMsg.monthNum == 1 ? 12 : timeMsg.monthNum - 1, timeMsg.yearNum)
  timeMsg.monthMsg = []
  console.log(timeMsg.monthOnceWeek);
  for (let i = 1; i <= 43; i++) {
    if (i < timeMsg.monthOnceWeek) {
      timeMsg.monthMsg.push({
        num: timeMsg.nowMonthDaysLast - timeMsg.monthOnceWeek + i + 1,
        out: true,

      })
    }
    if (i > timeMsg.monthOnceWeek && i <= timeMsg.nowMonthDays + timeMsg.monthOnceWeek) {
      timeMsg.monthMsg.push({
        num: i - timeMsg.monthOnceWeek,
        nowDay: timeMsg.dateNum && timeMsg.dateNum == i - timeMsg.monthOnceWeek
      })
    }
    if (i > timeMsg.nowMonthDays + timeMsg.monthOnceWeek) {
      timeMsg.monthMsg.push({
        num: i - timeMsg.nowMonthDays - timeMsg.monthOnceWeek,
        out: true
      })
    }
  }
}

createCalendar()
const chenge = (type) => {

  let dateNum = proxy.$dayjs().date()
  let nowMonth = proxy.$dayjs().month() + 1
  let yearNum = proxy.$dayjs().year()
  if (type == 'last') {
    if (timeMsg.monthNum == 1) {
      timeMsg.monthNum = 12
      --timeMsg.yearNum
    } else {
      --timeMsg.monthNum
    }
  }

  if (type == 'next') {
    if (timeMsg.monthNum == 12) {
      timeMsg.monthNum = 1
      ++timeMsg.yearNum
    } else {
      ++timeMsg.monthNum
    }
  }

  timeMsg.monthOnceWeek = proxy.$dayjs(`${timeMsg.yearNum}-${timeMsg.monthNum}`).startOf('month').day() == 0 ? 7 : proxy.$dayjs(`${timeMsg.yearNum}-${timeMsg.monthNum}`).startOf('month').day()
  timeMsg.dateNum = timeMsg.monthNum == nowMonth && timeMsg.yearNum == yearNum ? dateNum : null

  createCalendar()

}
</script>

<style lang="less" scoped>
.page {
  position: relative;
  padding: 10px;

  .calendar {
    width: 100%;

    .title {
      width: 100%;
      display: flex;
      justify-content: center;
      padding-bottom: 10px;
      font-size: 20px;
      .item {
        margin: 0 20px;
      }
    }

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

      &.nowDay {
        color: red;
      }
    }
  }

  .set-box {
    width: 100%;
    display: flex;
    padding-top: 10px;
    justify-content: flex-end;

    .btn {
      width: 50px;
      height: 30px;
      border-radius: 4px;
      border: 1px solid #eee;
      margin-left: 10px;
      position: relative;

      &.l:before {
        content: '';
        position: absolute;
        width: 10px;
        height: 10px;
        border-top: 3px solid #eee;
        border-left: 3px solid #eee;
        left: 50%;
        top: 50%;
        border-radius: 3px;
        transform: rotate(45deg) translate(-45%, 10%);
      }

      &.n:before {
        content: '';
        position: absolute;
        width: 10px;
        height: 10px;
        border-bottom: 3px solid #eee;
        border-right: 3px solid #eee;
        left: 50%;
        top: 50%;
        border-radius: 3px;
        transform: rotate(45deg) translate(-75%, -20%);
      }
    }
  }
}

@media (prefers-color-scheme: light) {
  .page .set-box .btn {
    border: 1px solid #213547;

    &.l:before {
      border-top: 3px solid #213547;
      border-left: 3px solid #213547;
    }

    &.n:before {
      border-bottom: 3px solid #213547;
      border-right: 3px solid #213547;
    }
  }


}
</style>
