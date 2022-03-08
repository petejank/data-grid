import {Component, OnInit} from '@angular/core'
import {DEFAULT_PAGE_NUMBER, DEFAULT_PAGE_SIZE} from 'src/app/constants/pagination'
import {PaginationChangeEvent} from 'src/app/shared/models/pagination-change-event.model'
import {PaginationParams} from 'src/app/shared/models/pagination-params.model'
import {EntriesProviderService} from 'src/app/shared/services/entries-provider/entries-provider.service'
import {Paginator} from 'src/app/shared/utils/paginator'
import {Entry} from 'src/app/types/entry'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  paginator: Paginator<Entry>

  constructor(private entriesProvider: EntriesProviderService) {
    this.paginator = new Paginator(this.entriesProvider, new PaginationParams(DEFAULT_PAGE_NUMBER, DEFAULT_PAGE_SIZE))
  }

  ngOnInit() {
    this.paginator.fetchCurrent()
  }

  onPaginationChange(event: PaginationChangeEvent) {
    this.paginator.fetchPaginated(event)
  }
}
