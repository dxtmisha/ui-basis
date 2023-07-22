<script setup lang="ts">
import {
  defineSlots,
  defineOptions
} from 'vue'

import { ButtonIconDesign } from '../../constructors/ButtonIcon/ButtonIconDesign'
import { /* ButtonIconEmitsType,  */ButtonIconSlotsType } from '../../constructors/ButtonIcon/types'

import { defaults, PropsType, subClasses } from './props'

defineOptions({
  // [!] System label, cannot be deleted
  // [!] Системная метка, нельзя удалять
  // :name
  name: 'Md3ButtonIcon'
  // :name
})

const props = withDefaults(defineProps<PropsType>(), defaults)
// const emit = defineEmits<ButtonIconEmitsType>()

defineSlots<ButtonIconSlotsType>()

// Class for managing component, mainly this is for automatic generation of classes and styles
// Класс для управления компонентом, в основном это для автоматической генерации классов и стилей
const design = new ButtonIconDesign<typeof subClasses>(props/* , emit */)

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
@import "../../constructors/ButtonIcon/style";

// Mixin for generating all classes, states and properties of component
// Миксин для генерации всех классов, состояний и свойств компонента
@include initButtonIconDesign {}
</style>
