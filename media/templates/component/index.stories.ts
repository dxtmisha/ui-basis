import type { Meta, StoryObj } from '@storybook/vue3'

import DesignComponent from './index.vue'

import { argTypes } from './argTypes'

// More on how to set up stories at: https://storybook.js.org/docs/vue/writing-stories/introduction
const meta = {
  title: 'Design/DesignComponent',
  component: DesignComponent,
  tags: ['autodocs'],
  parameters: {
    design: 'design',
    docs: {
      description: {
        component: [
          '',
          ''
        ].join('<br><br>')
      }
    }
  },
  argTypes,
  args: {}
} satisfies Meta<typeof DesignComponent>

type Story = StoryObj<typeof meta>;

export default meta

export const Component: Story = {
  // name: 'Component',
  parameters: {
    docs: {
      description: {
        story: [
          '',
          ''
        ].join('<br><br>')
      }
    }
  },
  args: {}
}
