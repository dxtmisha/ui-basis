import type { Meta, StoryObj } from '@storybook/vue3'

import Md3Icon from './Md3Icon.vue'
import { stories } from '../stories'

import { active, disabled, hide, icon, turn } from '../stories/argTypes'

// More on how to set up stories at: https://storybook.js.org/docs/vue/writing-stories/introduction
const meta = {
  ...stories,
  title: 'Md3/Md3Icon',
  component: Md3Icon,
  tags: ['autodocs'],
  argTypes: {
    icon,
    iconActive: icon,
    active,
    turn,
    disabled,
    hide,
    ...{
      // :arg-style
      // [!] System label, cannot be deleted
      // [!] Системная метка, нельзя удалять
      // :arg-types
      rounded: {
        control: 'select',
        options: ['none', 'standard', 'sm', 'md', 'lg', 'xl', '2xl', 'full'],
        table: {
          category: 'Styles',
          type: { summary: 'none | standard | sm | md | lg | xl | 2xl | full' }
        }
      },
      size: {
        control: 'select',
        options: ['xs', 'sm', 'md', 'lg', 'xl'],
        table: {
          category: 'Styles',
          type: { summary: 'xs | sm | md | lg | xl' }
        }
      },
      dynamic: {
        control: 'boolean',
        table: {
          category: 'Styles',
          type: { summary: 'boolean' }
        }
      },
      animationType: {
        control: 'select',
        options: ['type1', 'type2'],
        table: {
          category: 'Styles',
          type: { summary: 'type1 | type2' }
        }
      },
      animationShow: {
        control: 'boolean',
        table: {
          category: 'Styles',
          type: { summary: 'boolean' }
        }
      },
      overlay: {
        control: 'boolean',
        table: {
          category: 'Styles',
          type: { summary: 'boolean' }
        }
      },
      start: {
        control: 'boolean',
        table: {
          category: 'Styles',
          type: { summary: 'boolean' }
        }
      },
      end: {
        control: 'boolean',
        table: {
          category: 'Styles',
          type: { summary: 'boolean' }
        }
      },
      high: {
        control: 'boolean',
        table: {
          category: 'Styles',
          type: { summary: 'boolean' }
        }
      }
      // :arg-types
    }
  },
  args: {
    icon: 'home',
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
