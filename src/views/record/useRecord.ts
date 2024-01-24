import moment from 'moment'
import confirmDialog from '@/tools/confirmDialog'
import { delRecord, insertRecord, getRecordsByMonth, delUser } from '@/service/api/modules/users'
import type { UserItemType, RecordItemType } from '@/views/record/types'

const useRecord = () => {
  // 绑定变量
  const variables = reactive<{
    userList: UserItemType[]
    loading: boolean
  }>({
    userList: [],
    loading: false,
  })

  const userStore = useUserStore()

  const currentDate = moment().format('YYYY-MM-DD')
  const curDayOnlyDay = currentDate.substring(currentDate.length - 2)
  // 当前选择的日期 YYYY-MM
  const currentCheckMonth = computed(() => userStore.currentYear + '-' + userStore.currentMonth)
  function generateDateList() {
    const currentMonth = moment().month() // 获取当前月份（注意：月份是从0开始计数的，0表示1月，1表示2月，以此类推）
    const currentYear = moment().year() // 获取当前年份
    const daysInMonth = moment().month(currentMonth).daysInMonth() // 获取当前月份的总天数

    // 定义一个空数组，用于存储当前月份的所有天的日期
    const dateList = []

    // 生成当前月份的所有天的日期
    for (let day = 1; day <= daysInMonth; day++) {
      const date = moment(`${currentYear}-${currentMonth + 1}-${day}`, 'YYYY-M-D') // 构建日期
      dateList.push(date.format('DD')) // 将日期格式化成字符串，并添加到数组中
      // dateList.push(date.format('MM-DD')) // 将日期格式化成字符串，并添加到数组中
    }

    return dateList
  }

  // 生成当前月份的所有天的日期列表
  const dateList: string[] = generateDateList()

  const judgeChecked = (curDate: string, rushDates: any[]) => {
    return rushDates.includes(curDate)
  }

  const judgeClass = (headDate: string, currentDate?: string) => {
    return headDate === curDayOnlyDay ? 'head-active' : ''
  }

  const findMaxDifference = (rushDates: string[]) => {
    const tempArr = rushDates.map((item) => Number(item))
    tempArr.push(Number(curDayOnlyDay))
    tempArr.sort((a, b) => a - b)
    let maxDiff = 0
    for (let i = 1; i < tempArr.length; i++) {
      const diff = tempArr[i] - tempArr[i - 1]
      if (diff > maxDiff) {
        maxDiff = diff
      }
    }

    if (rushDates.length === 0) {
      maxDiff = Number(curDayOnlyDay)
    }

    return maxDiff
  }

  // ? 获取用户列表
  /*  const loadList = () => {
    variables.loading = true
    getRecordsByMonth({})
      .then(({ data }: { data: any }) => {
        variables.userList = data.map((per: any) => {
          return {
            id: per.id,
            name: per.name,
            rushDates: [],
          }
        })
      })
      .finally(() => {
        variables.loading = false
      })
  }
  loadList() */

  // ? 获取当前月份的记录
  const loadRecords = () => {
    // 当前月份
    variables.loading = true
    getRecordsByMonth({
      createAt: currentCheckMonth.value,
    })
      .then(({ data }: { data: any }) => {
        variables.userList = data.map((per: any) => {
          return {
            userId: per.userId,
            name: per.name,
            rushDates: per.records.map((i: any) => i.date),
            records: per.records,
          }
        })
      })
      .finally(() => {
        variables.loading = false
      })
  }
  loadRecords()

  const handleDelUser = (id: string) => {
    confirmDialog().then(() => {
      delUser({ id }).then(() => {
        loadRecords()
        ElMessage.success('删除成功')
      })
    })
  }
  /**
   *
   * @param checked
   * @param userId
   * @param records
   * @param currentDay
   */
  const handleItemCheckChange = async (
    checked: boolean,
    userId: string,
    records: RecordItemType[],
    currentDay: string,
  ) => {
    const curDate = userStore.currentYear + '-' + userStore.currentMonth + '-' + currentDay
    // ?找出当前日期下的记录ID
    const recordId = records.find((item) => item.date === curDate)?.id
    checked
      ? await insertRecord({ userId: userId, createAt: curDate })
      : await delRecord({ id: recordId || '' })
  }

  return {
    dateList,
    judgeChecked,
    judgeClass,
    findMaxDifference,
    loadRecords,
    currentDate,
    currentCheckMonth,
    handleDelUser,
    variables,
    handleItemCheckChange,
  }
}
export { useRecord }
