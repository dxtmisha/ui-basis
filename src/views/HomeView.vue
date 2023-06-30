<template>
  <div style="display: flex;gap: 16px;">
    <md2-button text="button"/>
    <md2-button text="button" disabled/>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import Md2Button from '../../md2/Button/index.vue'

export default defineComponent({
  name: 'HomeView',
  components: { Md2Button },
  setup () {
    return {}
  }
})
</script>

<style/>
