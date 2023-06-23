<script lang="ts">
import { defineComponent } from 'vue'

import { props } from './props'
// TODO: В разработке
// import { subClasses } from './props.design'

import { Design } from '../../../classes/Design'

export default defineComponent({
  name: 'DesignComponent', // name component
  props,
  setup (props, context) {
    return new Design(props, context).setup({})
  }
})
</script>

<template>
  <div :class="classes.main"></div>
</template>

<style lang="scss">
@import "../../../styles/properties";

@include initDesign {

}
</style>
