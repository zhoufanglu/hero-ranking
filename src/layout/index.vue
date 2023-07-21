<template>
  <div class="p-layout">
    <div class="nav-bar">
      <nav-bar></nav-bar>
    </div>
    <section>
      <div class="side-bar">
        <el-tabs tab-position="left" style="height: 100vh" :model-value="curWeekIndex">
          <el-tab-pane
            v-for="(week, index) in weekList"
            :key="index"
            :name="index + 1"
            :label="getLabel(week)"
          ></el-tab-pane>
        </el-tabs>
      </div>
      <div class="content">
        <router-view v-slot="{ Component, route }">
          <transition name="el-fade-in" mode="out-in">
            <component :is="Component" :key="route.fullPath" />
          </transition>
        </router-view>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
  import NavBar from '@/layout/NavBar.vue'
  import moment from 'moment'
  /** ****************** **获取时间断作为list***********************/

  function generateWeekList() {
    const currentMonth = moment().month() // 获取当前月份（注意：月份是从0开始计数的，0表示1月，1表示2月，以此类推）
    const currentYear = moment().year() // 获取当前年份
    const firstDayOfMonth = moment().month(currentMonth).date(1) // 获取当前月份的第一天
    const firstMonday = moment(firstDayOfMonth).startOf('isoWeek') // 获取当前月份的第一个星期一

    // 定义一个空数组，用于存储四个星期的对象
    const weekList = []

    // 生成四个星期的对象，分别包含星期一和星期日的日期
    for (let i = 0; i < 5; i++) {
      const startOfWeek = moment(firstMonday).add(i * 7, 'days') // 当前星期一的日期
      const endOfWeek = moment(startOfWeek).endOf('isoWeek') // 当前星期日的日期

      // 将当前星期一和星期日的日期以对象的形式添加到数组中
      weekList.push({
        星期一: startOfWeek.format('YYYY-MM-DD'),
        星期日: endOfWeek.format('YYYY-MM-DD'),
      })
    }

    return weekList
  }

  // 生成当前月的四个星期列表
  const weekList = generateWeekList()

  function getWeekNumberForToday(weekList: any) {
    const today = moment() // 获取今天的日期

    // 遍历 weekList，判断今天的日期是否在每个星期的日期范围内
    for (let i = 0; i < weekList.length; i++) {
      const week = weekList[i]
      const startOfWeek = moment(week['星期一']) // 当前星期一的日期
      const endOfWeek = moment(week['星期日']) // 当前星期日的日期

      // 判断今天的日期是否在当前星期的日期范围内
      if (today.isBetween(startOfWeek, endOfWeek, null, '[]')) {
        // 如果在范围内，则返回该星期的索引（即第几个 weekList）
        return i + 1
      }
    }

    // 如果不在任何一个星期的日期范围内，则返回 0 表示不在当前月的任何一周内
    return 0
  }

  const curWeekIndex = getWeekNumberForToday(weekList)

  const getLabel = (week: any) => {
    return `${week['星期一'].substring(5, 10)} ~ ${week['星期日'].substring(5, 10)}`
  }
</script>

<style scoped lang="scss">
  .p-layout {
    height: 100vh;
    width: 100vw;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    .nav-bar {
      height: var(--nav-bar-height);
      width: 100%;
      background-color: #eeeeee;
    }
    section {
      height: calc(100vh - var(--nav-bar-height));
      width: 100%;

      display: flex;
      flex-direction: row;
      .content {
        overflow: hidden;
        padding: 0;
        width: 100%;
      }
    }
  }
</style>
