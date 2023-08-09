<script setup lang="ts">
import { PropertiesMapListType } from '../../classes/DesignProperties'
import { MutationItemDesign } from '../../constructors/MutationItem/MutationItemDesign'
import { MutationItemEmitsType/* , MutationItemSlotsType */ } from '../../constructors/MutationItem/types'

import { propsInstruction, subclasses } from './props'
import * as map from './map.json'

defineOptions({
  // [!] System label, cannot be deleted
  // [!] Системная метка, нельзя удалять
  // :name-component
  name: 'Md3MutationItem'
  // :name-component
})

const props = defineProps({ ...propsInstruction })
const emit = defineEmits<MutationItemEmitsType>()

// defineSlots<MutationItemSlotsType>()

// Class for managing component, mainly this is for automatic generation of classes and styles<br>
// Класс для управления компонентом, в основном это для автоматической генерации классов и стилей
const design = new MutationItemDesign(
  // [!] System label, cannot be deleted
  // [!] Системная метка, нельзя удалять
  // :name-class
  'md3-mutation-item',
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
  <render/>
</template>

<style lang="scss">
@import "../../constructors/MutationItem/style";

// [!] System label, cannot be deleted
// [!] Системная метка0, нельзя удалять
// :name-style
$componentName: 'md3.mutation-item';
// :name-style

// Mixin for generating all classes, states and properties of component
// Миксин для генерации всех классов, состояний и свойств компонента
@include initMutationItemDesign($componentName) {
}
</style>
