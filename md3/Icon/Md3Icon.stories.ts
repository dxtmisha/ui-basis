import type { Meta, StoryObj } from '@storybook/vue3'

import Md3Icon from './Md3Icon.vue'

import { main } from '../stories/main'
import { icon } from '../stories/argTypes'
import { argTypes } from './argTypes'

// More on how to set up stories at: https://storybook.js.org/docs/vue/writing-stories/introduction
const meta = {
  ...main,
  title: 'Md3/Md3Icon',
  component: Md3Icon,
  tags: ['autodocs'],
  argTypes,
  args: {
    icon: 'home'
  }
} satisfies Meta<typeof Md3Icon>

type Story = StoryObj<typeof meta>;

export default meta

export const Icon: Story = {
  name: 'Icon, value=home'
}

export const IconActive: Story = {
  name: 'Icon, active=true',
  args: {
    iconActive: 'face'
  },
  render: (args) => ({
    components: { Md3Icon },
    setup () {
      return { args }
    },
    template: `
      <md3-icon v-bind="args" :active="false"/>
      <md3-icon v-bind="args" :active="true"/>
    `
  })
}

export const IconDynamic: Story = {
  name: 'Icon, dynamic=true',
  args: {
    dynamic: true
  }
}

export const ImageRounded: Story = {
  name: 'Image, size=<string>',
  args: {
    icon: icon.options[icon.options.length - 1]
  },
  render: (args) => ({
    components: { Md3Icon },
    setup () {
      return { args }
    },
    template: `
      <md3-icon v-bind="args" size="xs"/>
      <md3-icon v-bind="args" size="sm"/>
      <md3-icon v-bind="args" size="md"/>
      <md3-icon v-bind="args" size="lg"/>
      <md3-icon v-bind="args" size="xl"/>
    `
  })
}
