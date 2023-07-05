<script lang="ts">
import { defineComponent } from 'vue'
import { props, subClasses } from './props'

import { ImageDesign } from '../../constructors/Image/ImageDesign'

export default defineComponent({
  name: 'Md2Image', // name component
  props,
  setup (props, context) {
    return new ImageDesign<typeof subClasses>(props, context)
      .setup({})
  }
})
</script>

<template>
  <div :class="classes.main" :style="styles"></div>
</template>

<style lang="scss">
@import "../../constructors/Image/style";

@include initImageDesign {

}
</style>
