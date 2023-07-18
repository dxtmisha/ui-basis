<script setup lang="ts">
import {
  defineSlots,
  defineOptions
} from 'vue'

import { MutationDesign } from '../../constructors/Mutation/MutationDesign'
import { MutationEmitsType, MutationSlotsType } from '../../constructors/Mutation/types'

import { defaults, PropsType, subClasses } from './props'

import Md2MutationItem from '../MutationItem/Md2MutationItem.vue'

defineOptions({
  // [!] System label, cannot be deleted
  // [!] Системная метка, нельзя удалять
  // :name
  name: 'Md2Mutation'
  // :name
})

const props = withDefaults(defineProps<PropsType>(), defaults)
const emit = defineEmits<MutationEmitsType>()

defineSlots<MutationSlotsType>()

// Class for managing component, mainly this is for automatic generation of classes and styles
// Класс для управления компонентом, в основном это для автоматической генерации классов и стилей
const design = new MutationDesign<typeof subClasses>(props, emit)
  .setComponents({
    mutationItem: Md2MutationItem
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
  <render/>
</template>

<style lang="scss">
@import "../../constructors/Mutation/style";

// Mixin for generating all classes, states and properties of component
// Миксин для генерации всех классов, состояний и свойств компонента
@include initMutationDesign {
}
</style>
