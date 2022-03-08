export class Option {
  constructor(private _label: string, private _value: number | null) {}

  get label() {
    return this._label
  }

  get value() {
    return this._value
  }
}
