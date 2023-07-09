<script setup lang="ts">
import { defineOptions } from 'vue'

import { propsType, subClasses } from './props'

import { RippleDesign } from '../../constructors/Ripple/RippleDesign'

defineOptions({
  name: 'Md2Ripple' // name component
})

const props = defineProps<propsType>()

const design = new RippleDesign<typeof subClasses>(props)
const render = design.render({})
</script>

<template>
  <render/>
</template>

<style lang="scss">
@import "../../constructors/Ripple/style";

@include initRippleDesign {

}
</style>
