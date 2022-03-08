import {Component, EventEmitter, Input, Output} from '@angular/core'
import {Option} from 'src/app/shared/models/option.model'

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss']
})
export class SelectComponent {
  @Input() selected?: Option
  @Input() options!: Option[]
  @Output() selectionChange = new EventEmitter<Option>()

  isSelected(option: Option) {
    return this.selected && this.selected.label === option.label
  }

  onSelectionChange({target}: Event) {
    if (!target) return
    const castTarget = target as HTMLSelectElement
    const newOption = this.options.find(({label}) => label === castTarget.value)

    this.selectionChange.emit(newOption)
  }
}
