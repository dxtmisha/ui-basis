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
    <md2-button :icon="icon" :icon-hide="hide" @click="hide = !hide"/>
    <md2-button :icon="iconToNone" @click="iconToNone = iconToNone?  undefined : 'home'"/>
    <md2-button :icon-trailing="icon" :icon-turn="turn" @click="turn = !turn"/>
    <md2-button icon="face" inscription="text"/>
    <md2-button icon-trailing="close" inscription="text"/>
    <md2-button icon="face" icon-trailing="close" inscription="text"/>
  </div>
  <div style="display: flex; gap: 16px; padding-top: 16px">
    <md2-button
      :icon="{icon: 'https://drscdn.500px.org/photo/1071900499/q%3D80_m%3D2000/v2?sig=b42037ebdec07ea7c5c0a0e8ea7422b942f25b10806885ba31b1c9e2a449d964', onLoad: (value) => console.log(value)}"
    />
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
      icon: ref<string | undefined>('face'),
      iconToNone: ref<string | undefined>('home'),
      hide: ref<boolean>(false),
      turn: ref<boolean>(false)
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
