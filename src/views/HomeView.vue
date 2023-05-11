<template>
  <div class="p-6">
    {{ value }}
    <img alt="image" :src="image"/>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { GeoFlag } from '../../classes/GeoFlag'

export default defineComponent({
  name: 'HomeView',
  components: {},
  setup () {
    const item = new GeoFlag('ru-RU')

    console.log('item', item.getList())
    console.log('item', item.getList(['RU', 'US']))
    console.log('item', GeoFlag.getNational())
    console.log('item', GeoFlag.getNational(['RU', 'US']))

    return {
      value: item.get(),
      image: item.getFlag()
    }
  }
})
</script>

<style/>
