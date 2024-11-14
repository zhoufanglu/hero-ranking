import { logout as logoutApi } from '@/service/api/modules/users'
import { defineStore } from 'pinia'
import { UserType } from '@/store/users/type'
const useUserStore = defineStore({
  id: 'userInfo',
  state: () => ({
    userInfo: { id: '', name: '', qq: '', isAdmin: 0 } as UserType,
    isRemember: false,
    currentYear: '',
    currentMonth: '',
  }),
  actions: {
    setUserInfo(userInfo: UserType | {}) {
      this.userInfo = userInfo
    },
    setCurrentYear(year: string) {
      this.currentYear = year
    },
    setCurrentMonth(month: string) {
      this.currentMonth = month
    },
    async logout() {
      // 清除缓token
      this.setUserInfo({ id: '', name: '', qq: '', isAdmin: 0 })
      // await logoutApi({})
      // router.push('/login')
    },
  },
  persist: true, // 数据持久化存储
})

export { useUserStore }
