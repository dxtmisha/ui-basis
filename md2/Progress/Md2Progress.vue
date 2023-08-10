<script setup lang="ts">
import { PropertiesMapListType } from '../../classes/DesignProperties'
import { ProgressDesign } from '../../constructors/Progress/ProgressDesign'
// import { ProgressEmitsType, ProgressSlotsType } from '../../constructors/Progress/types'

import { propsInstruction, subclasses } from './props'
import * as map from './map.json'

defineOptions({
  // [!] System label, cannot be deleted
  // [!] Системная метка, нельзя удалять
  // :name-component
  name: 'Md2Progress'
  // :name-component
})

const props = defineProps({ ...propsInstruction })
// const emit = defineEmits<ProgressEmitsType>()

// defineSlots<ProgressSlotsType>()

// Class for managing component, mainly this is for automatic generation of classes and styles<br>
// Класс для управления компонентом, в основном это для автоматической генерации классов и стилей
const design = new ProgressDesign(
  // [!] System label, cannot be deleted
  // [!] Системная метка, нельзя удалять
  // :name-class
  'md2-progress',
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
@import "../../constructors/Progress/style";

// [!] System label, cannot be deleted
// [!] Системная метка0, нельзя удалять
// :name-style
$componentName: 'md2.progress';
// :name-style

// Mixin for generating all classes, states and properties of component
// Миксин для генерации всех классов, состояний и свойств компонента
@include initProgressDesign($componentName) {
}
</style>
