import type { Meta, StoryObj } from '@storybook/vue3'

import Md3Progress from './Md3Progress.vue'

import { main } from '../stories/main'
import { argTypes } from './argTypes'

// More on how to set up stories at: https://storybook.js.org/docs/vue/writing-stories/introduction
const meta = {
  ...main,
  title: 'Md3/Md3Progress',
  component: Md3Progress,
  tags: ['autodocs'],
  argTypes,
  args: {
    visible: true
  }
} satisfies Meta<typeof Md3Progress>

type Story = StoryObj<typeof meta>;

export default meta

export const Progress: Story = {
  name: 'Progress, visible'
}

export const LinearType1: Story = {
  name: 'Linear, indeterminate=type1',
  args: {
    visible: true,
    linear: true,
    indeterminate: 'type1'
  }
}

export const LinearType2: Story = {
  name: 'Linear, indeterminate=type2',
  args: {
    visible: true,
    linear: true,
    indeterminate: 'type2'
  }
}

export const CircularType1: Story = {
  name: 'Circular, indeterminate=type1',
  args: {
    visible: true,
    circular: true,
    indeterminate: 'type1'
  }
}

export const CircularType2: Story = {
  name: 'Circular, indeterminate=type2',
  args: {
    visible: true,
    circular: true,
    indeterminate: 'type2'
  }
}
