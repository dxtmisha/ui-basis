<script setup lang="ts">
import {
  defineSlots,
  defineOptions
} from 'vue'

import { ChipDesign } from '../../constructors/Chip/ChipDesign'
import { ChipEmitsType, ChipSlotsType } from '../../constructors/Chip/types'

import { defaults, PropsType, subClasses } from './props'

import Md3Icon from '../Icon/Md3Icon.vue'
import Md3Progress from '../Progress/Md3Progress.vue'

defineOptions({
  // [!] System label, cannot be deleted
  // [!] Системная метка, нельзя удалять
  // :name
  name: 'Md3Chip'
  // :name
})

const props = withDefaults(defineProps<PropsType>(), defaults)
const emit = defineEmits<ChipEmitsType>()

defineSlots<ChipSlotsType>()

// Class for managing component, mainly this is for automatic generation of classes and styles
// Класс для управления компонентом, в основном это для автоматической генерации классов и стилей
const design = new ChipDesign<typeof subClasses>(props, emit)
  .setComponents({
    icon: Md3Icon,
    progress: Md3Progress
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
@import "../../constructors/Chip/style";

// Mixin for generating all classes, states and properties of component
// Миксин для генерации всех классов, состояний и свойств компонента
@include initChipDesign {
}
</style>
