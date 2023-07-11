<script setup lang="ts">
import { defineOptions } from 'vue'

import { defaults, subClasses } from './props'

import { RippleDesign } from '../../constructors/Ripple/RippleDesign'
import { PropsRippleInterface } from '../../constructors/Ripple/props'

defineOptions({
  name: 'Md2Ripple' // name component
})

const props = withDefaults(defineProps<PropsRippleInterface>(), defaults)

const render = new RippleDesign<typeof subClasses>(props)
  .render({})
</script>

<template>
  <render/>
</template>

<style lang="scss">
@import "../../constructors/Ripple/style";

@include initRippleDesign {

}
</style>
