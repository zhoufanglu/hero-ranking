import moment from 'moment'
const useRecord = () => {
  const currentDate = moment().format('YYYY-MM-DD')
  const curDayOnlyDay = currentDate.substring(currentDate.length - 2)
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

  return {
    dateList,
    judgeChecked,
    judgeClass,
    findMaxDifference,
    currentDate,
  }
}
export { useRecord }
