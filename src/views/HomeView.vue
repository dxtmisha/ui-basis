<template>
  <div class="p-6">
    {{ value }}
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { GeoPhone } from '../../classes/GeoPhone'

export default defineComponent({
  name: 'HomeView',
  components: {},
  setup () {
    const item = new GeoPhone('ru-RU')

    item.set('+79023343333')
    console.log('getItemByPhone', GeoPhone.getItemByPhone('+123456789'))
    console.log('getObjectByPhone', GeoPhone.getObjectByPhone('+79023343333').toMask().value)

    console.log('item', item.getInfo().value)
    console.log('item', item.getMask().value)
    console.log('item', item.toMask().value)

    return {
      value: item.getInfo()
    }
  }
})
</script>

<style/>
