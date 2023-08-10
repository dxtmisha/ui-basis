import type { Meta, StoryObj } from '@storybook/vue3'

import Md3Icon from './Md3Icon.vue'

import { icon } from '../../constructors/stories/argTypes'
import { argTypes } from './argTypes'
import { onMounted, onUnmounted, ref } from 'vue'

// More on how to set up stories at: https://storybook.js.org/docs/vue/writing-stories/introduction
const meta = {
  title: 'Md3/Md3Icon',
  component: Md3Icon,
  tags: ['autodocs'],
  parameters: {
    design: 'md3',
    docs: {
      description: {
        component: [
          'A component for working with icons and avatars.',
          'Компонент для работы с иконками и аватарами.'
        ].join('<br><br>')
      }
    }
  },
  argTypes,
  args: {
    icon: 'home'
  }
} satisfies Meta<typeof Md3Icon>

type Story = StoryObj<typeof meta>;

export default meta

export const Icon: Story = {}

export const IconActive: Story = {
  name: 'active=true',
  parameters: {
    docs: {
      description: {
        story: argTypes.active.description
      }
    }
  },
  args: {
    iconActive: 'face'
  },
  render: (args) => ({
    components: { Md3Icon },
    setup () {
      const active = ref(false)
      let time: NodeJS.Timeout

      onMounted(() => {
        time = setInterval(() => (active.value = !active.value), 1000)
      })

      onUnmounted(() => clearInterval(time))

      return {
        args,
        active
      }
    },
    template: `
      <md3-icon v-bind="args" :active="active"/>
    `
  })
}

export const ImageSize: Story = {
  name: 'size=<string>',
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

export const IconOverlay: Story = {
  name: 'overlay=true',
  parameters: {
    docs: {
      description: {
        story: argTypes.overlay.description
      }
    }
  },
  args: {
    overlay: true
  }
}

export const IconDynamic: Story = {
  name: 'dynamic=true',
  parameters: {
    docs: {
      description: {
        story: argTypes.dynamic.description
      }
    }
  },
  args: {
    dynamic: true
  }
}

export const ImageAnimationType: Story = {
  name: 'animation-type=<type1|type2>',
  parameters: {
    docs: {
      description: {
        story: argTypes.animationType.description
      }
    }
  },
  args: {
    icon: icon.options[icon.options.length - 1],
    size: 'md'
  },
  render: (args) => ({
    components: { Md3Icon },
    setup () {
      const hide = ref(false)
      let time: NodeJS.Timeout

      onMounted(() => {
        time = setInterval(() => (hide.value = !hide.value), 1000)
      })

      onUnmounted(() => clearInterval(time))

      return {
        args,
        hide
      }
    },
    template: `
      <div style="display: flex; align-items: center; justify-content: flex-start; width: 64px; height: 64px;">
        <md3-icon v-bind="args" :hide="hide" animation-type="type1"/>
      </div>
      <div style="display: flex; align-items: center; justify-content: flex-start; width: 64px; height: 64px;">
        <md3-icon v-bind="args" :hide="hide" animation-type="type2"/>
      </div>
    `
  })
}
