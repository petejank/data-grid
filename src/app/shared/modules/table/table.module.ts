import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {ContainerComponent} from './container/container.component'
import {TableComponent} from './table/table.component'
import {HeadComponent} from './head/head.component'
import {RowComponent} from './row/row.component'
import {CellComponent} from './cell/cell.component'
import {BodyComponent} from './body/body.component'

@NgModule({
  declarations: [ContainerComponent, TableComponent, HeadComponent, RowComponent, CellComponent, BodyComponent],
  imports: [CommonModule],
  exports: [ContainerComponent, TableComponent, HeadComponent, RowComponent, CellComponent, BodyComponent]
})
export class TableModule {}
