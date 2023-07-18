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
    <md2-button inscription="dragged" dragged/>
  </div>
  <div style="display: flex; gap: 16px; padding-top: 16px">
    <md2-button
      outlined
      inscription="text 1"
      value="value"
      @click="(event, options) => console.log(event, options)"
    />
    <md2-button outlined>slot</md2-button>
    <md2-button outlined inscription="text/">slot</md2-button>
    <md2-button outlined :inscription="text" @click="text = text ? undefined : 'text'"/>
    <md2-button outlined inscription="disabled" disabled/>
    <md2-button outlined inscription="dragged" dragged/>
  </div>
  <div style="display: flex; gap: 16px; padding-top: 16px">
    <md2-button
      text
      inscription="text 1"
      value="value"
      @click="(event, options) => console.log(event, options)"
    />
    <md2-button text>slot</md2-button>
    <md2-button text inscription="text/">slot</md2-button>
    <md2-button text :inscription="text" @click="text = text ? undefined : 'text'"/>
    <md2-button text inscription="disabled" disabled/>
    <md2-button text inscription="dragged" dragged/>
  </div>
  <div style="display: flex; gap: 16px; padding-top: 16px">
    <md2-button :icon="icon" @click="icon = icon === 'face' ? 'close' : 'face'"/>
    <md2-button :icon="icon" :icon-hide="hide" @click="hide = !hide"/>
    <md2-button :icon="iconToNone" @click="iconToNone = iconToNone?  undefined : 'home'"/>
    <md2-button :icon-trailing="icon" :icon-turn="turn" @click="turn = !turn"/>
    <md2-button icon="face" inscription="text"/>
    <md2-button icon-trailing="close" inscription="text"/>
    <md2-button icon="face" icon-trailing="close" inscription="text"/>
    <md2-button icon="face" icon-trailing="close"/>
  </div>
  <div style="display: flex; gap: 16px; padding-top: 16px">
    <md2-button
      :icon="{icon: {value:'https://drscdn.500px.org/photo/1071900499/q%3D80_m%3D2000/v2?sig=b42037ebdec07ea7c5c0a0e8ea7422b942f25b10806885ba31b1c9e2a449d964', size: 'cover'}, onLoad: (value) => console.log(value)}"
      @click="progress = !progress"
    />
    <md2-button :progress="progress" icon="face" icon-trailing="home" inscription="inscription"
                @click="progress = !progress"/>
  </div>
  <div style="display: flex; gap: 16px; padding-top: 16px">
    <md2-button icon="face" icon-trailing="close" inscription="text" height="sm"/>
    <md2-button icon="face" icon-trailing="close" inscription="text" height="md"/>
    <md2-button icon="face" icon-trailing="close" inscription="text" height="lg"/>
  </div>
  <div style="display: flex; gap: 16px; padding-top: 16px">
    <md2-button inscription="text" height="sm"/>
    <md2-button inscription="text" height="md"/>
    <md2-button inscription="text" height="lg"/>
  </div>
  <div style="display: flex; gap: 16px; padding-top: 16px">
    <md2-button inscription="text" icon="home"/>
    <md2-button inscription="text" icon="home" outlined/>
    <md2-button inscription="text" icon="home" text/>
    <md2-button inscription="text a" icon="home" tag="a"/>
    <md2-button inscription="text a" icon="home" outlined tag="a"/>
    <md2-button inscription="text a" icon="home" text tag="a"/>
  </div>
  <div style="display: flex; gap: 16px; padding-top: 16px">
    <md2-button inscription="text" icon="home" palette="deep-orange"/>
    <md2-button inscription="text" icon="home" palette="deep-orange" outlined/>
    <md2-button inscription="text" icon="home" palette="deep-orange" text/>
  </div>
  <div style="display: flex; gap: 16px; padding-top: 16px">
    <md2-button inscription="selected" icon="home" palette="deep-orange" :selected="selected"
                @click="selected=!selected"/>
    <md2-button inscription="selected" icon="home" palette="deep-orange" :selected="selected" outlined/>
    <md2-button inscription="selected" icon="home" palette="deep-orange" :selected="selected" text/>
    <md2-button inscription="selected" icon="home" palette="deep-orange"/>
    <md2-button inscription="selected" icon="home" palette="deep-orange" outlined/>
    <md2-button inscription="selected" icon="home" palette="deep-orange" text/>
  </div>
  <div style="display: flex; gap: 16px; padding-top: 16px">
    <md2-button inscription="selected" :icon="{icon:'home',iconActive:'face'}" :selected="selected"/>
    <md2-button inscription="selected" icon="home" :selected="selected" outlined/>
    <md2-button inscription="selected" icon="home" :selected="selected" text/>
    <md2-button inscription="selected" icon="home"/>
    <md2-button inscription="selected" icon="home" outlined/>
    <md2-button inscription="selected" icon="home" text/>
  </div>
  <div style="display: flex; gap: 16px; padding-top: 16px">
    <md2-button inscription="text" icon="home" palette="brown"/>
    <md2-button inscription="text" icon="home" palette="brown" outlined/>
    <md2-button inscription="text" icon="home" palette="brown" text/>
  </div>
  <div style="display: flex; gap: 16px; padding-top: 16px">
    <md2-button inscription="text" icon="home" palette="deep-orange" disabled/>
    <md2-button inscription="text" icon="home" palette="deep-orange" disabled outlined/>
    <md2-button inscription="text" icon="home" palette="deep-orange" disabled text/>
  </div>
  <div style="display: flex; gap: 16px; padding-top: 16px">
    <md2-button inscription="text" icon="home" palette="deep-orange" adaptive="sm"/>
    <md2-button inscription="text" icon="home" palette="deep-orange" adaptive="md"/>
    <md2-button inscription="text" icon="home" palette="deep-orange" adaptive="lg"/>
  </div>
  <div style="display: flex; gap: 16px; padding-top: 16px">
    <md2-button icon="home" rounded="sm"/>
    <md2-button icon="home" rounded="md"/>
    <md2-button icon="home" rounded="lg"/>
    <md2-button icon="home" rounded="full"/>
    <md2-button inscription="sm" icon="home" rounded="sm"/>
    <md2-button inscription="md" icon="home" rounded="md"/>
    <md2-button inscription="lg" icon="home" rounded="lg"/>
    <md2-button inscription="full" icon="home" rounded="full"/>
    <md2-button inscription="sm" rounded="sm"/>
    <md2-button inscription="md" rounded="md"/>
    <md2-button inscription="lg" rounded="lg"/>
    <md2-button inscription="full" rounded="full"/>
  </div>
  <div style="display: flex; gap: 16px; padding-top: 16px">
    <md2-button text icon="home" rounded="sm"/>
    <md2-button text icon="home" rounded="md"/>
    <md2-button text icon="home" rounded="lg"/>
    <md2-button text icon="home" rounded="full"/>
    <md2-button text inscription="sm" icon="home" rounded="sm"/>
    <md2-button text inscription="md" icon="home" rounded="md"/>
    <md2-button text inscription="lg" icon="home" rounded="lg"/>
    <md2-button text inscription="full" icon="home" rounded="full"/>
    <md2-button text inscription="sm" rounded="sm"/>
    <md2-button text inscription="md" rounded="md"/>
    <md2-button text inscription="lg" rounded="lg"/>
    <md2-button text inscription="full" rounded="full"/>
  </div>
  <md2-mutation/>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

import Md2Button from '../../md2/Button/Md2Button.vue'
import { ImageIcon } from '../../constructors/Image/ImageIcon'
import Md2Mutation from '../../md2/Mutation/Md2Mutation.vue'

// eslint-disable-next-line @typescript-eslint/no-var-requires
ImageIcon.add('test', require('../assets/icons/arrow-left.svg'))

export default defineComponent({
  name: 'HomeView',
  components: {
    Md2Mutation,
    Md2Button
  },
  setup () {
    return {
      text: ref<string | undefined>('text'),
      icon: ref<string | undefined>('face'),
      iconToNone: ref<string | undefined>('home'),
      hide: ref<boolean>(false),
      turn: ref<boolean>(false),
      selected: ref<boolean>(false),
      progress: ref<boolean>(false)
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
