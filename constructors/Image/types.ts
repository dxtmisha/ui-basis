import { ComputedRef, Ref } from 'vue'
import { NumberOrStringType } from '../types'

export type ImageTypeItemType =
  'file'
  | 'image'
  | 'color'
  | 'public'
  | 'la'
  | 'lab'
  | 'filled'
  | 'outlined'
  | 'round'
  | 'sharp'
  | 'two-tone'
  | 'material'
export type ImageTypeType = ComputedRef<ImageTypeItemType | undefined>

export type ImageValueType = Ref<string | File>
export type ImageCoordinatorType = Ref<[number, number, number, number] | undefined>
export type ImageOptionType = Ref<NumberOrStringType | undefined>

export interface ImageSizeType<T = number> {
  width: T
  height: T
}

export interface ImageItemType<T = number> extends ImageSizeType<T> {
  image: HTMLImageElement
  src: string
}

export type ImageDataType = ImageItemType | string | undefined
