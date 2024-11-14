<script setup lang="ts">
  import moment from 'moment'
  // 获取当前日期时间
  const currentDateTime = moment()
  const userStore = useUserStore()
  // 获取当前年份
  const currentYear = currentDateTime.year()
  userStore.setCurrentYear(String(currentYear))

  const openGithub = () => {
    window.open('https://github.com/zhoufanglu/hero-ranking', '_blank')
  }
</script>

<template>
  <div class="nav-bar">
    <div class="left-logo" />
    <div class="left-nav"> hand rush record ( {{ currentYear }}) </div>
    <div class="right-nav">
      <div class="user">
        <i class="iconfont user-icon">&#xe603;</i>
        <div>vue-element-admin</div>
        <svg
          style="margin-left: 20px; cursor: pointer"
          t="1731483708612"
          class="icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="2736"
          width="32"
          height="32"
          @click="openGithub"
        >
          <path
            d="M512 12.63616c-282.74688 0-512 229.21216-512 512 0 226.22208 146.69824 418.14016 350.12608 485.82656 25.57952 4.73088 35.00032-11.10016 35.00032-24.63744 0-12.20608-0.47104-52.55168-0.69632-95.31392-142.4384 30.96576-172.50304-60.416-172.50304-60.416-23.28576-59.16672-56.85248-74.91584-56.85248-74.91584-46.44864-31.78496 3.50208-31.1296 3.50208-31.1296 51.4048 3.60448 78.47936 52.75648 78.47936 52.75648 45.6704 78.27456 119.76704 55.64416 149.01248 42.55744 4.58752-33.09568 17.85856-55.68512 32.50176-68.46464-113.72544-12.94336-233.2672-56.85248-233.2672-253.0304 0-55.88992 20.00896-101.5808 52.75648-137.4208-5.3248-12.9024-22.85568-64.96256 4.95616-135.49568 0 0 43.008-13.74208 140.84096 52.49024 40.83712-11.34592 84.64384-17.03936 128.16384-17.24416 43.49952 0.2048 87.32672 5.87776 128.24576 17.24416 97.73056-66.2528 140.65664-52.49024 140.65664-52.49024 27.87328 70.53312 10.3424 122.59328 5.03808 135.49568 32.82944 35.86048 52.69504 81.53088 52.69504 137.4208 0 196.64896-119.78752 239.94368-233.79968 252.6208 18.37056 15.89248 34.73408 47.04256 34.73408 94.80192 0 68.5056-0.59392 123.63776-0.59392 140.51328 0 13.6192 9.216 29.5936 35.16416 24.576 203.32544-67.76832 349.83936-259.62496 349.83936-485.76512 0-282.78784-229.23264-512-512-512z"
            fill="#ffffff"
            p-id="2737"
          ></path>
        </svg>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
  .nav-bar {
    display: flex;
    width: 100%;
    background-color: black !important;
    height: var(--nav-bar-height);

    .left-logo {
      background-color: black !important; /* 背景色为黑色 */
      width: 100px;
      height: 40px;
      margin-top: 3px;
      background: url('@/assets/imgs/logo.png') no-repeat center center;
      background-size: contain;
      outline: none;
      border: none;
    }

    .left-nav {
      height: 100%;
      display: flex;
      align-items: center;
      background: linear-gradient(to right, black, #212834);
      flex: 1 1 100%;
      color: white;
      font-size: 20px;
      padding-left: 20px;
      box-sizing: border-box;

      .logo {
        width: 68px;
        height: 100%;
        background: black;
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
