import type { Meta, StoryObj } from '@storybook/vue3'

import Md3MutationItem from './Md3MutationItem.vue'

import { argTypes } from './argTypes'

// More on how to set up stories at: https://storybook.js.org/docs/vue/writing-stories/introduction
const meta = {
  title: 'Md3/Md3MutationItem',
  component: Md3MutationItem,
  tags: ['autodocs'],
  parameters: {
    design: 'md3'
  },
  argTypes,
  args: {}
} satisfies Meta<typeof Md3MutationItem>

type Story = StoryObj<typeof meta>;

export default meta

export const MutationItem: Story = {}
