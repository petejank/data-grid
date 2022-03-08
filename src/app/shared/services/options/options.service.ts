import {Injectable} from '@angular/core'
import {Option} from '../../models/option.model'

@Injectable()
export class OptionsService {
  private static readonly NULL_VALUE_LABEL = 'All'

  map(arr: (number | null)[] | readonly any[]) {
    return arr.map((val) => {
      const value = val === null ? OptionsService.NULL_VALUE_LABEL : val.toString()
      return new Option(value, val)
    })
  }
}
