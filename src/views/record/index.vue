<script setup lang="ts">
  import { useRecord } from './useRecord'
  import { ref } from 'vue'
  import UserDialog from '@/views/record/components/userDialog.vue'
  import myMitt from '@/tools/mitt'

  const {
    variables,
    currentDate,
    currentCheckMonth,
    dateList,
    loadRecords,
    handleDelUser,
    judgeClass,
    findMaxDifference,
    handleItemCheckChange,
  } = useRecord()

  const theadList = [...['用户'], ...dateList, '持久力', '总计']

  const userStore = useUserStore()

  // ? 新增用户
  const userDialogRef = ref<InstanceType<typeof UserDialog>>()
  // ? 响应事件
  const handleCreate = () => {
    userDialogRef!.value!.openDialog()
  }
  const handleRefresh = () => {
    loadRecords()
  }
  const handleCheckChange = () => {}
  myMitt.on('changeMonth', () => {
    loadRecords()
  })
</script>

<template>
  <div class="p-record">
    <el-row style="margin-bottom: 20px">
      <el-col :span="12" style="display: flex">
        <h4>
          今天: <span style="color: #5386ed">{{ currentDate }} </span></h4
        >
        <h4 style="margin-left: 10px">
          当前位置:
          <span style="color: #5386ed"
            >{{ userStore.currentYear + '-' + userStore.currentMonth }}
          </span></h4
        >
      </el-col>
      <el-col :span="12" :push="8">
        <el-button type="primary" @click="handleCreate">增加用户</el-button>
        <!--        <el-button type="primary">删除用户</el-button>-->
      </el-col>
    </el-row>

    <div v-loading="variables.loading" class="table">
      <!--?表头-->
      <ul>
        <li v-for="date in theadList" :key="date" :class="judgeClass(date, currentDate)">{{
          date
        }}</li>
      </ul>
      <!--?用户列表-->
      <ul v-for="item in variables.userList" :key="item.name">
        <el-checkbox-group
          v-model="item.rushDates"
          class="checkbox-row"
          @change="handleCheckChange"
        >
          <li v-for="date in theadList" :key="date">
            <span v-if="date === '用户'" class="display-span" style="width: 70px">
              <el-link type="primary" class="el-link-user" @click="handleDelUser(item.userId)">{{
                item.name
              }}</el-link>
            </span>
            <span v-else-if="date === '持久力'" class="display-span">
              {{ findMaxDifference(item.rushDates) }}
            </span>
            <span v-else-if="date === '总计'" class="display-span">
              {{ item.records.filter((i) => i.id).length }}
            </span>
            <span v-else>
              <el-checkbox
                :label="`${currentCheckMonth}-${date}`"
                :disabled="Number(date) > Number(currentDate.split('-')[2])"
                @change="handleItemCheckChange($event, item.userId, item.records, date)"
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
        flex-shrink: 0;
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
        li:first-child {
          flex: 2;
          @include vertical-center;
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
    .el-link-user {
      color: #5386ed;
      font-size: 16px;
    }
  }
</style>
