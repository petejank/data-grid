import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {DataGridModule} from './modules/data-grid/data-grid.module'
import {TableModule} from './modules/table/table.module'
import {EntriesProviderService} from './services/entries-provider/entries-provider.service'
import {UtilityModule} from './modules/utility/utility.module'
import {OptionsService} from './services/options/options.service'

@NgModule({
  imports: [CommonModule],
  providers: [EntriesProviderService, OptionsService],
  exports: [UtilityModule, DataGridModule, TableModule]
})
export class SharedModule {}
