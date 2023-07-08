<script lang="ts">
import { defineComponent, onMounted } from 'vue'
import { props, subClasses } from './props'

import { ImageDesign } from '../../constructors/Image/ImageDesign'

export default defineComponent({
  name: 'Md2Image', // name component
  props,
  setup (props, context) {
    onMounted(() => console.log('onMounted'))
    return new ImageDesign<typeof subClasses>(props, context)
      .render({})
  }
})
</script>

<style lang="scss">
@import "../../constructors/Image/style";

@include initImageDesign {

}
</style>
