<template>
  <div class="p-layout">
    <div class="nav-bar">
      <nav-bar></nav-bar>
    </div>
    <section>
      <div class="side-bar">
        <el-tabs tab-position="left" style="height: 100vh" :model-value="curMonth">
          <el-tab-pane
            v-for="(mon, index) in monthList"
            :key="index"
            :name="index + 1"
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

<script setup lang="ts">
  import NavBar from '@/layout/NavBar.vue'
  import moment from 'moment'
  /** ****************** **月份***********************/
  const monthList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
  const curMonth = monthList[moment().month()]
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
