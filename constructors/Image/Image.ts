import { Ref } from 'vue'

import { ImageData } from './ImageData'

import {
  ImageCoordinatorType,
  ImageOptionType,
  ImageValueType
} from './types'
import { ImageType } from './ImageType'

export class Image {
  protected type: ImageType
  protected data: ImageData

  constructor (
    protected readonly element: Ref<HTMLElement | undefined>,
    protected readonly image: ImageValueType,
    protected readonly coordinator: ImageCoordinatorType,
    protected readonly size: ImageOptionType,
    protected readonly x: ImageOptionType,
    protected readonly y: ImageOptionType,
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
  }
}
