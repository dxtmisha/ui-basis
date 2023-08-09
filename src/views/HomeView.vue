<template>
  <div>
    <md3-mutation/>
    <md3-button label="label" icon-trailing="home" @click="onClick"/>
  </div>
  <div style="padding-top: 24px;">
    <span data-md3="button" data-label="Label" data-icon="home"/>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

import Md3Button from '../../md3/Button/Md3Button.vue'
import Md3Mutation from '../../md3/Mutation/Md3Mutation.vue'

export default defineComponent({
  name: 'HomeView',
  components: {
    Md3Mutation,
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
