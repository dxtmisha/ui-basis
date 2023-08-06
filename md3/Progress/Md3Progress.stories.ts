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

export const Progress: Story = { name: 'visible' }

export const ProgressDelay: Story = {
  name: 'delay',
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
        delay=0
        <div style="position: relative; width: 100%; height: 24px;">
          <md3-progress :delay="0" v-bind="args"/>
        </div>
        delay=200
        <div style="position: relative; width: 100%; height: 24px;">
          <md3-progress :delay="200" v-bind="args"/>
        </div>
        delay=800
        <div style="position: relative; width: 100%; height: 24px;">
          <md3-progress :delay="800" v-bind="args"/>
        </div>
        delay=1600
        <div style="position: relative; width: 100%; height: 24px;">
          <md3-progress :delay="1600" v-bind="args"/>
        </div>
        delay=3600
        <div style="position: relative; width: 100%; height: 24px;">
          <md3-progress :delay="3600" v-bind="args"/>
        </div>
      </div>
    `
  })
}

export const ProgressLinear: Story = {
  name: 'linear',
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
          <md3-progress indeterminate="type1" v-bind="args"/>
        </div>
        indeterminate=type2
        <div style="position: relative; width: 100%; height: 24px;">
          <md3-progress indeterminate="type2" v-bind="args"/>
        </div>
        value=25
        <div style="position: relative; width: 100%; height: 24px;">
          <md3-progress :value="25" v-bind="args"/>
        </div>
        value=95
        <div style="position: relative; width: 100%; height: 24px;">
          <md3-progress :value="95" v-bind="args"/>
        </div>
        value=95, max=200
        <div style="position: relative; width: 100%; height: 24px;">
          <md3-progress :max="200" :value="95" v-bind="args"/>
        </div>
      </div>
    `
  })
}

export const ProgressLinearPosition: Story = {
  name: 'linear, position',
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
        position=top
        <div style="position: relative; width: 100%; height: 24px; border: 1px solid rgb(var(--sys-color),.12);">
          <md3-progress position="top" v-bind="args"/>
        </div>
        position=bottom
        <div style="position: relative; width: 100%; height: 24px; border: 1px solid rgb(var(--sys-color),.12);">
          <md3-progress position="bottom" v-bind="args"/>
        </div>
      </div>
    `
  })
}

export const ProgressCircular: Story = {
  name: 'circular',
  args: {
    visible: true,
    circular: true
  },
  render: (args: any) => ({
    components: { Md3Progress },
    setup () {
      return { args }
    },
    template: `
      <div style="position: relative; width: 40px; height: 40px; border: 1px solid rgb(var(--sys-color),.12);">
        <md3-progress indeterminate="type1" v-bind="args"/>
      </div>
      <div style="position: relative; width: 40px; height: 40px; border: 1px solid rgb(var(--sys-color),.12);">
        <md3-progress indeterminate="type2" v-bind="args"/>
      </div>
      <div style="position: relative; width: 40px; height: 40px; border: 1px solid rgb(var(--sys-color),.12);">
        <md3-progress :value="25" v-bind="args"/>
      </div>
      <div style="position: relative; width: 40px; height: 40px; border: 1px solid rgb(var(--sys-color),.12);">
        <md3-progress :value="95" v-bind="args"/>
      </div>
      <div style="position: relative; width: 40px; height: 40px; border: 1px solid rgb(var(--sys-color),.12);">
        <md3-progress :max="200" :value="95" v-bind="args"/>
      </div>
    `
  })
}

export const ProgressCircularDense: Story = {
  ...ProgressCircular,
  name: 'circular, dense',
  args: {
    visible: true,
    circular: true,
    dense: true
  }
}

export const ProgressInverse: Story = {
  name: 'inverse',
  args: { inverse: true }
}
