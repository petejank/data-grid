import {Component, Input} from '@angular/core'

import images from './images'

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.scss']
})
export class ImageComponent {
  private static readonly CLASS_NAME = 'image'

  @Input() type!: keyof typeof images
  @Input() large?: boolean
  @Input() fillInherit?: boolean

  get imageSrc() {
    return images[this.type]
  }

  get classes() {
    return {
      [ImageComponent.CLASS_NAME]: true,
      [`${ImageComponent.CLASS_NAME}--large`]: this.large,
      [`${ImageComponent.CLASS_NAME}--fill-inherit`]: this.fillInherit
    }
  }
}
