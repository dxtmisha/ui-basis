import type { Meta, StoryObj } from '@storybook/vue3'
import { onMounted, onUnmounted, ref } from 'vue'

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

const chipTypeRender = (args: any) => ({
  components: { Md3Chip },
  setup () {
    return { args }
  },
  template: `
    <div>
      <div style="display: flex; justify-content: center; align-items: center; gap: 8px;">
        <md3-chip v-bind="args" :label="undefined"/>
        <md3-chip v-bind="args" :icon="undefined"/>
        <md3-chip v-bind="args"/>
        <md3-chip v-bind="args" dragged/>
        <md3-chip v-bind="args" selected/>
        <md3-chip v-bind="args" disabled/>
      </div>
      <div style="display: flex; justify-content: center; align-items: center; gap: 8px; padding-top: 16px;">
        <md3-chip v-bind="args" elevated :label="undefined"/>
        <md3-chip v-bind="args" elevated :icon="undefined"/>
        <md3-chip v-bind="args" elevated/>
        <md3-chip v-bind="args" elevated dragged/>
        <md3-chip v-bind="args" elevated selected/>
        <md3-chip v-bind="args" elevated disabled/>
      </div>
    </div>
  `
})

type Story = StoryObj<typeof meta>;

export default meta

export const Chip: Story = {}

export const ChipInput: Story = {
  name: 'Input chips',
  args: {
    icon: icon.options[1]
  },
  render: chipTypeRender
}

export const ChipElevated: Story = {
  name: 'Elevated chips',
  args: {
    icon: icon.options[1],
    elevated: true
  },
  render: chipTypeRender
}

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

export const ChipIconTurn: Story = {
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
    components: { Md3Chip },
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
      <md3-chip v-bind="args" :icon-turn="turn" :label="undefined"/>
      <md3-chip v-bind="args" :icon-turn="turn"/>
    `
  })
}

export const ChipIconHide: Story = {
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
    components: { Md3Chip },
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
      <md3-chip v-bind="args" :icon-hide="hide" :label="undefined"/>
      <md3-chip v-bind="args" :icon-hide="hide"/>
    `
  })
}
