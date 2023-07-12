<script setup lang="ts">
import {
  defineSlots,
  defineOptions
} from 'vue'

import { PropsInterface, defaults, subClasses } from './props'

import { IconDesign, IconDesignEmitsType, IconDesignSlotsType } from '../../constructors/Icon/IconDesign'

import Md2Image from '../Image/Md2Image.vue'

defineOptions({
  name: 'Md2Icon' // name component
})

const props = withDefaults(defineProps<PropsInterface>(), defaults)
const emit = defineEmits<IconDesignEmitsType>()

defineSlots<IconDesignSlotsType>()

const design = new IconDesign<typeof subClasses>(props, emit)
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
