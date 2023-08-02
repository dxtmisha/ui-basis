<script setup lang="ts">
import { ButtonDesign } from '../../constructors/Button/ButtonDesign'
import { /* ButtonEmitsType,  */ButtonSlotsType } from '../../constructors/Button/types'

import { defaults, PropsType, subclasses } from './props'
import * as map from './map.json'

defineOptions({
  // [!] System label, cannot be deleted
  // [!] Системная метка, нельзя удалять
  // :name-component
  name: 'Md3Button'
  // :name-component
})

const props = withDefaults(defineProps<PropsType>(), defaults)
// const emit = defineEmits<ButtonEmitsType>()

defineSlots<ButtonSlotsType>()

// Class for managing component, mainly this is for automatic generation of classes and styles
// Класс для управления компонентом, в основном это для автоматической генерации классов и стилей
const design = new ButtonDesign(
  // [!] System label, cannot be deleted
  // [!] Системная метка, нельзя удалять
  // :name-class
  'md3-button',
  // :name-class
  props,
  {
    map,
    subclasses
  }//, emit
)

const render = design.render()
</script>

<template>
  <render/>

</template>

<style lang="scss">
@import "../../constructors/Button/style";

// [!] System label, cannot be deleted
// [!] Системная метка0, нельзя удалять
// :name-style
$componentName: 'md3.button';
// :name-style

// Mixin for generating all classes, states and properties of component
// Миксин для генерации всех классов, состояний и свойств компонента
@include initButtonDesign($componentName) {}
</style>
