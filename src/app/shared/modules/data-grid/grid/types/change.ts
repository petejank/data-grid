import {IterableData} from 'src/app/types/iterable-data'

export type PropertyChanges<T> = {
  data?: {
    currentValue: IterableData<T>
  }
}
