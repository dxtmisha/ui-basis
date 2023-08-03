import type { Preview } from '@storybook/vue3'

import '../src/main.scss'
import './style.scss'

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/
      }
    }
  },
  decorators: [
    (story) => ({
      components: { story },
      template: `
        <div class="sb-preview">
          <div class="sb-preview__body">
            <story/>
          </div>
        </div>
      `,
    })
  ]
}

export default preview
