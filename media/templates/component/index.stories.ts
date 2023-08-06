import type { Meta, StoryObj } from '@storybook/vue3'

import DesignComponent from './index.vue'

import { main } from '../stories/main'
import { argTypes } from './argTypes'

// More on how to set up stories at: https://storybook.js.org/docs/vue/writing-stories/introduction
const meta = {
  ...main,
  title: 'Design/DesignComponent',
  component: DesignComponent,
  tags: ['autodocs'],
  argTypes,
  args: {}
} satisfies Meta<typeof DesignComponent>

type Story = StoryObj<typeof meta>;

export default meta

export const Component: Story = {
  // name: 'Component',
  args: {}
}
