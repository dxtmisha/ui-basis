<template>
  <div class="p-6 flex flex-wrap gap-4 items-center">
    <md2-button/>
    <md2-button contained/>
    <md2-button height="lg" contained/>
    <md2-button height="xl" contained/>
    <md2-button/>
    <md2-button outlined/>
    <md2-button contained disabled/>
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
