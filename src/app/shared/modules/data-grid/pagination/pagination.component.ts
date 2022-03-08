import {Component, EventEmitter, Input, Output} from '@angular/core'
import {PAGINATION_SIZE_OPTIONS} from 'src/app/constants/pagination'
import {Option} from 'src/app/shared/models/option.model'
import {OptionsService} from 'src/app/shared/services/options/options.service'
import {PaginationOptions} from 'src/app/types/pagination'

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent {
  options!: Option[]

  @Input() currentPage!: number
  @Input() pageSize!: number | null
  @Input() count!: number
  @Output() leftClick = new EventEmitter<void>()
  @Output() rightClick = new EventEmitter<void>()
  @Output() pageSizeChange = new EventEmitter<PaginationOptions>()

  constructor(optionsService: OptionsService) {
    this.options = optionsService.map(PAGINATION_SIZE_OPTIONS)
  }

  get selectedOption() {
    return this.options.find(({value}) => value === this.pageSize)
  }

  get leftBracket() {
    if (this.pageSize === null) return this.currentPage

    return this.currentPage * this.pageSize + 1 - this.pageSize
  }

  get rightBracket() {
    if (this.pageSize === null) return this.count

    const currRightBracket = this.currentPage * this.pageSize
    if (currRightBracket > this.count) return this.count

    return currRightBracket
  }

  isLeftButtonDisabled() {
    return this.pageSize === null || this.currentPage === 1
  }

  isRightButtonDisabled() {
    return this.rightBracket === this.count
  }

  onOptionChange({value}: Option) {
    this.pageSizeChange.emit(value as PaginationOptions)
  }

  onLeftClick() {
    this.leftClick.emit()
  }

  onRightClick() {
    this.rightClick.emit()
  }
}
