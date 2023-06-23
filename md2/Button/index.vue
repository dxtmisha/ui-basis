<script lang="ts">
import { defineComponent } from 'vue'

import { props } from './props'
// TODO: В разработке
// import { subClasses } from './props.design'

import { Design } from '../../classes/Design'

export default defineComponent({
  name: 'Md2Button', // name component
  props,
  setup (props, context) {
    return new Design(props, context).setup({})
  }
})
</script>

<template>
  <button :class="classes.main">test</button>
</template>

<style lang="scss">
@import "../../styles/properties";

@include initDesign {

}
</style>
