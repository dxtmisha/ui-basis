<script lang="ts">
import { defineComponent } from 'vue'
import { props, subClasses } from './props'

import { RippleDesign } from '../../constructors/Ripple/RippleDesign'

export default defineComponent({
  name: 'Md2Ripple', // name component
  props,
  setup (props, context) {
    return new RippleDesign<typeof subClasses>(props, context)
      .setup({})
  }
})
</script>

<template>
  <div
    ref="element"
    :class="classes.main"
    @mousedown="onClick"
  />
</template>

<style lang="scss">
@import "../../styles/properties";

@include initDesign {

}
</style>
