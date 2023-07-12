<script setup lang="ts">
import {
  defineSlots,
  defineOptions
} from 'vue'

import { PropsInterface, defaults, subClasses } from './props'

import { ButtonDesign } from '../../constructors/Button/ButtonDesign'
import { ButtonDesignEmitsType, ButtonDesignSlotsType } from '../../constructors/Button/types'

import Md2Ripple from '../Ripple/Md2Ripple.vue'

defineOptions({
  name: 'Md2Button' // name component
})

const props = withDefaults(defineProps<PropsInterface>(), defaults)
const emit = defineEmits<ButtonDesignEmitsType>()

defineSlots<ButtonDesignSlotsType>()

const design = new ButtonDesign<typeof subClasses>(props, emit)
  .setComponents({
    ripple: Md2Ripple
  })

const render = design.render({})
</script>

<template>
  <render>
    <slot/>
  </render>
</template>

<style lang="scss">
@import "../../constructors/Button/style";

@include initButtonDesign {

}
</style>
