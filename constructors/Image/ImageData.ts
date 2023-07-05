import { ref, Ref, watchEffect } from 'vue'

import { ImageFile } from './ImageFile'
import { ImageIcon } from './ImageIcon'
import { ImageType } from './ImageType'

import { ImageDataType, ImageValueType } from './types'

export class ImageData {
  protected readonly item = ref<ImageDataType>()

  constructor (
    protected readonly type: ImageType,
    protected readonly image: ImageValueType,
    protected readonly url: Ref<string>
  ) {
    watchEffect(() => this.update())
  }

  /**
   * Data update
   *
   * Обновление данных
   * @protected
   */
  protected async update (): Promise<void> {
    this.item.value = undefined

    switch (this.type.get()) {
      case 'image':
      case 'file':
        this.item.value = await ImageFile.createImage(this.image.value)
        break
      case 'public':
        if (typeof this.image.value === 'string') {
          this.item.value = ImageIcon.get(this.image.value, this.url.value)
        }
        break
    }
  }
}
