import {
  Component,
  ContentChildren,
  EventEmitter,
  Input,
  Output,
  QueryList,
  AfterContentInit,
  OnChanges
} from '@angular/core'
import {isObservable, lastValueFrom} from 'rxjs'
import {DEFAULT_PAGE_NUMBER} from 'src/app/constants/pagination'
import {Direction} from 'src/app/constants/sort'
import {PaginationChangeEvent} from 'src/app/shared/models/pagination-change-event.model'
import {SortChangeEvent} from 'src/app/shared/models/sort-change-event.model'
import {IterableData} from 'src/app/types/iterable-data'
import {PaginationOptions} from 'src/app/types/pagination'
import {ColumnComponent} from '../column/column.component'
import {ColumnData} from './services/column-data.model'
import {ColumnDataService} from './services/column-data.service'
import {PropertyChanges} from './types/change'

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss']
})
export class GridComponent<T> implements OnChanges, AfterContentInit {
  columnsData!: ColumnData<T>[]
  currentData!: T[]
  private currentSortColumn?: ColumnData<T>
  private prevPendingData?: Promise<T[]>

  @Input() data!: IterableData<T>
  @Input() count!: number
  @Input() sortable: boolean = false
  @Input() pageNumber: number = DEFAULT_PAGE_NUMBER
  @Input() pageSize: PaginationOptions = null
  @Output() sortChange = new EventEmitter<SortChangeEvent<T>>()
  @Output() paginationChange = new EventEmitter<PaginationChangeEvent>()

  @ContentChildren(ColumnComponent) columnComponents!: QueryList<ColumnComponent<T>>

  constructor(private columnDataService: ColumnDataService) {}

  ngAfterContentInit() {
    this.columnsData = this.columnDataService.map(this.columnComponents.toArray())
  }

  ngOnChanges({data}: PropertyChanges<T>) {
    if (!data) return
    const {currentValue} = data

    if (!isObservable(currentValue)) {
      this.prevPendingData = undefined
      this.currentData = currentValue
      return
    }

    const pendingData = lastValueFrom(currentValue)
    this.prevPendingData = pendingData

    pendingData.then((data) => {
      // Race condition protection
      if (this.prevPendingData !== pendingData) return

      this.currentData = data
    })
  }

  onSortChange(columnData: ColumnData<T>) {
    const {name, property, direction, sortable} = columnData

    if (columnData !== this.currentSortColumn) {
      this.resetCurrentSortColumn()
    }

    let newDirection
    switch (direction) {
      case Direction.Asc:
        newDirection = Direction.Desc
        break
      case Direction.Desc:
        newDirection = Direction.None
        break
      default:
        newDirection = Direction.Asc
        break
    }

    const newColumnData = new ColumnData(name, property, sortable, newDirection)
    this.currentSortColumn = newDirection !== Direction.None ? newColumnData : undefined
    this.updateColumnsData(newColumnData)

    this.sortChange.emit(new SortChangeEvent(property, newDirection))
  }

  onReducePage() {
    this.paginationChange.emit(new PaginationChangeEvent(this.pageNumber - 1, this.pageSize))
  }

  onIncrementPage() {
    this.paginationChange.emit(new PaginationChangeEvent(this.pageNumber + 1, this.pageSize))
  }

  onPageSizeChange(value: PaginationOptions) {
    this.paginationChange.emit(new PaginationChangeEvent(DEFAULT_PAGE_NUMBER, value))
  }

  updateColumnsData(newColumnData: ColumnData<T>) {
    const columnIndex = this.columnsData.findIndex(({property}) => property === newColumnData.property)
    this.columnsData = Object.assign([], this.columnsData, {[columnIndex]: newColumnData})
  }

  resetCurrentSortColumn() {
    if (!this.currentSortColumn) return
    this.currentSortColumn.direction = Direction.None
    this.updateColumnsData(this.currentSortColumn)
  }

  isColumnSortable(columnData: ColumnData<T>) {
    return this.sortable && columnData.sortable
  }

  isSortColumn(columnData: ColumnData<T>) {
    return this.currentSortColumn === columnData
  }

  getColumnSortFn(columnData: ColumnData<T>) {
    if (!this.isColumnSortable(columnData)) return

    return () => this.onSortChange(columnData)
  }
}
