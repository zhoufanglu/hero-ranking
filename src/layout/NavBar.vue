<script setup lang="ts">
  import moment from 'moment'
  // 获取当前日期时间
  const currentDateTime = moment()

  // 获取当前年份
  const currentYear = currentDateTime.year()
</script>

<template>
  <div class="nav-bar">
    <div class="left-nav"> hand rush record ( {{ currentYear }}) </div>
    <div class="right-nav">
      <div class="user">
        <i class="iconfont user-icon">&#xe603;</i>
        <div>vue-element-admin</div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
  .nav-bar {
    display: flex;
    width: 100%;
    height: var(--nav-bar-height);

    .left-nav {
      height: 100%;
      display: flex;
      align-items: center;
      background: #212834;
      flex: 1 1 100%;
      color: white;
      font-size: 20px;
      padding-left: 20px;
      box-sizing: border-box;

      .logo {
        width: 68px;
        height: 100%;
        background: #212834;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      span {
        margin-left: 20px;
        color: #fff;
        font-size: 16px;
      }
    }

    .right-nav {
      height: 100%;
      flex: 0 0 326px;
      padding-right: 24px;
      box-sizing: border-box;
      background: url('@/assets/imgs/top_bar.png') no-repeat;
      display: flex;
      align-items: center;
      justify-content: flex-end;

      .user {
        height: 48px;
        display: flex;
        align-items: center;
        color: #fefefe;
        font-size: 14px;
        font-weight: 400;
        margin-right: 24px;

        .user-icon {
          margin-right: 5px;
          font-size: 16px;
        }
      }

      .user-operate {
        display: flex;
        align-items: center;
        gap: 24px;
      }
    }
  }

  .point {
    cursor: pointer;
  }

  .font {
    color: #fefefe;
    font-size: 16px;
  }

  .infinite-list {
    height: 150px;
    padding: 0;
    margin: 0;
    list-style: none;
    overflow: auto;

    li {
      font-size: 16px;
      padding: 2px 0;
      cursor: pointer;

      &:hover {
        background: #f5f5f5;
        color: var(--theme-color);
      }
    }
  }
</style>
