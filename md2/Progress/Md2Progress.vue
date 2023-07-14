<script setup lang="ts">
import {
  // defineSlots,
  defineOptions
} from 'vue'

import { ProgressDesign } from '../../constructors/Progress/ProgressDesign'
// import { ProgressEmitsType, ProgressSlotsType } from '../../constructors/Progress/types'

import { defaults, PropsType, subClasses } from './types'

defineOptions({
  // [!] System label, cannot be deleted
  // [!] Системная метка, нельзя удалять
  // :name
  name: 'Md2Progress'
  // :name
})

const props = withDefaults(defineProps<PropsType>(), defaults)
// const emit = defineEmits<ProgressEmitsType>()

// defineSlots<ProgressSlotsType>()

// Class for managing component, mainly this is for automatic generation of classes and styles
// Класс для управления компонентом, в основном это для автоматической генерации классов и стилей
const design = new ProgressDesign<typeof subClasses>(props/* , emit */)

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
@import "../../constructors/Progress/style";

// Mixin for generating all classes, states and properties of component
// Миксин для генерации всех классов, состояний и свойств компонента
@include initProgressDesign {

}
</style>
