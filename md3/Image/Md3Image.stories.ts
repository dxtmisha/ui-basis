import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'

import Md3Image from './Md3Image.vue'

import { icon, onLoad } from '../stories/argTypes'
import { argTypes, images } from './argTypes'

// More on how to set up stories at: https://storybook.js.org/docs/vue/writing-stories/introduction
const meta = {
  title: 'Md3/Md3Image',
  component: Md3Image,
  tags: ['autodocs'],
  parameters: {
    design: 'md3',
    docs: {
      description: {
        component: [
          'A component for working with icons and images.',
          'Компонент для работы с иконками и изображениями.'
        ].join('<br><br>')
      }
    }
  },
  argTypes,
  args: {}
} satisfies Meta<typeof Md3Image>

type Story = StoryObj<typeof meta>;

export default meta

export const Icon: Story = {
  args: {
    value: 'home'
  }
}

export const IconPng: Story = {
  name: 'value=<@...>',
  parameters: {
    docs: {
      description: {
        story: [
          'To use the connected icons, you need to add a sign @ at the beginning',
          'Чтобы использовать подключенные иконки, нужно добавить в начале знак @'
        ].join('<br><br>')
      }
    }
  },
  args: {
    value: icon.options[2]
  }
}

export const File: Story = {
  name: 'value=<File>',
  parameters: {
    docs: {
      description: {
        story: [
          'Support for uploaded images',
          'Поддержка загруженных изображений'
        ].join('<br><br>')
      }
    }
  },
  argTypes: {
    onLoad
  },
  args: {
    value: icon.options[icon.options.length - 1],
    size: 'contain'
  },
  render: (args) => ({
    components: { Md3Image },
    setup () {
      const file = ref<File>()
      const onClick = (event: InputEvent) => (file.value = (event.target as HTMLInputElement)?.files?.[0])

      return {
        args,
        file,
        onClick
      }
    },
    template: `
      <div>
        <div style="position: relative; margin: 8px;">
          <input ref="input" name="file" type="file" @input="onClick"/>
        </div>
        <div style="position: relative; margin: 8px; min-width: 128px; height: 128px;">
          <md3-image
            v-bind="args"
            :value="file"
          />
        </div>
      </div>
    `
  })
}

export const Image: Story = {
  name: 'value=<url>',
  parameters: {
    docs: {
      description: {
        story: [
          'You can specify the full path to the picture or icon',
          'Можно указать полный путь к картинке или иконке'
        ].join('<br><br>')
      }
    }
  },
  args: {
    value: icon.options[icon.options.length - 1]
  }
}

export const ImageCoordinator: Story = {
  name: 'coordinator=<number[]>',
  parameters: {
    docs: {
      description: {
        story: argTypes.coordinator.description
      }
    }
  },
  args: {
    value: icon.options[icon.options.length - 1]
  },
  render: (args) => ({
    components: { Md3Image },
    setup () {
      return { args }
    },
    template: `
      <div style="position: relative; margin: 8px; min-width: 128px; height: 128px;">
        <md3-image
          v-bind="args"
          :coordinator="[0,0,0,0]"
        />
      </div>
      <div style="position: relative; margin: 8px; min-width: 128px; height: 128px;">
        <md3-image
          v-bind="args"
          :coordinator="[25,25,25,25]"
        />
      </div>
      <div style="position: relative; margin: 8px; min-width: 128px; height: 128px;">
        <md3-image
          v-bind="args"
          :coordinator="[0,50,50,0]"
        />
      </div>
      <div style="position: relative; margin: 8px; min-width: 128px; height: 128px;">
        <md3-image
          v-bind="args"
          :coordinator="[50,0,0,50]"
        />
      </div>
    `
  })
}

export const ImageSize: Story = {
  name: 'size=<auto|contain|cover>',
  parameters: {
    docs: {
      description: {
        story: argTypes.size.description
      }
    }
  },
  args: {
    value: icon.options[icon.options.length - 1]
  },
  render: (args) => ({
    components: { Md3Image },
    setup () {
      return { args }
    },
    template: `
      <div style="position: relative; margin: 8px; min-width: 128px; height: 128px;">
        <md3-image
          v-bind="args"
          size="auto"
        />
      </div>
      <div style="position: relative; margin: 8px; min-width: 128px; height: 128px;">
        <md3-image
          v-bind="args"
          size="contain"
        />
      </div>
      <div style="position: relative; margin: 8px; min-width: 128px; height: 128px;">
        <md3-image
          v-bind="args"
          size="cover"
        />
      </div>
    `
  })
}

export const ImageXy: Story = {
  name: 'x=<number>, y=<number>',
  parameters: {
    docs: {
      description: {
        story: argTypes.size.description
      }
    }
  },
  args: {
    value: icon.options[icon.options.length - 1],
    size: '128%'
  },
  render: (args) => ({
    components: { Md3Image },
    setup () {
      return { args }
    },
    template: `
      <div style="position: relative; margin: 8px; min-width: 128px; height: 128px;">
        <md3-image
          v-bind="args"
          x="25%"
          y="0%"
        />
      </div>
      <div style="position: relative; margin: 8px; min-width: 128px; height: 128px;">
        <md3-image
          v-bind="args"
          x="0%"
          y="25%"
        />
      </div>
      <div style="position: relative; margin: 8px; min-width: 128px; height: 128px;">
        <md3-image
          v-bind="args"
          x="25%"
          y="25%"
        />
      </div>
    `
  })
}

export const ImageAdaptive: Story = {
  name: 'adaptive=true',
  parameters: {
    docs: {
      description: {
        story: argTypes.adaptive.description
      }
    }
  },
  args: {
    value: icon.options[icon.options.length - 1],
    adaptive: true
  },
  render: (args) => ({
    components: { Md3Image },
    setup () {
      return { args }
    },
    template: `
      <div style="position: relative; margin: 8px 0; min-width: 192px; height: 192px;">
        <md3-image
          v-bind="args"
          :object-width="70.9"
          :object-height="146.3"
          value="${images.galaxy_s23}"
        />
      </div>
      <div style="position: relative; margin: 8px 0; min-width: 192px; height: 192px;">
        <md3-image
          v-bind="args"
          :object-width="76.2"
          :object-height="157.8"
          value="${images.galaxy_s23p}"
        />
      </div>
      <div style="position: relative; margin: 8px 0; min-width: 192px; height: 192px;">
        <md3-image
          v-bind="args"
          :object-width="71.9"
          :object-height="165.1"
          value="${images.galaxy_z_flip5}"
        />
      </div>
      <div style="position: relative; margin: 8px 0; min-width: 192px; height: 192px;">
        <md3-image
          v-bind="args"
          :object-width="129.9"
          :object-height="154.9"
          value="${images.galaxy_z_fold5}"
        />
      </div>
    `
  })
}
