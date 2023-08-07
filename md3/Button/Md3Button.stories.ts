import type { Meta, StoryObj } from '@storybook/vue3'

import Md3Button from './Md3Button.vue'

import { argTypes } from './argTypes'

// More on how to set up stories at: https://storybook.js.org/docs/vue/writing-stories/introduction
const meta = {
  title: 'Md3/Md3Button',
  component: Md3Button,
  tags: ['autodocs'],
  parameters: {
    design: 'md3',
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
} satisfies Meta<typeof Md3Button>

type Story = StoryObj<typeof meta>;

export default meta

export const Button: Story = {
  // name: 'Button',
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
