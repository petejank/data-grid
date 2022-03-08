import {Injectable} from '@angular/core'
import {DataProvider} from 'src/app/types/data-provider'
import {Entry} from 'src/app/types/entry'
import sort from 'src/app/shared/utils/sort'
import {PaginationParams} from '../../models/pagination-params.model'
import {SortParams} from '../../models/sort-params.model'
import {FetchedData} from '../../models/fetched-data.model'
import entries from './entries'

@Injectable()
export class EntriesProviderService implements DataProvider<Entry> {
  fetch(pageParams: PaginationParams, sortParams?: SortParams<Entry>): FetchedData<Entry> {
    const {currentPage, pageSize} = pageParams

    let fetchedEntries = [...entries]
    let sortedEntries = !sortParams ? fetchedEntries : sort(fetchedEntries, sortParams)
    if (pageSize !== null) {
      const maxRange = currentPage * pageSize
      sortedEntries = sortedEntries.slice(maxRange - pageSize, maxRange)
    }

    return new FetchedData(entries.length, sortedEntries)
  }
}
