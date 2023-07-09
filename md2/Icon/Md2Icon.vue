<script setup lang="ts">
import {
  defineSlots,
  defineOptions
} from 'vue'

import { propsType, pTest, subClasses } from './props'

import { IconDesign, IconDesignSlotsType } from '../../constructors/Icon/IconDesign'

import Md2Image from '../Image/Md2Image.vue'

defineOptions({
  name: 'Md2Icon' // name component,
})

const props = defineProps<pTest>()

defineSlots<IconDesignSlotsType>()

const design = new IconDesign<typeof subClasses>(props)
  .setComponents({
    image: Md2Image
  })

const render = design.render({})
</script>

<template>
  <render>
    <slot/>
  </render>
</template>

<style lang="scss">
@import "../../constructors/Icon/style";

@include initIconDesign {

}
</style>
