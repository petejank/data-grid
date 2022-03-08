import {DEFAULT_PAGE_NUMBER} from 'src/app/constants/pagination'
import {DataProvider} from 'src/app/types/data-provider'
import {PaginationChangeEvent} from '../models/pagination-change-event.model'
import {PaginationParams} from '../models/pagination-params.model'
import {SortChangeEvent} from '../models/sort-change-event.model'
import {SortParams} from '../models/sort-params.model'

export class Paginator<T> {
  private _count?: number
  private _data?: T[]
  private _currentSortParams?: SortParams<T>

  constructor(private dataProvider: DataProvider<T>, private _currentPaginationParams: PaginationParams) {}

  get count() {
    return this._count
  }

  get data() {
    return this._data
  }

  get currentSortParams() {
    return this._currentSortParams
  }

  get currentPaginationParams() {
    return this._currentPaginationParams
  }

  fetchCurrent() {
    const {count, data} = this.dataProvider.fetch(this._currentPaginationParams, this._currentSortParams)
    this._count = count
    this._data = data
  }

  fetchPaginated({currentPage, pageSize}: PaginationChangeEvent) {
    this._currentPaginationParams = new PaginationParams(currentPage, pageSize)
    this.fetchCurrent()
  }

  fetchSorted({columnName, direction}: SortChangeEvent<T>) {
    this._currentPaginationParams = new PaginationParams(DEFAULT_PAGE_NUMBER, this._currentPaginationParams.pageSize)
    this._currentSortParams = new SortParams(columnName, direction)
    this.fetchCurrent()
  }
}
