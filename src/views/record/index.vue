<template>
  <div class="ds-switch-theme">
    <el-row style="margin-bottom: 20px">
      <el-col :span="12">
        <h4> 当前时间: {{ currentDate }} </h4>
      </el-col>
      <el-col :span="12" :push="8">
        <el-button type="primary">增加用户</el-button>
        <el-button type="primary">删除用户</el-button>
      </el-col>
    </el-row>
    <table>
      <tr>
        <td v-for="date in theadList" :key="date" :class="judgeClass(date, currentDate)">{{
          date
        }}</td>
      </tr>
      <tr v-for="item in userList" :key="item.name">
        <td v-for="date in theadList" :key="date">
          <span v-if="date === '用户'">{{ item.name }}</span>
          <span v-else-if="date === '最长天数'">
            {{ findMaxDifference(item.rushDates) }}
          </span>
          <span v-else>
            <el-checkbox
              v-if="Number(date) <= 21"
              :model-value="judgeChecked(date, item.rushDates)"
            ></el-checkbox>
            <span v-else>-</span>
          </span>
        </td>
      </tr>
    </table>
  </div>
</template>
<script lang="ts">
  export default {
    name: 'DsSwitchTheme',
  }
</script>
<script setup lang="ts">
  import { useRecord } from './useRecord'
  import { ref } from 'vue'
  import type { UserItemType } from './types'
  import moment from 'moment'

  const { currentDate, dateList, judgeChecked, judgeClass, findMaxDifference } = useRecord()

  const theadList = [...['用户'], ...dateList, '最长天数']
  const userList = ref<UserItemType[]>([
    {
      name: '张三',
      rushDates: [],
    },
    {
      name: '李四',
      rushDates: ['01', '02', '21'],
    },
  ])
</script>

<style scoped lang="scss">
  .ds-switch-theme {
    padding: 20px;
    table {
      width: 100%;
      td {
        text-align: center;
        padding: 6px 0;
        border: 1px solid #ccc;
      }
      tr {
        &:nth-child(2n) {
          background-color: #eee;
        }
        &:hover {
          background-color: #e6f7ff;
        }
      }
    }
    .head-active {
      background-color: #5386ed;
      color: white;
    }
  }
</style>
