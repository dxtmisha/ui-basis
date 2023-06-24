<script lang="ts">
import { defineComponent } from 'vue'

import { props, subClasses } from './props'

import { Design } from '../../classes/Design'

export default defineComponent({
  name: 'Md2Button', // name component
  props,
  setup (props, context) {
    return new Design<typeof subClasses>(props, context)
      .setup({})
  }
})
</script>

<template>
  <div :class="classes.main">
    <div :class="classes.text"/>
  </div>
</template>

<style lang="scss">
@import "../../styles/properties";

@include initDesign {

}
</style>
