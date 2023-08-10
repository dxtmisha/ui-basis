import type { Meta, StoryObj } from '@storybook/vue3'

import Md2Ripple from './Md2Ripple.vue'

import { argTypes } from './argTypes'

// More on how to set up stories at: https://storybook.js.org/docs/vue/writing-stories/introduction
const meta = {
  title: 'Md2/Md2Ripple',
  component: Md2Ripple,
  tags: ['autodocs'],
  parameters: {
    design: 'md2'
  },
  argTypes,
  args: {}
} satisfies Meta<typeof Md2Ripple>

type Story = StoryObj<typeof meta>;

export default meta

export const Ripple: Story = {}
