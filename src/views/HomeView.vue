<template>
  <div class="p-6">
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { ElementItem } from '../../classes/ElementItem'

export default defineComponent({
  name: 'HomeView',
  components: {},
  setup () {
    console.log('1', new ElementItem().get())
    console.log('2', new ElementItem('#app').get())
    console.log('3', new ElementItem(document.querySelector('#app')).get())
    console.log('4', new ElementItem(ref('#app')).get())
    console.log('5', new ElementItem(ref(document.querySelector('#app'))).get())

    return {}
  }
})
</script>

<style/>
