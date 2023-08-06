import type { Meta, StoryObj } from '@storybook/vue3'

import Md3Image from './Md3Image.vue'

import { main } from '../stories/main'
import { icon } from '../stories/argTypes'
import { argTypes, images } from './argTypes'

// More on how to set up stories at: https://storybook.js.org/docs/vue/writing-stories/introduction
const meta = {
  ...main,
  title: 'Md3/Md3Image',
  component: Md3Image,
  tags: ['autodocs'],
  argTypes,
  args: {}
} satisfies Meta<typeof Md3Image>

type Story = StoryObj<typeof meta>;

export default meta

export const Icon: Story = {
  name: 'Icon, value=home',
  args: {
    value: 'home'
  }
}

export const IconPng: Story = {
  name: 'Icon, value=<@...>',
  args: {
    value: icon.options[2]
  }
}

export const Image: Story = {
  name: 'Image, value=<url>',
  args: {
    value: icon.options[icon.options.length - 1]
  }
}

export const ImageCoordinator: Story = {
  name: 'Image, coordinator=[0, 50, 50, 0]',
  args: {
    value: icon.options[icon.options.length - 1],
    coordinator: [0, 50, 50, 0]
  }
}

export const ImageAdaptive: Story = {
  name: 'Image, adaptive=true',
  args: {
    value: icon.options[icon.options.length - 1],
    adaptive: true
  },
  render: (args) => ({
    components: { Md3Image },
    setup () {
      return { args }
    },
    template: `
      <div style="position: relative; margin: 8px 0; min-width: 192px; height: 192px;">
        <md3-image
          v-bind="args"
          :object-width="70.9"
          :object-height="146.3"
          value="${images.galaxy_s23}"
        />
      </div>
      <div style="position: relative; margin: 8px 0; min-width: 192px; height: 192px;">
        <md3-image
          v-bind="args"
          :object-width="76.2"
          :object-height="157.8"
          value="${images.galaxy_s23p}"
        />
      </div>
      <div style="position: relative; margin: 8px 0; min-width: 192px; height: 192px;">
        <md3-image
          v-bind="args"
          :object-width="71.9"
          :object-height="165.1"
          value="${images.galaxy_z_flip5}"
        />
      </div>
      <div style="position: relative; margin: 8px 0; min-width: 192px; height: 192px;">
        <md3-image
          v-bind="args"
          :object-width="129.9"
          :object-height="154.9"
          value="${images.galaxy_z_fold5}"
        />
      </div>
    `
  })
}
