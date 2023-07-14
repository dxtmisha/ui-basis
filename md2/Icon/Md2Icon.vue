<script setup lang="ts">
import {
  defineSlots,
  defineOptions
} from 'vue'

import { IconDesign } from '../../constructors/Icon/IconDesign'
import { IconEmitsType, IconSlotsType } from '../../constructors/Icon/types'

import { defaults, PropsType, subClasses } from './props'

import Md2Image from '../Image/Md2Image.vue'

defineOptions({
  // [!] System label, cannot be deleted
  // [!] Системная метка, нельзя удалять
  // :name
  name: 'Md2Icon'
  // :name
})

const props = withDefaults(defineProps<PropsType>(), defaults)
const emit = defineEmits<IconEmitsType>()

defineSlots<IconSlotsType>()

// Class for managing component, mainly this is for automatic generation of classes and styles
// Класс для управления компонентом, в основном это для автоматической генерации классов и стилей
const design = new IconDesign<typeof subClasses>(props, emit)
  .setComponents({
    image: Md2Image
  })

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
  <render>
    <slot/>
  </render>
</template>

<style lang="scss">
@import "../../constructors/Icon/style";

// Mixin for generating all classes, states and properties of component
// Миксин для генерации всех классов, состояний и свойств компонента
@include initIconDesign {

}
</style>
