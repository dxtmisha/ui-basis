<script setup lang="ts">
import { PropertiesMapListType } from '../../classes/DesignProperties'
import { ImageDesign } from '../../constructors/Image/ImageDesign'
import { ImageEmitsType/* , ImageSlotsType */ } from '../../constructors/Image/types'

import { defaults, PropsType, subclasses } from './props'
import * as map from './map.json'

defineOptions({
  // [!] System label, cannot be deleted
  // [!] Системная метка, нельзя удалять
  // :name-component
  name: 'Md3Image'
  // :name-component
})

const props = withDefaults(defineProps<PropsType>(), defaults)
const emit = defineEmits<ImageEmitsType>()

// defineSlots<ImageSlotsType>()

// Class for managing component, mainly this is for automatic generation of classes and styles<br>
// Класс для управления компонентом, в основном это для автоматической генерации классов и стилей
const design = new ImageDesign(
  // [!] System label, cannot be deleted
  // [!] Системная метка, нельзя удалять
  // :name-class
  'md3-image',
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
@import "../../constructors/Image/style";

// [!] System label, cannot be deleted
// [!] Системная метка0, нельзя удалять
// :name-style
$componentName: 'md3.image';
// :name-style

// Mixin for generating all classes, states and properties of component
// Миксин для генерации всех классов, состояний и свойств компонента
@include initImageDesign($componentName) {
}
</style>
