import type { Meta, StoryObj } from '@storybook/vue3'

import Md3Chip from './Md3Chip.vue'

import { argTypes } from './argTypes'

// More on how to set up stories at: https://storybook.js.org/docs/vue/writing-stories/introduction
const meta = {
  title: 'Md3/Md3Chip',
  component: Md3Chip,
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
} satisfies Meta<typeof Md3Chip>

type Story = StoryObj<typeof meta>;

export default meta

export const Chip: Story = {
  // name: 'Chip',
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
