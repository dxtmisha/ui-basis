<script lang="ts">
import { defineComponent } from 'vue'

/* :basic.once */
import { Design } from '../../../classes/Design'
/* :basic.once.end */
// :constructor.once import { ConstructorDesign } from '../../../constructors/Constructor/ConstructorDesign'

import { props, subClasses } from './props'

export default defineComponent({
  // [!] System label, cannot be deleted
  // [!] Системная метка, нельзя удалять
  // :name
  name: 'DesignComponent',
  // :name
  props,
  setup (props, context) {
    // Class for managing component, mainly this is for automatic generation of classes and styles
    // Класс для управления компонентом, в основном это для автоматической генерации классов и стилей
    return new /* :constructor.once Constructor */Design<typeof subClasses>(props, context)
      .setup({})
  }
})
</script>

<template>
  <div :class="classes.main" :style="styles"></div>
</template>

<style lang="scss">
// :basic.once @import "../../../styles/properties";
// :constructor.once @import "../../../constructors/Constructor/style";

// Mixin for generating all classes, states and properties of component
// Миксин для генерации всех классов, состояний и свойств компонента
// :basic.once @include initDesign {}
// :constructor.once @include initConstructorDesign {}
</style>
