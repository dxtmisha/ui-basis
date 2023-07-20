<template>
  <md3-progress visible/>
  <div style="display: flex; gap: 16px; padding: 16px">
    <md3-button icon="face"/>
    <md3-button label="Label"/>
    <md3-button icon="face" label="Label"/>
    <md3-button icon="face" label="Progress" :progress="progress" @click="progress = !progress"/>
    <md3-button icon="face" label="Disabled" disabled/>
  </div>
  <div style="display: flex; align-items: center; gap: 16px; padding: 16px">
    <md3-icon icon="face" style="border: solid 1px;"/>
    <md3-icon icon="face" size="xs" style="border: solid 1px;"/>
    <md3-icon icon="face" size="sm" style="border: solid 1px;"/>
    <md3-icon icon="face" size="md" style="border: solid 1px;"/>
    <md3-icon icon="face" size="lg" style="border: solid 1px;"/>
    <md3-icon icon="face" size="xl" style="border: solid 1px;"/>
  </div>
  <div style="display: flex; align-items: center; gap: 16px; padding: 16px">
    <md3-icon v-bind="image"/>
    <md3-icon v-bind="image" size="xs"/>
    <md3-icon v-bind="image" size="sm"/>
    <md3-icon v-bind="image" size="md"/>
    <md3-icon v-bind="image" size="lg"/>
    <md3-icon v-bind="image" size="xl"/>
  </div>
  <div style="display: flex; gap: 16px;">
    <md2-fab icon="face"/>
    <md2-fab label="label"/>
    <md2-fab icon="face" label="label"/>
    <md2-fab>slot</md2-fab>
    <md2-fab :label="text" @click="text = text ? undefined : 'text'"/>
  </div>
  <div style="display: flex; gap: 16px; padding-top: 16px;">
    <md2-chip icon="face"/>
    <md2-chip label="label"/>
    <md2-chip icon="face" label="label"/>
    <md2-chip>slot</md2-chip>
    <md2-chip :label="text" @click="text = text ? undefined : 'text'"/>
  </div>
  <div style="display: flex; gap: 16px; padding-top: 16px;">
    <md2-chip outlined icon="face"/>
    <md2-chip outlined label="label"/>
    <md2-chip outlined icon="face" label="label"/>
    <md2-chip outlined>slot</md2-chip>
    <md2-chip outlined :label="text" @click="text = text ? undefined : 'text'"/>
  </div>
  <div style="display: flex; gap: 16px; padding-top: 16px;">
    <md2-chip icon="face" label="dragged" dragged/>
    <md2-chip icon="face" label="readonly" readonly/>
    <md2-chip icon="face" label="disabled" disabled/>
    <md2-chip icon="face" label="disabled click" :disabled="disabled" @click="disabled=!disabled"/>
    <md2-chip icon="face" label="selected" selected/>
    <md2-chip :icon="{icon:'face',iconActive:'home'}" label="selected click" :selected="selected"
              @click="selected=!selected"/>
  </div>
  <div style="display: flex; gap: 16px; padding-top: 16px;">
    <md2-chip outlined icon="face" label="dragged" dragged/>
    <md2-chip outlined icon="face" label="readonly" readonly/>
    <md2-chip outlined icon="face" label="disabled" disabled/>
    <md2-chip outlined icon="face" label="disabled click" :disabled="disabled" @click="disabled=!disabled"/>
    <md2-chip outlined icon="face" label="selected" selected/>
    <md2-chip outlined :icon="{icon:'face',iconActive:'home'}" label="selected click" :selected="selected"
              @click="selected=!selected"/>
  </div>
  <div style="display: flex; gap: 16px; padding-top: 16px;">
    <md2-chip icon="face" label="sm" height="sm"/>
    <md2-chip icon="face" label="md" height="md"/>
    <md2-chip icon="face" label="lg" height="lg"/>
    <md2-chip icon="face" label="52px" height="52px"/>
  </div>
  <div style="display: flex; gap: 16px; padding-top: 16px;">
    <md2-chip icon="face" label="label" palette="cyan"/>
    <md2-chip icon="face" label="label" palette="green"/>
    <md2-chip icon="face" label="hide" palette="green" :icon-hide="hide"/>
    <md2-chip
      :icon="{icon:'face',iconActive:'home'}"
      :selected="selected"
      label="selected click"
      palette="deep-purple"
      @click="selected=!selected"
    />
    <md2-chip
      :icon="{icon:'face',iconActive:'home'}"
      :selected="selected"
      choice
      label="selected click"
      palette="deep-purple"
      @click="selected=!selected"
    />
    <md2-chip
      :progress="progress"
      icon="face"
      icon-trailing="home"
      label="progress"
      @click="progress = !progress"
    />
    <md2-chip
      :progress="progress"
      :selected="selected"
      choice
      icon="face"
      icon-trailing="home"
      label="progress"
      @click="progress = !progress"
    />
  </div>
  <div style="display: flex; gap: 16px; padding-top: 16px;">
    <md2-chip outlined icon="face" label="label" palette="cyan"/>
    <md2-chip outlined icon="face" label="label" palette="green"/>
    <md2-chip outlined icon="face" label="hide" palette="green" :icon-hide="hide"/>
    <md2-chip
      outlined
      :icon="{icon:'face',iconActive:'home'}"
      :selected="selected"
      label="selected click"
      palette="deep-purple"
      @click="selected=!selected"
    />
    <md2-chip
      outlined
      :icon="{icon:'face',iconActive:'home'}"
      :selected="selected"
      choice
      label="selected click"
      palette="deep-purple"
      @click="selected=!selected"
    />
    <md2-chip
      outlined
      :progress="progress"
      icon="face"
      icon-trailing="home"
      label="progress"
      @click="progress = !progress"
    />
    <md2-chip
      outlined
      :progress="progress"
      :selected="selected"
      choice
      icon="face"
      icon-trailing="home"
      label="progress"
      @click="progress = !progress"
    />
  </div>
  <div style="display: flex; gap: 16px; padding-top: 16px;">
    <md2-button
      label="text 1"
      value="value"
      @click="(event, options) => console.log(event, options)"
    />
    <md2-button>slot</md2-button>
    <md2-button label="text/">slot</md2-button>
    <md2-button :label="text" @click="text = text ? undefined : 'text'"/>
    <md2-button label="disabled" disabled/>
    <md2-button label="dragged" dragged/>
  </div>
  <div style="display: flex; gap: 16px; padding-top: 16px">
    <md2-button
      outlined
      label="text 1"
      value="value"
      @click="(event, options) => console.log(event, options)"
    />
    <md2-button outlined>slot</md2-button>
    <md2-button outlined label="text/">slot</md2-button>
    <md2-button outlined :label="text" @click="text = text ? undefined : 'text'"/>
    <md2-button outlined label="disabled" disabled/>
    <md2-button outlined label="dragged" dragged/>
  </div>
  <div style="display: flex; gap: 16px; padding-top: 16px">
    <md2-button
      text
      label="text 1"
      value="value"
      @click="(event, options) => console.log(event, options)"
    />
    <md2-button text>slot</md2-button>
    <md2-button text label="text/">slot</md2-button>
    <md2-button text :label="text" @click="text = text ? undefined : 'text'"/>
    <md2-button text label="disabled" disabled/>
    <md2-button text label="dragged" dragged/>
  </div>
  <div style="display: flex; gap: 16px; padding-top: 16px">
    <md2-button :icon="icon" @click="icon = icon === 'face' ? 'close' : 'face'"/>
    <md2-button :icon="icon" :icon-hide="hide" @click="hide = !hide"/>
    <md2-button :icon="iconToNone" @click="iconToNone = iconToNone?  undefined : 'home'"/>
    <md2-button :icon="iconToNone" icon-trailing="close" :label="iconToNone"/>
    <md2-button :icon-trailing="icon" :icon-turn="turn" @click="turn = !turn"/>
    <md2-button icon="face" label="text"/>
    <md2-button icon-trailing="close" label="text"/>
    <md2-button icon="face" icon-trailing="close" label="text"/>
    <md2-button icon="face" icon-trailing="close"/>
  </div>
  <div style="display: flex; gap: 16px; padding-top: 16px">
    <md2-button
      :icon="image"
      @click="progress = !progress"
    />
    <md2-button :progress="progress" icon="face" icon-trailing="home" label="label"
                @click="progress = !progress"/>
  </div>
  <div style="display: flex; gap: 16px; padding-top: 16px">
    <md2-fab
      :icon="image"
      @click="progress = !progress"
    />
    <md2-fab :progress="progress" icon="face" icon-trailing="home" label="label"
             @click="progress = !progress"/>
  </div>
  <div style="display: flex; gap: 16px; padding-top: 16px">
    <md2-button icon="face" icon-trailing="close" label="text" height="sm"/>
    <md2-button icon="face" icon-trailing="close" label="text" height="md"/>
    <md2-button icon="face" icon-trailing="close" label="text" height="lg"/>
  </div>
  <div style="display: flex; gap: 16px; padding-top: 16px">
    <md2-fab icon="face" icon-trailing="close" label="text" height="sm"/>
    <md2-fab icon="face" icon-trailing="close" label="text" height="md"/>
    <md2-fab icon="face" icon-trailing="close" label="text" height="lg"/>
  </div>
  <div style="display: flex; gap: 16px; padding-top: 16px">
    <md2-button label="text" height="sm"/>
    <md2-button label="text" height="md"/>
    <md2-button label="text" height="lg"/>
  </div>
  <div style="display: flex; gap: 16px; padding-top: 16px">
    <md2-button label="text" icon="home"/>
    <md2-button label="text" icon="home" outlined/>
    <md2-button label="text" icon="home" text/>
    <md2-button label="text a" icon="home" tag="a"/>
    <md2-button label="text a" icon="home" outlined tag="a"/>
    <md2-button label="text a" icon="home" text tag="a"/>
  </div>
  <div style="display: flex; gap: 16px; padding-top: 16px">
    <md2-button label="text" icon="home" palette="deep-orange"/>
    <md2-button label="text" icon="home" palette="deep-orange" outlined/>
    <md2-button label="text" icon="home" palette="deep-orange" text/>
  </div>
  <div style="display: flex; gap: 16px; padding-top: 16px">
    <md2-button label="selected" icon="home" palette="deep-orange" :selected="selected"
                @click="selected=!selected"/>
    <md2-button label="selected" icon="home" palette="deep-orange" :selected="selected" outlined/>
    <md2-button label="selected" icon="home" palette="deep-orange" :selected="selected" text/>
    <md2-button label="selected" icon="home" palette="deep-orange"/>
    <md2-button label="selected" icon="home" palette="deep-orange" outlined/>
    <md2-button label="selected" icon="home" palette="deep-orange" text/>
  </div>
  <div style="display: flex; gap: 16px; padding-top: 16px">
    <md2-button label="selected" :icon="{icon:'home',iconActive:'face'}" :selected="selected"/>
    <md2-button label="selected" icon="home" :selected="selected" outlined/>
    <md2-button label="selected" icon="home" :selected="selected" text/>
    <md2-button label="selected" icon="home"/>
    <md2-button label="selected" icon="home" outlined/>
    <md2-button label="selected" icon="home" text/>
  </div>
  <div style="display: flex; gap: 16px; padding-top: 16px">
    <md2-fab label="selected" icon="home" palette="deep-orange" :selected="selected"
             @click="selected=!selected"/>
    <md2-fab label="selected" icon="home" palette="deep-orange" :selected="selected" outlined/>
    <md2-fab label="selected" icon="home" palette="deep-orange" :selected="selected" text/>
    <md2-fab label="selected" icon="home" palette="deep-orange"/>
    <md2-fab label="selected" icon="home" palette="deep-orange" outlined/>
    <md2-fab label="selected" icon="home" palette="deep-orange" text/>
  </div>
  <div style="display: flex; gap: 16px; padding-top: 16px">
    <md2-fab label="selected" :icon="{icon:'home',iconActive:'face'}" :selected="selected"/>
    <md2-fab label="selected" icon="home" :selected="selected" outlined/>
    <md2-fab label="selected" icon="home" :selected="selected" text/>
    <md2-fab label="selected" icon="home"/>
    <md2-fab label="selected" icon="home" outlined/>
    <md2-fab label="selected" icon="home" text/>
  </div>
  <div style="display: flex; gap: 16px; padding-top: 16px">
    <md2-button label="text" icon="home" palette="brown"/>
    <md2-button label="text" icon="home" palette="brown" outlined/>
    <md2-button label="text" icon="home" palette="brown" text/>
  </div>
  <div style="display: flex; gap: 16px; padding-top: 16px">
    <md2-button label="text" icon="home" palette="deep-orange" disabled/>
    <md2-button label="text" icon="home" palette="deep-orange" disabled outlined/>
    <md2-button label="text" icon="home" palette="deep-orange" disabled text/>
  </div>
  <div style="display: flex; gap: 16px; padding-top: 16px">
    <md2-button label="text" icon="home" palette="deep-orange" adaptive="sm"/>
    <md2-button label="text" icon="home" palette="deep-orange" adaptive="md"/>
    <md2-button label="text" icon="home" palette="deep-orange" adaptive="lg"/>
  </div>
  <div style="display: flex; gap: 16px; padding-top: 16px">
    <md2-button icon="home" rounded="sm"/>
    <md2-button icon="home" rounded="md"/>
    <md2-button icon="home" rounded="lg"/>
    <md2-button icon="home" rounded="full"/>
    <md2-button label="sm" icon="home" rounded="sm"/>
    <md2-button label="md" icon="home" rounded="md"/>
    <md2-button label="lg" icon="home" rounded="lg"/>
    <md2-button label="full" icon="home" rounded="full"/>
    <md2-button label="sm" rounded="sm"/>
    <md2-button label="md" rounded="md"/>
    <md2-button label="lg" rounded="lg"/>
    <md2-button label="full" rounded="full"/>
  </div>
  <div style="display: flex; gap: 16px; padding-top: 16px">
    <md2-button text icon="home" rounded="sm"/>
    <md2-button text icon="home" rounded="md"/>
    <md2-button text icon="home" rounded="lg"/>
    <md2-button text icon="home" rounded="full"/>
    <md2-button text label="sm" icon="home" rounded="sm"/>
    <md2-button text label="md" icon="home" rounded="md"/>
    <md2-button text label="lg" icon="home" rounded="lg"/>
    <md2-button text label="full" icon="home" rounded="full"/>
    <md2-button text label="sm" rounded="sm"/>
    <md2-button text label="md" rounded="md"/>
    <md2-button text label="lg" rounded="lg"/>
    <md2-button text label="full" rounded="full"/>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

import Md2Button from '../../md2/Button/Md2Button.vue'
import { ImageIcon } from '../../constructors/Image/ImageIcon'
import Md2Chip from '../../md2/Chip/Md2Chip.vue'
import Md2Fab from '../../md2/Fab/Md2Fab.vue'
import Md3Button from '../../md3/Button/Md3Button.vue'
import Md3Icon from '../../md3/Icon/Md3Icon.vue'
import Md3Progress from '../../md3/Progress/Md3Progress.vue'

// eslint-disable-next-line @typescript-eslint/no-var-requires
ImageIcon.add('test', require('../assets/icons/arrow-left.svg'))

export default defineComponent({
  name: 'HomeView',
  components: {
    Md3Progress,
    Md3Icon,
    Md3Button,
    Md2Fab,
    Md2Chip,
    Md2Button
  },
  setup () {
    return {
      image: {
        icon: {
          value: 'https://drscdn.500px.org/photo/1071900499/q%3D80_m%3D2000/v2?sig=b42037ebdec07ea7c5c0a0e8ea7422b942f25b10806885ba31b1c9e2a449d964',
          size: 'cover'
        },
        onLoad: (value: any) => console.log(value)
      },
      text: ref<string | undefined>('text'),
      icon: ref<string | undefined>('face'),
      iconToNone: ref<string | undefined>('home'),
      hide: ref<boolean>(false),
      turn: ref<boolean>(false),
      selected: ref<boolean>(false),
      disabled: ref<boolean>(false),
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
