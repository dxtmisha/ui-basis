<template>
  <div style="display: flex; gap: 16px;">
    <md2-button
      inscription="text 1"
      value="value"
      @click="(event, options) => console.log(event, options)"
    />
    <md2-button>slot</md2-button>
    <md2-button inscription="text/">slot</md2-button>
    <md2-button :inscription="text" @click="text = text ? undefined : 'text'"/>
    <md2-button inscription="disabled" disabled/>
  </div>
  <div style="display: flex; gap: 16px; padding-top: 16px">
    <md2-button :icon="icon" @click="icon = icon === 'face' ? 'close' : 'face'"/>
    <md2-button icon="face" inscription="text"/>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

import Md2Button from '../../md2/Button/Md2Button.vue'
import { ImageIcon } from '../../constructors/Image/ImageIcon'

// eslint-disable-next-line @typescript-eslint/no-var-requires
ImageIcon.add('test', require('../assets/icons/arrow-left.svg'))

export default defineComponent({
  name: 'HomeView',
  components: {
    Md2Button
  },
  setup () {
    return {
      text: ref<string | undefined>('text'),
      icon: ref<string | undefined>('face')
    }
  }
})
</script>

<style lang="scss">
@import "styles/properties";

.is-test {
  position: fixed;

  top: 64px;
  @include left(64px);

  width: 128px;
  height: 128px;

  background-color: red;
}
</style>
