<template>
  <div style="display: flex; gap: 16px;">
    <md2-button text="button"/>
    <md2-button text="button" disabled/>
  </div>
  <div style="display: flex; gap: 16px; padding-top: 24px;">
    <md2-image/>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import Md2Button from '../../md2/Button/index.vue'
import Md2Image from '../../md2/Image/index.vue'

export default defineComponent({
  name: 'HomeView',
  components: {
    Md2Button,
    Md2Image
  },
  setup () {
    return {}
  }
})
</script>

<style/>
