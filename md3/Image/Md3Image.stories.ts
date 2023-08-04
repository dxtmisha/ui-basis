import type { Meta, StoryObj } from '@storybook/vue3'

import Md3Image from './Md3Image.vue'

// More on how to set up stories at: https://storybook.js.org/docs/vue/writing-stories/introduction
const meta = {
  title: 'Md3/Md3Image',
  component: Md3Image,
  tags: ['autodocs'],
  argTypes: {
    ...{
      // [!] System label, cannot be deleted
      // [!] Системная метка, нельзя удалять
      // :arg-types
      turn: { control: 'boolean' },
      disabled: { control: 'boolean' },
      hide: { control: 'boolean' },
      adaptive: { control: 'boolean' },
      linear: { control: 'boolean' },
      position: {
        control: 'select',
        options: ['top', 'bottom']
      }
      // :arg-types
    }
  },
  args: {
    ...{
      // [!] System label, cannot be deleted
      // [!] Системная метка, нельзя удалять
      // :default
      linear: true,
      position: 'top'
      // :default
    }
  }
} satisfies Meta<typeof Md3Image>

type Story = StoryObj<typeof meta>;

export default meta

export const Image: Story = {
  // name: 'Image',
  args: {}
}