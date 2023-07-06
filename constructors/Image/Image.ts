import { Ref } from 'vue'

import { ImageBackground } from './ImageBackground'
import { ImageData } from './ImageData'

import {
  ImageCoordinatorType,
  ImageElementType,
  ImageOptionType,
  ImageValueType
} from './types'
import { ImageType } from './ImageType'
import { ImageAdaptive } from './ImageAdaptive'

export class Image {
  protected type: ImageType

  protected data: ImageData
  protected background: ImageBackground

  protected adaptiveItem: ImageAdaptive

  constructor (
    protected readonly element: ImageElementType,
    protected readonly image: ImageValueType,
    protected readonly coordinator: ImageCoordinatorType,
    protected readonly size: ImageOptionType,
    protected readonly x: ImageOptionType,
    protected readonly y: ImageOptionType,
    protected readonly group: Ref<string>,
    protected readonly adaptive: Ref<boolean>,
    protected readonly width: Ref<number>,
    protected readonly height: Ref<number>,
    protected readonly url: Ref<string>
  ) {
    this.type = new ImageType(image)

    this.data = new ImageData(
      this.type,
      this.image,
      this.url
    )

    this.background = new ImageBackground(this.data)

    this.adaptiveItem = new ImageAdaptive(
      this.element,
      this.data,
      this.group,
      this.adaptive,
      this.width,
      this.height
    )
  }
}
