import {Direction} from 'src/app/constants/sort'
import {SortParams} from '../models/sort-params.model'

export default <T>(arr: T[], sort: SortParams<T>): T[] => {
  const {columnName, direction} = sort

  const sortTarget = [...arr]
  if (direction === Direction.None) return sortTarget

  return sortTarget.sort((a, b) => {
    const isAsc = direction === Direction.Asc
    if (a[columnName] < b[columnName]) return isAsc ? -1 : 1
    if (a[columnName] > b[columnName]) return isAsc ? 1 : -1

    return 0
  })
}
