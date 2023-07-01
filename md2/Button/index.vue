<script lang="ts">
import { defineComponent, ref } from 'vue'
import { props, subClasses } from './props'

import { Design } from '../../classes/Design'

import Md2Ripple from '../Ripple/index.vue'

export default defineComponent({
  name: 'Md2Button',
  components: { Md2Ripple },
  // name component
  props,
  setup (props, context) {
    return new Design<typeof subClasses>(props, context)
      .setup({
        inverse: ref(false)
      })
  }
})
</script>

<template>
  <button
    :class="classes.main"
    :style="styles"
    :disabled="disabled"
    @click="inverse = !inverse"
  >
    <span :class="classes.inscription">{{ text }}</span>
    <md2-ripple :disabled="disabled" :inverse="inverse"/>
  </button>
</template>

<style lang="scss">
@import "../../styles/properties";

@include initDesign {

}
</style>
