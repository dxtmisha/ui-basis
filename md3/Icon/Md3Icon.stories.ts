import type { Meta, StoryObj } from '@storybook/vue3'

import Md3Icon from './Md3Icon.vue'

// More on how to set up stories at: https://storybook.js.org/docs/vue/writing-stories/introduction
const meta = {
  title: 'Md3/Md3Icon',
  component: Md3Icon,
  tags: ['autodocs'],
  argTypes: {
    ...{
      // [!] System label, cannot be deleted
      // [!] Системная метка, нельзя удалять
      // :arg-types
      rounded: {
        control: 'select',
        options: ['none', 'standard', 'sm', 'md', 'lg', 'xl', '2xl', 'full']
      },
      size: {
        control: 'select',
        options: ['xs', 'sm', 'md', 'lg', 'xl']
      },
      dynamic: { control: 'boolean' },
      disabled: { control: 'boolean' },
      hide: { control: 'boolean' },
      animationType: {
        control: 'select',
        options: ['type1', 'type2']
      },
      animationShow: { control: 'boolean' },
      overlay: { control: 'boolean' },
      start: { control: 'boolean' },
      end: { control: 'boolean' },
      high: { control: 'boolean' }
      // :arg-types
    }
  },
  args: {
    ...{
      // [!] System label, cannot be deleted
      // [!] Системная метка, нельзя удалять
      // :default
      // :default
    }
  }
} satisfies Meta<typeof Md3Icon>

type Story = StoryObj<typeof meta>;

export default meta

export const Icon: Story = {
  // name: 'Icon',
  args: {}
}
