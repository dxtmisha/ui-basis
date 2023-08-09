<script setup lang="ts">
import { PropertiesMapListType } from '../../classes/DesignProperties'
import { MutationDesign } from '../../constructors/Mutation/MutationDesign'
import { MutationEmitsType/* , MutationSlotsType */ } from '../../constructors/Mutation/types'

import { /* propsInstruction, */ subclasses } from './props'
import * as map from './map.json'

import Md3MutationItem from '../MutationItem/Md3MutationItem.vue'

defineOptions({
  // [!] System label, cannot be deleted
  // [!] Системная метка, нельзя удалять
  // :name-component
  name: 'Md3Mutation'
  // :name-component
})

// const props = defineProps({ ...propsInstruction })
const emit = defineEmits<MutationEmitsType>()

// defineSlots<MutationSlotsType>()

// Class for managing component, mainly this is for automatic generation of classes and styles<br>
// Класс для управления компонентом, в основном это для автоматической генерации классов и стилей
const design = new MutationDesign(
  // [!] System label, cannot be deleted
  // [!] Системная метка, нельзя удалять
  // :name-class
  'md3-mutation',
  // :name-class
  undefined,
  {
    map: map as PropertiesMapListType,
    subclasses,
    components: {
      mutationItem: Md3MutationItem
    }
  },
  emit
)

const render = design.render()
</script>

<template>
  <render/>
</template>

<style lang="scss">
@import "../../constructors/Mutation/style";

// [!] System label, cannot be deleted
// [!] Системная метка0, нельзя удалять
// :name-style
$componentName: 'md3.mutation';
// :name-style

// Mixin for generating all classes, states and properties of component
// Миксин для генерации всех классов, состояний и свойств компонента
@include initMutationDesign($componentName) {
}
</style>
