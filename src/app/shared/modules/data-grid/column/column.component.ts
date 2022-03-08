import {Component, Input} from '@angular/core'

@Component({
  selector: 'app-grid-column',
  templateUrl: './column.component.html'
})
export class ColumnComponent<T> {
  @Input() name!: string
  @Input() property!: keyof T
  @Input() sortable!: boolean
}
