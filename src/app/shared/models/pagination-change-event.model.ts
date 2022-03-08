import {PaginationOptions} from 'src/app/types/pagination'

export class PaginationChangeEvent {
  constructor(private _currentPage: number, private _pageSize: PaginationOptions) {}

  get currentPage() {
    return this._currentPage
  }

  get pageSize() {
    return this._pageSize
  }
}
