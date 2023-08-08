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

type Story = StoryObj<typeof meta>;

export default meta

export const Button: Story = {}

export const ButtonIcon: Story = {
  name: 'icon=<string>',
  render: (args) => ({
    components: { Md3Button },
    setup () {
      return { args }
    },
    template: `
      <md3-button v-bind="args" icon="${icon.options[1]}" :label="undefined"/>
      <md3-button v-bind="args" icon="${icon.options[1]}"/>
      <md3-button v-bind="args" icon="${icon.options[3]}"/>
      <md3-button v-bind="args" icon="${icon.options[icon.options.length - 2]}"/>
    `
  })
}

export const ButtonIconTrailing: Story = {
  name: 'icon-trailing=<string>',
  render: (args) => ({
    components: { Md3Button },
    setup () {
      return { args }
    },
    template: `
      <md3-button v-bind="args" icon-trailing="${icon.options[0]}" :label="undefined"/>
      <md3-button v-bind="args" icon-trailing="${icon.options[0]}"/>
      <md3-button v-bind="args" icon-trailing="${icon.options[2]}"/>
      <md3-button v-bind="args" icon-trailing="${icon.options[icon.options.length - 1]}"/>
    `
  })
}

export const ButtonIconIconTrailing: Story = {
  name: 'icon=<string>, icon-trailing=<string>',
  render: (args) => ({
    components: { Md3Button },
    setup () {
      return { args }
    },
    template: `
      <md3-button v-bind="args" icon="${icon.options[1]}" icon-trailing="${icon.options[0]}" :label="undefined"/>
      <md3-button v-bind="args" icon="${icon.options[1]}" icon-trailing="${icon.options[0]}"/>
      <md3-button v-bind="args" icon="${icon.options[3]}" icon-trailing="${icon.options[2]}"/>
      <md3-button v-bind="args" icon="${icon.options[icon.options.length - 2]}"
                  icon-trailing="${icon.options[icon.options.length - 1]}"/>
    `
  })
}

export const ButtonIconTurn: Story = {
  name: 'icon-turn=true',
  args: {
    iconTrailing: icon.options[0]
  },
  parameters: {
    docs: {
      description: { story: argTypes.iconTurn.description }
    }
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
  args: {
    icon: icon.options[1]
  },
  parameters: {
    docs: {
      description: { story: argTypes.iconHide.description }
    }
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

export const ButtonFocus: Story = {
  name: 'focus=true',
  args: {
    icon: icon.options[0],
    focus: true
  },
  render: (args) => ({
    components: { Md3Button },
    setup () {
      return { args }
    },
    template: `
      <md3-button v-bind="args"/>
    `
  })
}

export const ButtonSelected: Story = {
  name: 'selected=true',
  parameters: {
    docs: {
      description: { story: argTypes.selected.description }
    }
  },
  args: {
    icon: icon.options[0],
    selected: true
  },
  render: (args) => ({
    components: { Md3Button },
    setup () {
      return { args }
    },
    template: `
      <md3-button v-bind="args"/>
    `
  })
}

export const ButtonProgress: Story = {
  name: 'progress=true',
  args: {
    icon: icon.options[1]
  },
  parameters: {
    docs: {
      description: { story: argTypes.progress.description }
    }
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

export const ButtonDisabled: Story = {
  name: 'disabled=true',
  parameters: {
    docs: {
      description: { story: argTypes.selected.description }
    }
  },
  args: {
    icon: icon.options[0],
    disabled: true
  },
  render: (args) => ({
    components: { Md3Button },
    setup () {
      return { args }
    },
    template: `
      <div>
        <div style="display: flex; align-items: center; justify-content: center; gap: 8px;">
          <md3-button v-bind="args"/>
        </div>
        <div style="display: flex; align-items: center; justify-content: center; gap: 8px; padding-top: 8px;">
          <md3-button v-bind="args" selected/>
        </div>
      </div>
    `
  })
}

export const ButtonAdaptive: Story = {
  name: 'adaptive=<string>',
  parameters: {
    docs: {
      description: {
        story: [
          '',
          ''
        ].join('<br><br>')
      }
    }
  },
  render: (args) => ({
    components: { Md3Button },
    setup () {
      return { args }
    },
    template: `
      <md3-button v-bind="args" icon="${icon.options[0]}"/>
      <md3-button v-bind="args" icon="${icon.options[2]}"/>
      <md3-button v-bind="args" icon="${icon.options[icon.options.length - 1]}"/>
    `
  })
}
