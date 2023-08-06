<script setup lang="ts">
import { PropertiesMapListType } from '../../classes/DesignProperties'
import { IconDesign } from '../../constructors/Icon/IconDesign'
import { IconEmitsType, IconSlotsType } from '../../constructors/Icon/types'

import { defaults, PropsType, subclasses } from './props'
import * as map from './map.json'

import Md3Image from '../Image/Md3Image.vue'

defineOptions({
  // [!] System label, cannot be deleted
  // [!] Системная метка, нельзя удалять
  // :name-component
  name: 'Md3Icon'
  // :name-component
})

const props = withDefaults(defineProps<PropsType>(), defaults)
const emit = defineEmits<IconEmitsType>()

defineSlots<IconSlotsType>()

// Class for managing component, mainly this is for automatic generation of classes and styles<br>
// Класс для управления компонентом, в основном это для автоматической генерации классов и стилей
const design = new IconDesign(
  // [!] System label, cannot be deleted
  // [!] Системная метка, нельзя удалять
  // :name-class
  'md3-icon',
  // :name-class
  props,
  {
    map: map as PropertiesMapListType,
    subclasses,
    components: {
      image: Md3Image
    }
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
@import "../../constructors/Icon/style";

// [!] System label, cannot be deleted
// [!] Системная метка0, нельзя удалять
// :name-style
$componentName: 'md3.icon';
// :name-style

// Mixin for generating all classes, states and properties of component
// Миксин для генерации всех классов, состояний и свойств компонента
@include initIconDesign($componentName) {
}
</style>
