<script lang="ts">
import { defineComponent } from 'vue'
import { props, subClasses } from './props'

import { IconDesign } from '../../constructors/Icon/IconDesign'

import Md2Image from '../Image/Md2Image.vue'

export default defineComponent({
  name: 'Md2Icon', // name component
  props,
  setup (props, context) {
    return new IconDesign<typeof subClasses>(props, context)
      .setComponents({
        image: Md2Image
      })
      .render({})
  }
})
</script>

<style lang="scss">
@import "../../constructors/Icon/style";

@include initIconDesign {

}
</style>
