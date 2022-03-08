import {Direction} from 'src/app/constants/sort'

export class ColumnData<T> {
  constructor(
    private _name: string,
    private _property: keyof T,
    private _sortable: boolean,
    private _direction: Direction = Direction.None
  ) {}

  get name() {
    return this._name
  }

  get property() {
    return this._property
  }

  get sortable() {
    return this._sortable
  }

  get direction() {
    return this._direction
  }

  set direction(value: Direction) {
    this._direction = value
  }
}
