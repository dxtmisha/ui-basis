<script setup lang="ts">
import {
  // defineSlots,
  defineOptions
} from 'vue'

import { ImageDesign } from '../../constructors/Image/ImageDesign'
import { ImageEmitsType/* , ImageSlotsType */ } from '../../constructors/Image/types'

import { defaults, PropsType, subClasses } from './props'

defineOptions({
  // [!] System label, cannot be deleted
  // [!] Системная метка, нельзя удалять
  // :name
  name: 'Md2Image'
  // :name
})

const props = withDefaults(defineProps<PropsType>(), defaults)
const emit = defineEmits<ImageEmitsType>()

// defineSlots<ImageSlotsType>()

// Class for managing component, mainly this is for automatic generation of classes and styles
// Класс для управления компонентом, в основном это для автоматической генерации классов и стилей
const design = new ImageDesign<typeof subClasses>(props, emit)

// Calls all available variables in this component
// Вызывает все доступные переменные в этом компоненте
// const {
//   classes,
//   styles
// } = design.setup({})

// Property for render
// Свойство для render
const render = design.render()
</script>

<template>
  <render/>
</template>

<style lang="scss">
@import "../../constructors/Image/style";

// Mixin for generating all classes, states and properties of component
// Миксин для генерации всех классов, состояний и свойств компонента
@include initImageDesign {

}
</style>
