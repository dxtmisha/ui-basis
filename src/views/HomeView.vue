<template>
  <div class="p-6">
    <md2-button/>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import Md2Button from '../../md2/Button/component.vue'

export default defineComponent({
  name: 'HomeView',
  components: { Md2Button },
  setup () {
    return {}
  }
})
</script>

<style/>
