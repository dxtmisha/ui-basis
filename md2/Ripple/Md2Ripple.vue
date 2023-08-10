<script setup lang="ts">
import { PropertiesMapListType } from '../../classes/DesignProperties'
import { RippleDesign } from '../../constructors/Ripple/RippleDesign'
// import { RippleEmitsType, RippleSlotsType } from '../../constructors/Ripple/types'

import { propsInstruction, subclasses } from './props'
import * as map from './map.json'

defineOptions({
  // [!] System label, cannot be deleted
  // [!] Системная метка, нельзя удалять
  // :name-component
  name: 'Md2Ripple'
  // :name-component
})

const props = defineProps({ ...propsInstruction })
// const emit = defineEmits<RippleEmitsType>()

// defineSlots<RippleSlotsType>()

// Class for managing component, mainly this is for automatic generation of classes and styles<br>
// Класс для управления компонентом, в основном это для автоматической генерации классов и стилей
const design = new RippleDesign(
  // [!] System label, cannot be deleted
  // [!] Системная метка, нельзя удалять
  // :name-class
  'md2-ripple',
  // :name-class
  props,
  {
    map: map as PropertiesMapListType,
    subclasses
  }//, emit
)

const render = design.render()
</script>

<template>
  <render/>
</template>

<style lang="scss">
@import "../../constructors/Ripple/style";

// [!] System label, cannot be deleted
// [!] Системная метка0, нельзя удалять
// :name-style
$componentName: 'md2.ripple';
// :name-style

// Mixin for generating all classes, states and properties of component
// Миксин для генерации всех классов, состояний и свойств компонента
@include initRippleDesign($componentName) {
}
</style>
