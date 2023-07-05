import { ComputedRef, Ref } from 'vue'
import { EmptyType, NumberOrStringType } from '../types'
import { isFilled } from '../../functions/data'

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

export interface ImageSizeType {
  width: number
  height: number
}

export interface ImageItemType extends ImageSizeType {
  image: HTMLImageElement
  src: string
}

export type ImageDataType = ImageItemType | string | undefined
export type ImageDataTypeFilled = ImageItemType | string
