import { ComputedRef, Ref } from 'vue'

import {
  DesignPropsType,
  DesignPropsValueType
} from '../../classes/Design'

import { NumberOrStringType } from '../types'

import { PropsImageType } from './props'

// Interface for describing which components need to be connected for work
// Интерфейс для описания, какие компоненты надо подключить для работы
// export interface ImageComponentsInterface {}

// Interface for describing what property setup returns
// Интерфейс для описания, какое свойство возвращает setup
export interface ImageInitInterface {
  text: ComputedRef<string | undefined>
}

// Type describing incoming properties
// Тип, описывающий входящие свойства
export type ImagePropsValueType = DesignPropsValueType<PropsImageType>

// Type describing available events
// Тип, описывающий доступные события
export type ImageEmitsType = {
  load: [value: any]
}

// Type describing available slots
// Тип, описывающий доступные слоты
export type ImageSlotsType = DesignPropsType

// Available image types
// Доступные типы изображений
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

export type ImageElementType = Ref<HTMLElement | undefined>
export type ImageValueType = Ref<string | File>
export type ImageOptionType = Ref<NumberOrStringType | undefined>

// Supported format for photo cropping of the image
// Поддерживаемый формат для фото обрезки изображения
export type ImageCoordinatorType = Ref<
  [number] |
  [number, number] |
  [number, number, number] |
  [number, number, number, number] |
  undefined
>

export interface ImageSizeType<T extends NumberOrStringType = number> {
  width: T
  height: T
}

// Parameters for the uploaded image or the one available by a direct link
// Параметры для загруженного изображения или доступного по прямой ссылке
export interface ImageItemType extends ImageSizeType {
  image: HTMLImageElement
  src: string
}

// Available data type for the image
// Доступный тип данных для изображения
export type ImageDataType = ImageItemType | string | undefined
export type ImageDataTypeFilled = ImageItemType | string
