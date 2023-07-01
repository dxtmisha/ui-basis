<script lang="ts">
import { defineComponent } from 'vue'
import { props, subClasses } from './props'

import { RippleDesign } from '../../constructors/Ripple/RippleDesign'

export default defineComponent({
  name: 'Md2Ripple', // name component
  props,
  setup (props, context) {
    return new RippleDesign<typeof subClasses>(props, context)
      .render()
  }
})
</script>

<style lang="scss">
@import "../../constructors/Ripple/style";

@include initRippleDesign {

}
</style>
