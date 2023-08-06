import type { Meta, StoryObj } from '@storybook/vue3'

import DesignComponent from './index.vue'
import { stories } from '../stories'

// More on how to set up stories at: https://storybook.js.org/docs/vue/writing-stories/introduction
const meta = {
  ...stories,
  title: 'Design/DesignComponent',
  component: DesignComponent,
  tags: ['autodocs'],
  argTypes: {
    ...{
      // [!] System label, cannot be deleted
      // [!] Системная метка, нельзя удалять
      // :arg-types
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
} satisfies Meta<typeof DesignComponent>

type Story = StoryObj<typeof meta>;

export default meta

export const Component: Story = {
  // name: 'Component',
  args: {}
}
