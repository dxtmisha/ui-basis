<script setup lang="ts">
import { defineOptions } from 'vue'

import { PropsInterface, defaults, subClasses } from './props'

import { ProgressDesign } from '../../constructors/Progress/ProgressDesign'

defineOptions({
  name: 'Md2Progress' // name component
})

const props = withDefaults(defineProps<PropsInterface>(), defaults)

const design = new ProgressDesign<typeof subClasses>(props)
const render = design.render({})
</script>

<template>
  <render/>
</template>

<style lang="scss">
@import "../../constructors/Progress/style";

@include initProgressDesign {

}
</style>
