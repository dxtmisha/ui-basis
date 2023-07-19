<script setup lang="ts">
import {
  defineSlots,
  defineOptions
} from 'vue'

import { FabDesign } from '../../constructors/Fab/FabDesign'
import { FabEmitsType, FabSlotsType } from '../../constructors/Fab/types'

import { defaults, PropsType, subClasses } from './props'
import Md2Icon from '../Icon/Md2Icon.vue'
import Md2Ripple from '../Ripple/Md2Ripple.vue'
import Md2Progress from '../Progress/Md2Progress.vue'

defineOptions({
  // [!] System label, cannot be deleted
  // [!] Системная метка, нельзя удалять
  // :name
  name: 'Md2Fab'
  // :name
})

const props = withDefaults(defineProps<PropsType>(), defaults)
const emit = defineEmits<FabEmitsType>()

defineSlots<FabSlotsType>()

// Class for managing component, mainly this is for automatic generation of classes and styles
// Класс для управления компонентом, в основном это для автоматической генерации классов и стилей
const design = new FabDesign<typeof subClasses>(props, emit)
  .setComponents({
    icon: Md2Icon,
    ripple: Md2Ripple,
    progress: Md2Progress
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
@import "../../constructors/Fab/style";

// Mixin for generating all classes, states and properties of component
// Миксин для генерации всех классов, состояний и свойств компонента
@include initFabDesign {
}
</style>
