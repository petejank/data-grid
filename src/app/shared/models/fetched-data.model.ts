export class FetchedData<T> {
  constructor(private _count: number, private _data: T[]) {}

  get count() {
    return this._count
  }

  get data() {
    return this._data
  }
}
