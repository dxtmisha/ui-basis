<template>
  <div>
    <div>
      <div></div>
      <div>
        <md3-button/>
      </div>
    </div>
    <div>
      <div>Md3Progress</div>
      <div style="display: flex; gap: 8px; padding-top: 8px;">
        <a @click="visible=!visible">visible</a>
        <select @input="({target}) => value=target.value===''?undefined:parseInt(target.value)">
          <option value=""></option>
          <option value="0">0</option>
          <option value="10">10</option>
          <option value="25">25</option>
          <option value="50">50</option>
          <option value="75">75</option>
          <option value="95">95</option>
          <option value="99">99</option>
          <option value="100">100</option>
        </select>
        <select @input="({target}) => indeterminate=target.value">
          <option value=""></option>
          <option value="type1">type1</option>
          <option value="type2">type2</option>
        </select>
        <select @input="({target}) => position=target.value">
          <option value=""></option>
          <option value="top">top</option>
          <option value="bottom">bottom</option>
        </select>
      </div>
      <div style="display: flex; gap: 8px; padding-top: 16px;">
        <div style="position: relative; width: 160px; height: 160px; border: solid 1px;">
          <md3-progress :indeterminate="indeterminate" :position="position" :value="value" visible/>
        </div>
        <div style="position: relative; width: 160px; height: 160px; border: solid 1px;">
          <md3-progress :indeterminate="indeterminate" :position="position" :value="value" :visible="visible"/>
        </div>
      </div>
      <div style="display: flex; gap: 8px; padding-top: 16px;">
        <div style="position: relative; width: 160px; height: 160px; border: solid 1px;">
          <md3-progress :indeterminate="indeterminate" :position="position" :value="value" circular visible/>
        </div>
        <div style="position: relative; width: 160px; height: 160px; border: solid 1px;">
          <md3-progress :indeterminate="indeterminate" :position="position" :value="value" :visible="visible" circular/>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

import Md3Button from '../../md3/Button/Md3Button.vue'
import Md3Progress from '../../md3/Progress/Md3Progress.vue'

export default defineComponent({
  name: 'HomeView',
  components: {
    Md3Progress,
    Md3Button
  },
  setup () {
    return {
      value: ref<number>(),
      visible: ref(false),
      indeterminate: ref(undefined),
      position: ref(undefined)
    }
  }
})
</script>

<style lang="scss">
</style>
