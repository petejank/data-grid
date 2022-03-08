import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {TypographyComponent} from './components/typography/typography.component'
import {PaperComponent} from './components/paper/paper.component'
import {SelectComponent} from './components/select/select.component'
import {ImageComponent} from './components/image/image.component'
import {ButtonComponent} from './components/button/button.component'
import {SafeHtmlPipe} from './pipes/safe-html/safe-html.pipe'

@NgModule({
  declarations: [SafeHtmlPipe, TypographyComponent, PaperComponent, SelectComponent, ImageComponent, ButtonComponent],
  imports: [CommonModule],
  exports: [SafeHtmlPipe, TypographyComponent, PaperComponent, SelectComponent, ImageComponent, ButtonComponent]
})
export class UtilityModule {}
