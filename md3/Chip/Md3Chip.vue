<script setup lang="ts">
import { PropertiesMapListType } from '../../classes/DesignProperties'
import { ChipDesign } from '../../constructors/Chip/ChipDesign'
import { ChipEmitsType, ChipSlotsType } from '../../constructors/Chip/types'

import { propsInstruction, subclasses } from './props'
import * as map from './map.json'

defineOptions({
  // [!] System label, cannot be deleted
  // [!] Системная метка, нельзя удалять
  // :name-component
  name: 'Md3Chip'
  // :name-component
})

const props = defineProps({ ...propsInstruction })
const emit = defineEmits<ChipEmitsType>()

defineSlots<ChipSlotsType>()

// Class for managing component, mainly this is for automatic generation of classes and styles<br>
// Класс для управления компонентом, в основном это для автоматической генерации классов и стилей
const design = new ChipDesign(
  // [!] System label, cannot be deleted
  // [!] Системная метка, нельзя удалять
  // :name-class
  'md3-chip',
  // :name-class
  props,
  {
    map: map as PropertiesMapListType,
    subclasses
  },
  emit
)

const render = design.render()
</script>

<template>
  <render>
    <slot/>
  </render>
</template>

<style lang="scss">
@import "../../constructors/Chip/style";

// [!] System label, cannot be deleted
// [!] Системная метка0, нельзя удалять
// :name-style
$componentName: 'md3.chip';
// :name-style

// Mixin for generating all classes, states and properties of component
// Миксин для генерации всех классов, состояний и свойств компонента
@include initChipDesign($componentName) {
}
</style>
