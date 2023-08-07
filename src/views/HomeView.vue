<template>
  <div>
    <md3-icon
      icon="https://drscdn.500px.org/photo/294267357/q%3D80_m%3D2000/v2?sig=03989c1970e5921d8ab67b23e03e79b8db13b7e7d3bc3f72829cc9eecbb42cf4"
      @load="args => console.log('args', args)"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

import Md3Icon from '../../md3/Icon/Md3Icon.vue'

export default defineComponent({
  name: 'HomeView',
  components: {
    Md3Icon
  },
  setup () {
    return {
      value: ref<number>(),
      visible: ref(false),
      indeterminate: ref(undefined),
      position: ref(undefined)
    }
  }
})
</script>

<style lang="scss">
</style>
