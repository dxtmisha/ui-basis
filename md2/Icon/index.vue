<script lang="ts">
import { defineComponent } from 'vue'
import { props, subClasses } from './props'

import { IconDesign } from '../../constructors/Icon/IconDesign'

export default defineComponent({
  name: 'Md2Icon', // name component
  props,
  setup (props, context) {
    return new IconDesign<typeof subClasses>(props, context)
      .setup({})
  }
})
</script>

<template>
  <div :class="classes.main" :style="styles"></div>
</template>

<style lang="scss">
@import "../../constructors/Icon/style";

@include initIconDesign {

}
</style>
