<template>
  <div>
    <md3-button label="label" icon-trailing="home" @click="onClick"/>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

import Md3Button from '../../md3/Button/Md3Button.vue'

export default defineComponent({
  name: 'HomeView',
  components: {
    Md3Button
  },
  setup () {
    return {
      value: ref<number>(),
      visible: ref(false),
      indeterminate: ref(undefined),
      position: ref(undefined),
      onClick: (event: any, options: any) => {
        console.log('options', options)
      }
    }
  }
})
</script>

<style lang="scss">
</style>
