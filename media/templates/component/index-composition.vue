<script setup lang="ts">
import {
  defineSlots,
  defineOptions
} from 'vue'

/* :basic.once */
import { Design } from '../../../classes/Design'
/* :basic.once.end */
// :constructor.once import { ConstructorDesign } from '../../../constructors/Constructor/ConstructorDesign'
// :constructor.once import { ConstructorEmitsType, ConstructorSlotsType } from '../../../constructors/Constructor/types'

import { defaults, PropsType, subClasses } from './props'

defineOptions({
  // [!] System label, cannot be deleted
  // [!] Системная метка, нельзя удалять
  // :name
  name: 'DesignComponent'
  // :name
})

const props = withDefaults(defineProps<PropsType>(), defaults)
const emit = defineEmits/* :constructor.once <ConstructorEmitsType> */(/* :basic.once */[]/* :basic.once.end */)

defineSlots/* :constructor.once <ConstructorSlotsType> */()

// Class for managing component, mainly this is for automatic generation of classes and styles
// Класс для управления компонентом, в основном это для автоматической генерации классов и стилей
const design = new /* :constructor.once Constructor */Design<typeof subClasses>(props, emit)

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
// :basic.once @import "../../../styles/properties";
// :constructor.once @import "../../../constructors/Constructor/style";

// Mixin for generating all classes, states and properties of component
// Миксин для генерации всех классов, состояний и свойств компонента
// :basic.once @include initDesign {}
// :constructor.once @include initConstructorDesign {}
</style>
