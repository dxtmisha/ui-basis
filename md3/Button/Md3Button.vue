<script setup lang="ts">
import { Design } from '../../classes/Design'
import { defaults, PropsType } from '../../--md3/Button/props'
import properties from '../../cache/md3-button/property.json'

const props = withDefaults(defineProps<PropsType>(), defaults)
const design = new Design(
  'md3-button',
  props,
  Object.values(properties.properties),
  {
    label: 'label',
    icon: 'icon',
    trailing: 'trailing'
  }
)
const classes = design.getClass()
</script>

<template>
  <div :class="classes">test</div>
</template>

<style lang="scss">
@import "../../styles/properties";

@include initDesign;
</style>
