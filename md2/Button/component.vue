<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Md2Button'
})
</script>

<template>
  <div></div>
</template>

<style lang="scss">
@import "../../styles/properties";

@include initDesign('md2.button') {
  #{c('is-class')} {
    #{i('is-index1')}: v('is-value');
    #{i('is-index2')}: v('?is-value');
    #{i('is-index3')}: v('??is-value');
    #{i('is-index4')}: v('??is-value', v('??-is-def'));

    .a-asd {
      @include initByLink('?font.body1');
    }

    .a-font-2 {
      @include initByLink('?font.body1.font-weight');
    }
  }
}
</style>
