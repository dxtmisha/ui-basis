import type { Meta, StoryObj } from '@storybook/vue3'

import Md2Progress from './Md2Progress.vue'

import { argTypes } from './argTypes'

// More on how to set up stories at: https://storybook.js.org/docs/vue/writing-stories/introduction
const meta = {
  title: 'Md2/Md2Progress',
  component: Md2Progress,
  tags: ['autodocs'],
  parameters: {
    design: 'md2',
    docs: {
      description: {
        component: 'Progress indicators express an unspecified wait time or display the length of a process'
      }
    }
  },
  argTypes,
  args: {
    visible: true
  }
} satisfies Meta<typeof Md2Progress>

type Story = StoryObj<typeof meta>;

export default meta

export const Progress: Story = {}

export const ProgressDelay: Story = {
  name: 'delay=true',
  parameters: {
    docs: {
      description: {
        story: argTypes.delay.description
      }
    }
  },
  args: {
    visible: true,
    linear: true
  },
  render: (args: any) => ({
    components: { Md2Progress },
    setup () {
      return { args }
    },
    template: `
      <div style="width: 100%;">
        delay=0
        <div style="position: relative; width: 100%; height: 24px;">
          <md2-progress :delay="0" v-bind="args"/>
        </div>
        delay=200
        <div style="position: relative; width: 100%; height: 24px;">
          <md2-progress :delay="200" v-bind="args"/>
        </div>
        delay=800
        <div style="position: relative; width: 100%; height: 24px;">
          <md2-progress :delay="800" v-bind="args"/>
        </div>
        delay=1600
        <div style="position: relative; width: 100%; height: 24px;">
          <md2-progress :delay="1600" v-bind="args"/>
        </div>
        delay=3600
        <div style="position: relative; width: 100%; height: 24px;">
          <md2-progress :delay="3600" v-bind="args"/>
        </div>
      </div>
    `
  })
}

export const ProgressInverse: Story = {
  name: 'inverse=true',
  parameters: {
    docs: {
      description: {
        story: argTypes.inverse.description
      }
    }
  },
  args: { inverse: true }
}

export const ProgressLinear: Story = {
  name: 'Linear progress indicators',
  parameters: {
    docs: {
      description: {
        story: 'Linear progress indicators display progress by animating an indicator along the length of a fixed, visible track. The behavior of the indicator is dependent on whether the progress of a process is known.'
      }
    }
  },
  args: {
    visible: true,
    linear: true
  },
  render: (args: any) => ({
    components: { Md2Progress },
    setup () {
      return { args }
    },
    template: `
      <div style="width: 100%;">
        indeterminate=type1
        <div style="position: relative; width: 100%; height: 24px;">
          <md2-progress indeterminate="type1" v-bind="args"/>
        </div>
        indeterminate=type2
        <div style="position: relative; width: 100%; height: 24px;">
          <md2-progress indeterminate="type2" v-bind="args"/>
        </div>
        value=25
        <div style="position: relative; width: 100%; height: 24px;">
          <md2-progress :value="25" v-bind="args"/>
        </div>
        value=95
        <div style="position: relative; width: 100%; height: 24px;">
          <md2-progress :value="95" v-bind="args"/>
        </div>
        value=95, max=200
        <div style="position: relative; width: 100%; height: 24px;">
          <md2-progress :max="200" :value="95" v-bind="args"/>
        </div>
      </div>
    `
  })
}

export const ProgressLinearPosition: Story = {
  name: 'position=<top|bottom>',
  args: {
    visible: true,
    linear: true
  },
  render: (args: any) => ({
    components: { Md2Progress },
    setup () {
      return { args }
    },
    template: `
      <div style="width: 100%;">
        position=top
        <div style="position: relative; width: 100%; height: 24px; border: 1px solid rgb(var(--sys-color),.12);">
          <md2-progress position="top" v-bind="args"/>
        </div>
        position=bottom
        <div style="position: relative; width: 100%; height: 24px; border: 1px solid rgb(var(--sys-color),.12);">
          <md2-progress position="bottom" v-bind="args"/>
        </div>
      </div>
    `
  })
}

export const ProgressCircular: Story = {
  name: 'Circular progress indicators',
  parameters: {
    docs: {
      description: {
        story: 'Circular progress indicators display progress by animating an indicator along an invisible circular track in a clockwise direction. They can be applied directly to a surface, such as a button or card.'
      }
    }
  },
  args: {
    visible: true,
    circular: true
  },
  render: (args: any) => ({
    components: { Md2Progress },
    setup () {
      return { args }
    },
    template: `
      <div style="position: relative; width: 40px; height: 40px; border: 1px solid rgb(var(--sys-color),.12);">
        <md2-progress indeterminate="type1" v-bind="args"/>
      </div>
      <div style="position: relative; width: 40px; height: 40px; border: 1px solid rgb(var(--sys-color),.12);">
        <md2-progress indeterminate="type2" v-bind="args"/>
      </div>
      <div style="position: relative; width: 40px; height: 40px; border: 1px solid rgb(var(--sys-color),.12);">
        <md2-progress :value="25" v-bind="args"/>
      </div>
      <div style="position: relative; width: 40px; height: 40px; border: 1px solid rgb(var(--sys-color),.12);">
        <md2-progress :value="95" v-bind="args"/>
      </div>
      <div style="position: relative; width: 40px; height: 40px; border: 1px solid rgb(var(--sys-color),.12);">
        <md2-progress :max="200" :value="95" v-bind="args"/>
      </div>
    `
  })
}

export const ProgressCircularDense: Story = {
  ...ProgressCircular,
  name: 'dense=true',
  parameters: {
    docs: {
      description: {
        story: argTypes.dense.description
      }
    }
  },
  args: {
    visible: true,
    circular: true,
    dense: true
  }
}
