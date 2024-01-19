<script setup lang="ts">
  import { useRecord } from './useRecord'
  import { ref } from 'vue'
  import type { UserItemType } from './types'
  import UserDialog from '@/views/record/components/userDialog.vue'

  const { currentDate, dateList, getDataByJson, judgeClass, findMaxDifference } = useRecord()

  const theadList = [...['用户'], ...dateList, '持久力']
  const userList = ref<UserItemType[]>([])
  const handleCheckChange = () => {
    // console.log(71, userList.value)
  }

  getDataByJson().then(({ data }) => {
    console.log(75, data.data)
    userList.value = data.data
  })

  // ? 新增用户
  const userDialogRef = ref<InstanceType<typeof UserDialog>>()

  const handleCreate = () => {
    userDialogRef!.value!.openDialog()
  }

  const handleRefresh = () => {}
</script>

<template>
  <div class="p-record">
    <el-row style="margin-bottom: 20px">
      <el-col :span="12">
        <h4> 当前时间: {{ currentDate }} </h4>
      </el-col>
      <el-col :span="12" :push="8">
        <el-button type="primary" @click="handleCreate">增加用户</el-button>
        <el-button type="primary">删除用户</el-button>
      </el-col>
    </el-row>
    {{ userList }}

    <div class="table">
      <!--?表头-->
      <ul>
        <li v-for="date in theadList" :key="date" :class="judgeClass(date, currentDate)">{{
          date
        }}</li>
      </ul>
      <!--?用户列表-->
      <ul v-for="item in userList" :key="item.name">
        <el-checkbox-group
          v-model="item.rushDates"
          class="checkbox-row"
          @change="handleCheckChange"
        >
          <li v-for="date in theadList" :key="date">
            <span v-if="date === '用户'" class="display-span">
              {{ item.name }}
            </span>
            <span v-else-if="date === '持久力'" class="display-span">
              {{ findMaxDifference(item.rushDates) }}
            </span>
            <span v-else>
              <el-checkbox
                :label="date"
                :disabled="Number(date) > Number(currentDate.split('-')[2])"
              />
            </span>
          </li>
        </el-checkbox-group>
      </ul>
    </div>
    <user-dialog ref="userDialogRef" @refresh-user-list="handleRefresh"></user-dialog>
  </div>
</template>

<style scoped lang="scss">
  .p-record {
    padding: 20px;
    .table {
      width: 100%;
      ul {
        display: flex;
        align-items: center;
        li {
          text-align: center;
          padding: 6px 0;
          height: 100%;
          flex: 1;
          border: solid 1px #eeeeee;
          .display-span {
            display: block;
            width: 100%;
            font-size: 16px;
            height: 32px;
            line-height: 32px;
          }
        }
        &:nth-child(2n) {
          background-color: #f6f6f6;
        }
        &:hover {
          background-color: #e6f7ff;
        }
      }
      .checkbox-row {
        @extend ul;
        width: 100%;
      }
    }
    .head-active {
      background-color: #5386ed;
      color: white;
    }
  }
</style>
<style>
  .p-record {
    .el-checkbox__label {
      display: none;
    }
  }
</style>
