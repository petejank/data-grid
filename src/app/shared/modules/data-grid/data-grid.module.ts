import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {ColumnComponent} from './column/column.component'
import {GridComponent} from './grid/grid.component'
import {ColumnDataService} from './grid/services/column-data.service'
import {TableModule} from '../table/table.module'
import {UtilityModule} from '../utility/utility.module'
import {SortToggleComponent} from './sort-toggle/sort-toggle.component'
import {PaginationComponent} from './pagination/pagination.component'

@NgModule({
  declarations: [ColumnComponent, GridComponent, SortToggleComponent, PaginationComponent],
  imports: [CommonModule, TableModule, UtilityModule],
  providers: [ColumnDataService],
  exports: [GridComponent, ColumnComponent]
})
export class DataGridModule {}
