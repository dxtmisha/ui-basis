<template>
  <div style="display: flex; gap: 16px;">
    <md2-button text="button"/>
    <md2-button text="button" disabled/>
  </div>
  <div style="display: flex; gap: 16px; padding-top: 16px;">
    <md2-icon style="border: solid 1px;"/>
    <md2-icon
      :animation-show="turn"
      style="border: solid 1px;"
      :icon="'https://drscdn.500px.org/photo/1071692936/q%3D80_m%3D2000/v2?sig=b5cd016eee9a7eb4bd875d172c201e4e08097cdceac45d4fafaa070d0074e3db'"
      :icon-active="turn?'https://drscdn.500px.org/photo/1071692936/q%3D80_m%3D2000/v2?sig=b5cd016eee9a7eb4bd875d172c201e4e08097cdceac45d4fafaa070d0074e3db':undefined"
    />
    <md2-test :height="'custom'"/>
  </div>
  <div style="display: flex; gap: 16px; padding-top: 24px;">
    <div style="position: relative; width: 160px; height: 160px;">
      <md2-image :value="'close'"/>
    </div>
    <div style="position: relative; width: 160px; height: 160px;">
      <md2-image :value="'close'" disabled/>
    </div>
    <div style="position: relative; width: 160px; height: 160px;">
      <md2-image :value="'la-close'"/>
    </div>
    <div style="position: relative; width: 160px; height: 160px;">
      <md2-image :value="'@test'"/>
    </div>
    <div style="position: relative; width: 160px; height: 160px;">
      <md2-image
        :value="image"
        adaptive
        group="g1"
        :object-width="400"
      />
    </div>
    <div style="position: relative; width: 160px; height: 160px;">
      <md2-image
        :value="image"
        adaptive
        group="g1"
        :object-width="600"
      />
    </div>
    <div style="position: relative; width: 160px; height: 160px;">
      <md2-image
        style="border:black solid 1px;"
        :disabled="turn"
        :value="'https://drscdn.500px.org/photo/1071692936/q%3D80_m%3D2000/v2?sig=b5cd016eee9a7eb4bd875d172c201e4e08097cdceac45d4fafaa070d0074e3db'"
        @click="turn=!turn"
      />
    </div>
  </div>
  <div>
    <div style="position: relative; width: 160px; height: 160px;">
      <md2-image :value="file"/>
    </div>
    <div>
      <input type="file" @input="onInput">
    </div>
  </div>
  <div>
    <div style="position: relative; width: 160px; height: 160px;">
      <md2-image
        :value="image"
        adaptive
        :object-width="200"
      />
    </div>
  </div>
  <div style="display: flex; gap: 16px; padding-top: 24px;">
    <div style="position: relative; width: 160px; height: 160px;">
      <md2-image
        style="border:black solid 1px;"
        :coordinator="[25]"
        :turn="turn"
        :value="'https://drscdn.500px.org/photo/1071692936/q%3D80_m%3D2000/v2?sig=b5cd016eee9a7eb4bd875d172c201e4e08097cdceac45d4fafaa070d0074e3db'"
        @click="turn=!turn"
      />
    </div>
    <div style="position: relative; width: 160px; height: 160px;">
      <md2-image
        style="border:black solid 1px;"
        :coordinator="[25, 10]"
        :turn="turn"
        :value="'https://drscdn.500px.org/photo/1071692936/q%3D80_m%3D2000/v2?sig=b5cd016eee9a7eb4bd875d172c201e4e08097cdceac45d4fafaa070d0074e3db'"
        @click="turn=!turn"
      />
    </div>
    <div style="position: relative; width: 160px; height: 160px;">
      <md2-image
        style="border:black solid 1px;"
        :coordinator="[25, 10, 10]"
        :hide="turn"
        :value="'https://drscdn.500px.org/photo/1071692936/q%3D80_m%3D2000/v2?sig=b5cd016eee9a7eb4bd875d172c201e4e08097cdceac45d4fafaa070d0074e3db'"
        @click="turn=!turn"
      />
    </div>
    <div style="position: relative; width: 160px; height: 160px;">
      <md2-image
        style="border:black solid 1px;"
        :coordinator="[50, 0, 0, 50]"
        :disabled="turn"
        :value="'https://drscdn.500px.org/photo/1071692936/q%3D80_m%3D2000/v2?sig=b5cd016eee9a7eb4bd875d172c201e4e08097cdceac45d4fafaa070d0074e3db'"
        @click="turn=!turn"
      />
    </div>
  </div>
  <div style="display: flex; gap: 16px; padding-top: 24px;">
    <div style="position: relative; width: 160px; height: 160px;">
      <md2-image
        style="border:black solid 1px;"
        :size="'cover'"
        :turn="turn"
        :value="'https://drscdn.500px.org/photo/1071692936/q%3D80_m%3D2000/v2?sig=b5cd016eee9a7eb4bd875d172c201e4e08097cdceac45d4fafaa070d0074e3db'"
        @click="turn=!turn"
      />
    </div>
    <div style="position: relative; width: 160px; height: 160px;">
      <md2-image
        style="border:black solid 1px;"
        :size="'contain'"
        :turn="turn"
        :value="'https://drscdn.500px.org/photo/1071692936/q%3D80_m%3D2000/v2?sig=b5cd016eee9a7eb4bd875d172c201e4e08097cdceac45d4fafaa070d0074e3db'"
        @click="turn=!turn"
      />
    </div>
    <div style="position: relative; width: 160px; height: 160px;">
      <md2-image
        style="border:black solid 1px;"
        :size="'auto'"
        :hide="turn"
        :value="'https://drscdn.500px.org/photo/1071692936/q%3D80_m%3D2000/v2?sig=b5cd016eee9a7eb4bd875d172c201e4e08097cdceac45d4fafaa070d0074e3db'"
        @click="turn=!turn"
      />
    </div>
    <div style="position: relative; width: 160px; height: 160px;">
      <md2-image
        style="border:black solid 1px;"
        :size="'50%'"
        :disabled="turn"
        :value="'https://drscdn.500px.org/photo/1071692936/q%3D80_m%3D2000/v2?sig=b5cd016eee9a7eb4bd875d172c201e4e08097cdceac45d4fafaa070d0074e3db'"
        @click="turn=!turn"
      />
    </div>
  </div>
  <div style="display: flex; gap: 16px; padding-top: 24px;">
    <div style="position: relative; width: 160px; height: 160px;">
      <md2-image
        style="border:black solid 1px;"
        :x="'50%'"
        :turn="turn"
        :value="'https://drscdn.500px.org/photo/1071692936/q%3D80_m%3D2000/v2?sig=b5cd016eee9a7eb4bd875d172c201e4e08097cdceac45d4fafaa070d0074e3db'"
        @click="turn=!turn"
      />
    </div>
    <div style="position: relative; width: 160px; height: 160px;">
      <md2-image
        style="border:black solid 1px;"
        :x="'25%'"
        :y="'25%'"
        :turn="turn"
        :value="'https://drscdn.500px.org/photo/1071692936/q%3D80_m%3D2000/v2?sig=b5cd016eee9a7eb4bd875d172c201e4e08097cdceac45d4fafaa070d0074e3db'"
        @click="turn=!turn"
      />
    </div>
    <div style="position: relative; width: 160px; height: 160px;">
      <md2-image
        style="border:black solid 1px;"
        :y="'50%'"
        :hide="turn"
        :value="'https://drscdn.500px.org/photo/1071692936/q%3D80_m%3D2000/v2?sig=b5cd016eee9a7eb4bd875d172c201e4e08097cdceac45d4fafaa070d0074e3db'"
        @click="turn=!turn"
      />
    </div>
  </div>
  <div style="height: 1200px"></div>
  <div>
    <div style="position: relative; width: 160px; height: 160px;">
      <md2-image
        :value="image"
        adaptive
        adaptive-always
        :object-width="800"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

import Md2Button from '../../md2/Button/index.vue'
import Md2Image from '../../md2/Image/Md2Image.vue'
import { ImageIcon } from '../../constructors/Image/ImageIcon'
import Md2Icon from '../../md2/Icon/Md2Icon.vue'
import Md2Test from '../../md2/Test/Md2Test.vue'

// eslint-disable-next-line @typescript-eslint/no-var-requires
ImageIcon.add('test', require('../assets/icons/arrow-left.svg'))

export default defineComponent({
  name: 'HomeView',
  components: {
    Md2Test,
    Md2Icon,
    Md2Button,
    Md2Image
  },
  setup () {
    const file = ref()
    const turn = ref()
    return {
      file,
      turn,
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      image: require('../assets/02-top.png') as string,
      onInput (event: InputEvent) {
        file.value = (event.target as HTMLInputElement)?.files?.[0]
      }
    }
  }
})
</script>

<style/>
