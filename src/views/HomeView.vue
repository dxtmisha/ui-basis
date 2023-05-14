<template>
  <div class="p-6">
    <button v-if="edit" ref="button">test1</button>
    <button v-else ref="button">test2</button>
    <div v-if="isDom" ref="dom"/>
    {{ dom }}
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { EventItem } from '../../classes/EventItem'

export default defineComponent({
  name: 'HomeView',
  components: {},
  setup () {
    const edit = ref(false)
    const isDom = ref(true)
    const button = ref()
    const dom = ref()

    const item = new EventItem(button, (event) => {
      console.log(event)

      edit.value = !edit.value
    })

    item.setDom(dom)
    item.setDetail({
      a: 1,
      b: 2
    })
    item.go()

    setTimeout(() => {
      console.log('stop')
      isDom.value = false
    }, 5000)

    setTimeout(() => {
      console.log('dispatch')
      item.dispatch({
        c: 3
      })
    }, 1000)

    return {
      edit,
      isDom,

      button,
      dom
    }
  }
})
</script>

<style/>
