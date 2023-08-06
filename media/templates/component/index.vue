<script setup lang="ts">
/* :basic.once */
import { PropertiesMapListType } from '../../../classes/DesignProperties'
import { Design } from '../../../classes/Design'
/* :basic.once.end */
// :constructor.once import { PropertiesMapListType } from '../../../classes/DesignProperties'
// :constructor.once import { ConstructorDesign } from '../../../constructors/Constructor/ConstructorDesign'
// :constructor.once import { /* ConstructorEmitsType, */ConstructorSlotsType } from '../../../constructors/Constructor/types'

import { propsInstruction, subclasses } from './props'
import * as map from './map.json'

defineOptions({
  // [!] System label, cannot be deleted
  // [!] Системная метка, нельзя удалять
  // :name-component
  name: 'DesignComponent'
  // :name-component
})

const props = defineProps({ ...propsInstruction })
// const emit = defineEmits/* :constructor.once <ConstructorEmitsType> */(/* :basic.once */[]/* :basic.once.end */)

defineSlots/* :constructor.once <ConstructorSlotsType> */()

// Class for managing component, mainly this is for automatic generation of classes and styles<br>
// Класс для управления компонентом, в основном это для автоматической генерации классов и стилей
const design = new /* :constructor.once Constructor */Design(
  // [!] System label, cannot be deleted
  // [!] Системная метка, нельзя удалять
  // :name-class
  'design-component',
  // :name-class
  props,
  /* :basic.once */map as PropertiesMapListType, /* :basic.once.end */
  {
    /* :constructor.once map: map as PropertiesMapListType, */
    subclasses
  }/* :constructor.once //, emit */
)

/* :basic.once */
const classes = design.getClasses()
const styles = design.getClasses()
/* :basic.once.end */
// :constructor.once const render = design.render()
</script>

<template>
  <!-- :basic.once -->
  <div :class="classes.main" :style="styles"></div>
  <!-- :basic.once.end -->
  <!-- :constructor.once <render/> -->

</template>

<style lang="scss">
// :basic.once @import "../../../styles/properties";
// :constructor.once @import "../../../constructors/Constructor/style";

// [!] System label, cannot be deleted
// [!] Системная метка0, нельзя удалять
// :name-style
$componentName: 'design.component';
// :name-style

// Mixin for generating all classes, states and properties of component
// Миксин для генерации всех классов, состояний и свойств компонента
// :basic.once @include initDesign($componentName) {}
// :constructor.once @include initConstructorDesign($componentName) {}
</style>
