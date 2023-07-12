<template>
  <div style="display: flex; gap: 16px;">
    <md2-button
      text="button"
      inscription="text 1"
      value="value"
      @click="(event, options) => console.log(event, options)"
    />
    <md2-button text="button">slot</md2-button>
    <md2-button text="button" inscription="text/">slot</md2-button>
    <md2-button text="button" inscription="disabled" disabled/>
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
    const file = ref()
    const turn = ref()
    const turn2 = ref()
    return {
      file,
      turn,
      turn2,
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      image: require('../assets/02-top.png') as string,
      onInput (event: InputEvent) {
        file.value = (event.target as HTMLInputElement)?.files?.[0]
      }
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
