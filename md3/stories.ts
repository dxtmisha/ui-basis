import { Preview } from '@storybook/vue3'

export const stories: Preview = {
  decorators: [
    (story) => ({
      components: { story },
      template: `
        <div class="md3-main sb-preview">
        <div class="sb-preview__body">
          <story/>
        </div>
        </div>
      `
    })
  ]
}
