import {Injectable} from '@angular/core'
import {ColumnComponent} from '../../column/column.component'
import {ColumnData} from './column-data.model'

@Injectable()
export class ColumnDataService {
  map<T>(columnComponents: ColumnComponent<T>[]) {
    return columnComponents.map(({name, property, sortable}) => new ColumnData(name, property, sortable))
  }
}
