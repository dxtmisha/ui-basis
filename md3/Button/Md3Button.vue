<script setup lang="ts">
import { PropertiesMapListType } from '../../classes/DesignProperties'
import { ButtonDesign } from '../../constructors/Button/ButtonDesign'
import { ButtonEmitsType, ButtonSlotsType } from '../../constructors/Button/types'

import { propsInstruction, subclasses } from './props'
import * as map from './map.json'

import Md3Icon from '../Icon/Md3Icon.vue'
import Md3Progress from '../Progress/Md3Progress.vue'

defineOptions({
  // [!] System label, cannot be deleted
  // [!] Системная метка, нельзя удалять
  // :name-component
  name: 'Md3Button'
  // :name-component
})

const props = defineProps({ ...propsInstruction })
const emit = defineEmits<ButtonEmitsType>()

defineSlots<ButtonSlotsType>()

// Class for managing component, mainly this is for automatic generation of classes and styles<br>
// Класс для управления компонентом, в основном это для автоматической генерации классов и стилей
const design = new ButtonDesign(
  // [!] System label, cannot be deleted
  // [!] Системная метка, нельзя удалять
  // :name-class
  'md3-button',
  // :name-class
  props,
  {
    map: map as PropertiesMapListType,
    subclasses,
    components: {
      icon: Md3Icon,
      progress: Md3Progress
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
@import "../../constructors/Button/style";

// [!] System label, cannot be deleted
// [!] Системная метка0, нельзя удалять
// :name-style
$componentName: 'md3.button';
// :name-style

// Mixin for generating all classes, states and properties of component
// Миксин для генерации всех классов, состояний и свойств компонента
@include initButtonDesign($componentName) {
}
</style>
