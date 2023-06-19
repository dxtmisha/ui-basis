<template>
  <div class="p-6">
    <md2-button/>
  </div>
  <div class="p-6">
    <div
      v-if="isDom"
      ref="div"
      :style="{width:`${width}px`}"
      class="h-8 bg-amber-600"
    />
    <button ref="button" @click="onClick">test1</button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { EventResize } from '../../classes/EventResize'
import Md2Button from '../../md2/Button/component.vue'

export default defineComponent({
  name: 'HomeView',
  components: { Md2Button },
  setup () {
    const div = ref()

    const isDom = ref(true)
    const width = ref(100)

    const event = new EventResize(div, () => {
      console.log('event')
    })

    event.go()

    setTimeout(() => {
      isDom.value = false
    }, 15000)

    return {
      div,

      isDom,
      width,

      onClick () {
        width.value += 100
      }
    }
  }
})
</script>

<style/>
