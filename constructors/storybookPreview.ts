import { computed, ref } from 'vue'
import { Geo } from '../classes/Geo'

const DEFAULT_THEME = 'light'

const design = ref<string>(undefined)
const theme = ref<string>(DEFAULT_THEME)

export const globalTypes = {
  theme: {
    defaultValue: DEFAULT_THEME,
    toolbar: {
      title: 'Theme',
      icon: 'paintbrush',
      items: ['light', 'dark'],
      dynamicTitle: true
    }
  },
  language: {
    defaultValue: Geo.code.value,
    toolbar: {
      title: 'Language',
      icon: 'globe',
      items: [
        'en-GB',
        'en-US',
        'us-US',
        'ru-RU',
        'vi-Vn',
        'ko-KR',
        'he-IL'
      ],
      dynamicTitle: true
    }
  }
}

export const decoratorTheme = (story, {
  globals,
  parameters
}) => {
  Geo.set(globals.language)

  design.value = parameters?.design
  theme.value = globals.theme || DEFAULT_THEME

  return {
    components: { story },
    setup () {
      const classes = computed(() => {
        return {
          [`${design.value}-main`]: design.value,
          [`${design.value}-${theme.value}`]: design.value && theme.value,
          'dir-rtl': Geo.code.value === 'he-IL',
          'sb-preview': true
        }
      })

      return {
        classes
      }
    },
    template: `
      <div :class="classes">
        {{ classes }}
        <div class="sb-preview__body">
          <story/>
        </div>
      </div>
    `
  }
}
