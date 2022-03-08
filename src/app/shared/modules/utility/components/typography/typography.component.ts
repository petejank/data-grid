import {Component, Input} from '@angular/core'
import {Weight} from './properties'

@Component({
  selector: 'app-typography',
  templateUrl: './typography.component.html',
  styleUrls: ['./typography.component.scss']
})
export class TypographyComponent {
  private static readonly CLASS_NAME = 'typography'

  // A bit hacky method, but works like a charm when we want to use enums instead of objects
  @Input() weight?: Lowercase<keyof typeof Weight>

  get classes() {
    return {
      [TypographyComponent.CLASS_NAME]: true,
      [`${TypographyComponent.CLASS_NAME}--bold`]: this.weight === Weight.Bold
    }
  }
}
