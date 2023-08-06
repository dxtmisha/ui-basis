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

export const Progress: Story = { name: 'Visible' }

export const ProgressLinear: Story = {
  name: 'Linear',
  args: {
    visible: true,
    linear: true
  },
  render: (args: any) => ({
    components: { Md3Progress },
    setup () {
      return { args }
    },
    template: `
      <div style="width: 100%;">
        indeterminate=type1
        <div style="position: relative; width: 100%; height: 24px;">
          <md3-progress v-bind="args" indeterminate="type1"/>
        </div>
        indeterminate=type2
        <div style="position: relative; width: 100%; height: 24px;">
          <md3-progress v-bind="args" indeterminate="type2"/>
        </div>
        value=25
        <div style="position: relative; width: 100%; height: 24px;">
          <md3-progress v-bind="args" :value="25"/>
        </div>
        value=95
        <div style="position: relative; width: 100%; height: 24px;">
          <md3-progress v-bind="args" :value="95"/>
        </div>
        value=95, max=200
        <div style="position: relative; width: 100%; height: 24px;">
          <md3-progress v-bind="args" :value="95" :max="200"/>
        </div>
      </div>
    `
  })
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
