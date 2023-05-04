<template>
  <div class="p-6">
    {{ value }}
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Cookie } from '../../classes/Cookie'

export default defineComponent({
  name: 'HomeView',
  components: {},
  setup () {
    const item = new Cookie('test')

    console.log('item', item.getStatic())

    item.set('value1')

    setTimeout(() => item.set('value2'), 4000)

    return {
      value: item.get()
    }
  }
})
</script>

<style/>
