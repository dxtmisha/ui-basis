<script setup lang="ts">
import { defineOptions } from 'vue'

import { PropsInterface, defaults, subClasses } from './props'

import { ImageDesign, ImageDesignEmitsType } from '../../constructors/Image/ImageDesign'

defineOptions({
  name: 'Md2Image' // name component
})

const props = withDefaults(defineProps<PropsInterface>(), defaults)
const emit = defineEmits<ImageDesignEmitsType>()

const design = new ImageDesign<typeof subClasses>(props, emit)
const render = design.render({})
</script>

<template>
  <render/>
</template>

<style lang="scss">
@import "../../constructors/Image/style";

@include initImageDesign {

}
</style>
