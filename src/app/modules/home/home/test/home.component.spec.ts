import {ComponentFixture, TestBed} from '@angular/core/testing'
import {By} from '@angular/platform-browser'
import {SharedModule} from 'src/app/shared/shared.module'
import {HomeComponent} from '../home.component'
import pageDataMap, {FIRST_COLUMN_SORTED_ASC, FIRST_COLUMN_SORTED_DESC} from './pageDataMap'

// Integration tests suite, courtesy of Kent C. Dodds
// In real life and more robust project these tests should be also applied to an Observable<T[]> data input
describe('HomeComponent', () => {
  let fixture: ComponentFixture<HomeComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SharedModule],
      declarations: [HomeComponent]
    }).compileComponents()

    fixture = TestBed.createComponent(HomeComponent)
    fixture.detectChanges()
  })

  it('render left pagination button in disabled state', () => {
    const button = getLeftPaginationButton()

    expect(button.attributes['ng-reflect-disabled']).toEqual('true')
  })

  itTestCurrentPageDisplay(1, 5)

  itTestRightProgression(9, 1, 5)

  describe('when user changes the selected range to 25', () => {
    beforeEach(() => {
      changeRange('25')
    })

    itTestRightProgression(2, 1, 25)

    describe('when user changes the selected range to 50', () => {
      beforeEach(() => {
        changeRange('50')
      })

      itTestCurrentPageDisplay(1, 50)
      itTestRightButtonDisabled()
      itTestLeftButtonDisabled()

      describe('when user changes the selected range to All', () => {
        beforeEach(() => {
          changeRange('All')
        })

        itTestRightButtonDisabled()
        itTestLeftButtonDisabled()
        itTestCurrentPageDisplay(1, 'All')
      })
    })
  })

  // Basic sort change test - can be plugged into the pagination testing in the future
  describe('when user clicks the "id" column header', () => {
    beforeEach(clickFirstColumnHeader)

    it('render rows in ascending order', () => {
      const cellValues = getCellValues()

      expect(cellValues).toEqual(FIRST_COLUMN_SORTED_ASC.rows)
    })

    describe('when user clicks the "id" column header again', () => {
      beforeEach(clickFirstColumnHeader)

      it('render rows in descending order', () => {
        const cellValues = getCellValues()

        expect(cellValues).toEqual(FIRST_COLUMN_SORTED_DESC.rows)
      })
    })

    function clickFirstColumnHeader() {
      const headers = fixture.debugElement.queryAll(
        By.css('[data-testid="grid-column-header"] [data-testid="table-cell"]')
      )
      const firstHeader = headers[0]

      firstHeader.triggerEventHandler('click', null)
      fixture.detectChanges()
    }
  })

  function itTestRightProgression(maxPageNumber: number, prevPageNumber: number, range: number | string) {
    if (maxPageNumber === prevPageNumber) return

    const currentPageNumber = prevPageNumber + 1

    describe(`when user clicks the right pagination arrow - page ${prevPageNumber}`, () => {
      beforeEach(clickRightArrow)

      itTestCurrentPageDisplay(currentPageNumber, range)

      itTestRightProgression(maxPageNumber, currentPageNumber, range)

      if (maxPageNumber === currentPageNumber) {
        itTestRightButtonDisabled()

        it('render left pagination button in enabled state', () => {
          const button = getLeftPaginationButton()

          expect(button.attributes['ng-reflect-disabled']).toEqual('false')
        })

        itTestLeftProgression(1, currentPageNumber, range)
      }
    })
  }

  function itTestLeftProgression(minPageNumber: number, prevPageNumber: number, range: number | string) {
    if (minPageNumber === prevPageNumber) return

    const currentPageNumber = prevPageNumber - 1

    describe(`when user clicks the left pagination arrow - page ${prevPageNumber}`, () => {
      beforeEach(clickLeftArrow)

      itTestCurrentPageDisplay(currentPageNumber, range)

      itTestLeftProgression(minPageNumber, currentPageNumber, range)

      if (minPageNumber === currentPageNumber) {
        itTestLeftButtonDisabled()

        it('render right pagination button in enabled state', () => {
          const button = getRightPaginationButton()

          expect(button.attributes['ng-reflect-disabled']).toEqual('false')
        })
      }
    })
  }

  function itTestRightButtonDisabled() {
    it('render right pagination button in disabled state', () => {
      const button = getRightPaginationButton()

      expect(button.attributes['ng-reflect-disabled']).toEqual('true')
    })
  }

  function itTestLeftButtonDisabled() {
    it('render left pagination button in disabled state', () => {
      const button = getLeftPaginationButton()

      expect(button.attributes['ng-reflect-disabled']).toEqual('true')
    })
  }

  function itTestCurrentPageDisplay(page: number, range: number | string) {
    const {rows, leftBracket, rightBracket} = pageDataMap[range][page]

    it(`render page ${page} with ${range} rows`, () => {
      const cellValues = getCellValues()

      expect(cellValues).toEqual(rows)
    })

    it(`render page ${page} pagination range`, () => {
      const nativeElement = fixture.nativeElement as HTMLElement
      const paginationRange = nativeElement.querySelector('[data-testid="pagination-range"]')

      expect(paginationRange?.textContent).toEqual(`${leftBracket} - ${rightBracket} of 43`)
    })
  }

  function getCellValues() {
    const compiled = fixture.nativeElement as HTMLElement
    const rows = Array.from(compiled.querySelectorAll('[data-testid="table-row"]'))
    const cells = rows.map((row) => {
      const cellObjects = Array.from(row.querySelectorAll('[data-testid="table-cell"]'))
      const cellTextValues = cellObjects.map((cellObj) => cellObj.textContent?.trim())
      return cellTextValues
    })

    return cells
  }

  function clickLeftArrow() {
    const button = getLeftPaginationButton()
    button.triggerEventHandler('click', null)
    fixture.detectChanges()
  }

  function clickRightArrow() {
    const button = getRightPaginationButton()
    button.triggerEventHandler('click', null)
    fixture.detectChanges()
  }

  function changeRange(value: string) {
    const selector = fixture.debugElement.query(By.css('[data-testid="input-select"]'))
    selector.triggerEventHandler('change', {target: {value}})
    fixture.detectChanges()
  }

  function getLeftPaginationButton() {
    return fixture.debugElement.query(By.css('[data-testid="pagination-left"]'))
  }

  function getRightPaginationButton() {
    return fixture.debugElement.query(By.css('[data-testid="pagination-right"]'))
  }
})
