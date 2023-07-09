<script setup lang="ts">
import {
  // defineSlots,
  defineOptions
} from 'vue'

import { PropsInterface, defaults, subClasses } from './props'

import { Design } from '../../../classes/Design'

defineOptions({
  name: 'DesignComponent' // name component
})

const props = withDefaults(defineProps<PropsInterface>(), defaults)
const emit = defineEmits([])

// defineSlots()

const design = new Design<typeof subClasses>(props, emit)

const {
  classes,
  styles
} = design.setup({})

// const render = design.render({})
</script>

<template>
  <div :class="classes.main" :style="styles"></div>
</template>

<style lang="scss">
@import "../../../styles/properties";

@include initDesign {

}
</style>
