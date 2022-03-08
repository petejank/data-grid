import {Component, Input} from '@angular/core'

@Component({
  selector: 'app-table-cell',
  templateUrl: './cell.component.html',
  styleUrls: ['./cell.component.scss']
})
export class CellComponent {
  private static readonly CLASS_NAME = 'table-cell'

  @Input() header?: boolean
  @Input() onClick?: Function

  get classes() {
    return {
      [CellComponent.CLASS_NAME]: true,
      [`${CellComponent.CLASS_NAME}--header`]: this.header
    }
  }
}
