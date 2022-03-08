import {Component, Input} from '@angular/core'
import {Direction} from 'src/app/constants/sort'

@Component({
  selector: 'app-sort-toggle',
  templateUrl: './sort-toggle.component.html',
  styleUrls: ['./sort-toggle.component.scss']
})
export class SortToggleComponent {
  @Input() direction!: Direction

  isAsc() {
    return this.direction === Direction.Asc
  }

  isDesc() {
    return this.direction === Direction.Desc
  }
}
