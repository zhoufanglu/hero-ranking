export type RecordItemType = {
  id: string
  date: string
}
export interface UserItemType {
  userId: string
  name: string
  avatar?: string
  rushDates: string[]
  records: RecordItemType[]
  qq?: string
}
