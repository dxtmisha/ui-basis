import type { Meta, StoryObj } from '@storybook/vue3'

import Md3Icon from './Md3Icon.vue'
import { stories } from '../stories'

import { active, disabled, hide, icon, onLoad, turn } from '../stories/argTypes'

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
    },
    onLoad
  },
  args: {
    icon: 'home'
  },
  decorators: [
    () => ({
      template: `
        <div style="display: inline-flex; align-items: center; justify-content: center; gap: 8px;">
          <story/>
        </div>
      `
    })
  ]
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
