<script setup lang="ts">
  import NavBar from '@/layout/NavBar.vue'
  import moment from 'moment'
  import myMitt from '@/tools/mitt'
  /** ****************** **月份***********************/
  const monthList = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12']
  const curMonth = monthList[moment().month()]

  const handleTabChange = (name: string) => {
    myMitt.emit('changeMonth', name)
  }
  const userStore = useUserStore()
  userStore.setCurrentMonth(curMonth)
</script>

<template>
  <div class="p-layout">
    <div class="nav-bar">
      <nav-bar></nav-bar>
    </div>
    <section>
      <div class="side-bar">
        <el-tabs
          v-model="userStore.currentMonth"
          tab-position="left"
          style="height: 100vh"
          @tab-change="handleTabChange"
        >
          <el-tab-pane
            v-for="(mon, index) in monthList"
            :key="index"
            :name="mon"
            :label="`${mon} 月`"
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
