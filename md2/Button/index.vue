<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Md2Button',
  props: {},
  setup () {
    // TODO: Close
  }
})
</script>

<template>
  <div></div>
</template>

<style lang="scss">
@import "../../constructors/Button/style";

@include initButtonDesign('md2.button') {

}
</style>
