import type { Option } from '@/types'

export enum StatusValues {
  ALL = null,
  COMPLETED = 0,
  UNCOMPLETED = 1,
  FAVORITE = 2
}

export const STATUSES: Option[] = [
  {
    value: StatusValues.ALL,
    label: 'All'
  },
  {
    value: StatusValues.COMPLETED,
    label: 'Completed'
  },
  {
    value: StatusValues.UNCOMPLETED,
    label: 'Uncompleted'
  },
  {
    value: StatusValues.FAVORITE,
    label: 'Favorite'
  }
]