import {FetchedData} from '../shared/models/fetched-data.model'
import {PaginationParams} from '../shared/models/pagination-params.model'
import {SortParams} from '../shared/models/sort-params.model'

export interface DataProvider<T> {
  fetch(paginationParams: PaginationParams, sortParams?: SortParams<T>): FetchedData<T>
}
