import type { Meta, StoryObj } from '@storybook/vue3'
import { onMounted, onUnmounted, ref } from 'vue'

import Md3Button from './Md3Button.vue'

import { argTypes } from './argTypes'
import { icon } from '../stories/argTypes'

// More on how to set up stories at: https://storybook.js.org/docs/vue/writing-stories/introduction
const meta = {
  title: 'Md3/Md3Button',
  component: Md3Button,
  tags: ['autodocs'],
  parameters: {
    design: 'md3',
    docs: {
      description: {
        component: [
          '',
          ''
        ].join('<br><br>')
      }
    }
  },
  argTypes,
  args: {
    label: 'Label'
  }
} satisfies Meta<typeof Md3Button>

const buttonTypeRender = (args: any) => ({
  components: { Md3Button },
  setup () {
    return { args }
  },
  template: `
    <md3-button v-bind="args" :label="undefined"/>
    <md3-button v-bind="args" :icon="undefined"/>
    <md3-button v-bind="args"/>
    <md3-button v-bind="args" selected/>
    <md3-button v-bind="args" disabled/>
  `
})

type Story = StoryObj<typeof meta>;

export default meta

export const Button: Story = {}

export const ButtonFilled: Story = {
  name: 'Filled buttons',
  parameters: {
    docs: {
      description: { story: argTypes.filled.description }
    }
  },
  args: {
    icon: icon.options[1],
    filled: true
  },
  render: buttonTypeRender
}

export const ButtonOutlined: Story = {
  name: 'Outlined buttons',
  parameters: {
    docs: {
      description: { story: argTypes.outlined.description }
    }
  },
  args: {
    icon: icon.options[1],
    outlined: true
  },
  render: buttonTypeRender
}

export const ButtonText: Story = {
  name: 'Text buttons',
  parameters: {
    docs: {
      description: { story: argTypes.text.description }
    }
  },
  args: {
    icon: icon.options[1],
    text: true
  },
  render: buttonTypeRender
}

export const ButtonElevated: Story = {
  name: 'Elevated buttons',
  parameters: {
    docs: {
      description: { story: argTypes.elevated.description }
    }
  },
  args: {
    icon: icon.options[1],
    elevated: true
  },
  render: buttonTypeRender
}

export const ButtonTonal: Story = {
  name: 'Tonal buttons',
  parameters: {
    docs: {
      description: { story: argTypes.tonal.description }
    }
  },
  args: {
    icon: icon.options[1],
    tonal: true
  },
  render: buttonTypeRender
}

export const ButtonIcon: Story = {
  name: 'icon=<string>, icon-trailing=<string>',
  render: (args) => ({
    components: { Md3Button },
    setup () {
      return { args }
    },
    template: `
      <md3-button v-bind="args" icon="${icon.options[1]}" :label="undefined"/>
      <md3-button v-bind="args" icon-trailing="${icon.options[0]}" :label="undefined"/>
      <md3-button v-bind="args" icon="${icon.options[1]}" icon-trailing="${icon.options[0]}" :label="undefined"/>
      <md3-button v-bind="args" icon="${icon.options[1]}"/>
      <md3-button v-bind="args" icon-trailing="${icon.options[0]}"/>
      <md3-button v-bind="args" icon="${icon.options[1]}" icon-trailing="${icon.options[0]}"/>
    `
  })
}

export const ButtonIconTurn: Story = {
  name: 'icon-turn=true',
  parameters: {
    docs: {
      description: { story: argTypes.iconTurn.description }
    }
  },
  args: {
    iconTrailing: icon.options[0]
  },
  render: (args) => ({
    components: { Md3Button },
    setup () {
      const turn = ref(false)
      let time: NodeJS.Timeout

      onMounted(() => {
        time = setInterval(() => (turn.value = !turn.value), 1000)
      })

      onUnmounted(() => clearInterval(time))

      return {
        args,
        turn
      }
    },
    template: `
      <md3-button v-bind="args" :icon-turn="turn" :label="undefined"/>
      <md3-button v-bind="args" :icon-turn="turn"/>
    `
  })
}

export const ButtonIconHide: Story = {
  name: 'icon-hide=true',
  parameters: {
    docs: {
      description: { story: argTypes.iconHide.description }
    }
  },
  args: {
    icon: icon.options[1]
  },
  render: (args) => ({
    components: { Md3Button },
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
      <md3-button v-bind="args" :icon-hide="hide" :label="undefined"/>
      <md3-button v-bind="args" :icon-hide="hide"/>
    `
  })
}

export const ButtonProgress: Story = {
  name: 'progress=true',
  parameters: {
    docs: {
      description: { story: argTypes.progress.description }
    }
  },
  args: {
    icon: icon.options[1]
  },
  render: (args) => ({
    components: { Md3Button },
    setup () {
      const progress = ref(false)
      let time: NodeJS.Timeout

      onMounted(() => {
        time = setInterval(() => (progress.value = !progress.value), 2000)
      })

      onUnmounted(() => clearInterval(time))

      return {
        args,
        progress
      }
    },
    template: `
      <md3-button v-bind="args" :progress="progress" :label="undefined"/>
      <md3-button v-bind="args" :progress="progress"/>
    `
  })
}

export const ButtonAdaptive: Story = {
  name: 'adaptive=<icon|sm|md>',
  parameters: {
    docs: {
      description: {
        story: argTypes.adaptive.description
      }
    }
  },
  args: {
    icon: icon.options[1]
  },
  render: (args) => ({
    components: { Md3Button },
    setup () {
      return { args }
    },
    template: `
      <md3-button v-bind="args" adaptive="icon" label="icon"/>
      <md3-button v-bind="args" adaptive="sm" label="sm"/>
      <md3-button v-bind="args" adaptive="md" label="md"/>
    `
  })
}
