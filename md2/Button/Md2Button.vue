<script setup lang="ts">
import {
  defineSlots,
  defineOptions
} from 'vue'

import { ButtonDesign } from '../../constructors/Button/ButtonDesign'
import { ButtonEmitsType, ButtonSlotsType } from '../../constructors/Button/types'

import { defaults, PropsType, subClassesType } from './types'

defineOptions({
  // [!] System label, cannot be deleted
  // [!] Системная метка, нельзя удалять
  // :name
  name: 'Md2Button'
  // :name
})

const props = withDefaults(defineProps<PropsType>(), defaults)
const emit = defineEmits<ButtonEmitsType>()

defineSlots<ButtonSlotsType>()

// Class for managing component, mainly this is for automatic generation of classes and styles
// Класс для управления компонентом, в основном это для автоматической генерации классов и стилей
const design = new ButtonDesign<subClassesType>(props, emit)

// Calls all available variables in this component
// Вызывает все доступные переменные в этом компоненте
const {
  classes,
  styles
} = design.setup({})

// Property for render
// Свойство для render
// const render = design.render()
</script>

<template>
  <div :class="classes.main" :style="styles"></div>
  <!-- <render/> -->
</template>

<style lang="scss">
@import "../../constructors/Button/style";

// Mixin for generating all classes, states and properties of component
// Миксин для генерации всех классов, состояний и свойств компонента
@include initButtonDesign {}
</style>
