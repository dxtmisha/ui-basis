<script setup lang="ts">
import { defineOptions } from 'vue'

import { props as propsImport, subClasses } from './props'

import { ImageDesign } from '../../constructors/Image/ImageDesign'

defineOptions({
  name: 'Md2Image' // name component
})

const props = defineProps(propsImport)

const design = new ImageDesign<typeof subClasses>(props as typeof propsImport)
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
