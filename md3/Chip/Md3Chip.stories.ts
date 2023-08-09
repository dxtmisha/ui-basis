import type { Meta, StoryObj } from '@storybook/vue3'

import Md3Chip from './Md3Chip.vue'

import { argTypes } from './argTypes'
import { icon } from '../stories/argTypes'

// More on how to set up stories at: https://storybook.js.org/docs/vue/writing-stories/introduction
const meta = {
  title: 'Md3/Md3Chip',
  component: Md3Chip,
  tags: ['autodocs'],
  parameters: {
    design: 'md3',
    docs: {
      description: {
        component: 'Chips help people enter information, make selections, filter content, or trigger actions'
      }
    }
  },
  argTypes,
  args: {
    label: 'Label'
  }
} satisfies Meta<typeof Md3Chip>

type Story = StoryObj<typeof meta>;

export default meta

export const Chip: Story = {}

export const ChipIcon: Story = {
  name: 'icon=<string>, icon-trailing=<string>',
  render: (args) => ({
    components: { Md3Chip },
    setup () {
      return { args }
    },
    template: `
      <md3-chip v-bind="args" icon="${icon.options[1]}" :label="undefined"/>
      <md3-chip v-bind="args" icon-trailing="${icon.options[0]}" :label="undefined"/>
      <md3-chip v-bind="args" icon="${icon.options[1]}" icon-trailing="${icon.options[0]}" :label="undefined"/>
      <md3-chip v-bind="args" icon="${icon.options[1]}"/>
      <md3-chip v-bind="args" icon-trailing="${icon.options[0]}"/>
      <md3-chip v-bind="args" icon="${icon.options[1]}" icon-trailing="${icon.options[0]}"/>
    `
  })
}
