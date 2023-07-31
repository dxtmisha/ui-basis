<template>
  <div>
    <div>
      <div></div>
      <div>
        <md3-button label="Label"/>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import Md3Button from '../../md3/Button/Md3Button.vue'

export default defineComponent({
  name: 'HomeView',
  components: { Md3Button },
  setup () {
    return {}
  }
})
</script>

<style lang="scss">
</style>
