import type { Meta, StoryObj } from '@storybook/vue3'

import Md3Mutation from './Md3Mutation.vue'

import { argTypes } from './argTypes'

// More on how to set up stories at: https://storybook.js.org/docs/vue/writing-stories/introduction
const meta = {
  title: 'Md3/Md3Mutation',
  component: Md3Mutation,
  tags: ['autodocs'],
  parameters: {
    design: 'md3'
  },
  argTypes,
  args: {}
} satisfies Meta<typeof Md3Mutation>

type Story = StoryObj<typeof meta>;

export default meta

export const Mutation: Story = {}
