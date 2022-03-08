import {Direction} from 'src/app/constants/sort'

export class SortParams<T> {
  constructor(private _columnName: keyof T, private _direction: Direction) {}

  get columnName() {
    return this._columnName
  }

  get direction() {
    return this._direction
  }
}
