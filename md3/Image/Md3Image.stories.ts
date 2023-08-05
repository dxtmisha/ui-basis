import type { Meta, StoryObj } from '@storybook/vue3'

import Md3Image from './Md3Image.vue'
import { stories } from '../stories'

import { disabled, hide, icon, turn } from '../stories/argTypes'

const images = {
  galaxy_s23: require('../stories/images/galaxy_s23.png'),
  galaxy_s23p: require('../stories/images/galaxy_s23p.png'),
  galaxy_z_flip5: require('../stories/images/galaxy_z_flip5.png'),
  galaxy_z_fold5: require('../stories/images/galaxy_z_fold5.png')
}

// More on how to set up stories at: https://storybook.js.org/docs/vue/writing-stories/introduction
const meta = {
  ...stories,
  title: 'Md3/Md3Image',
  component: Md3Image,
  tags: ['autodocs'],
  argTypes: {
    value: icon,
    turn,
    disabled,
    hide,
    coordinator: {
      control: 'object',
      description: 'An array of 1 to 4 values. Responsible for cropping the image<br><br>' +
        'Массив из от 1 до 4 значения. Отвечает за кроп изображения',
      table: {
        category: 'Image',
        type: { summary: 'number[]' }
      }
    },
    size: {
      control: 'select',
      options: [
        'auto',
        'contain',
        'cover'
      ],
      description: 'The property sets the size of the element\'s background image. The image can be left to its natural size, stretched, or constrained to fit the available space<br><br>' +
        'Значение позволяет задавать размер фонового изображения. Изображение может быть оставлено в исходном размере, растянуто, или подогнано под размеры доступного пространства',
      table: {
        category: 'Image',
        defaultValue: { summary: 'auto' },
        type: { summary: 'auto | contain | cover' }
      }
    },
    x: {
      control: 'text',
      description: 'The property sets the initial horizontal position for each background image.<br><br>' +
        'Свойство, которое устанавливает начальную горизонтальную позицию для каждого фонового изображения',
      table: {
        category: 'Image',
        type: { summary: 'number | string' }
      }
    },
    y: {
      control: 'text',
      description: 'The property sets the initial vertical position for each background image<br><br>' +
        'Свойство устанавливает начальную позицию по вертикали для каждого фонового изображения',
      table: {
        category: 'Image',
        type: { summary: 'number | string' }
      }
    },
    adaptive: {
      control: 'boolean',
      description: 'Responsible for aligning the size of the image relative to other images, orienting by their physical size<br><br>' +
        'Отвечает за выравнивание размера изображения относительно других изображений, ориентируясь на их физический размер',
      table: {
        category: 'Adaptive',
        type: { summary: 'boolean' }
      }
    },
    adaptiveGroup: {
      control: 'text',
      description: 'Group name<br><br>Название группы',
      table: {
        category: 'Adaptive',
        defaultValue: { summary: 'main' },
        type: { summary: 'string' }
      }
    },
    adaptiveAlways: {
      control: 'boolean',
      description: 'Always reads the size for alignment, regardless of the display location<br><br>' +
        'Всегда вычитывает размер для выравнивания, независимо от места отображения',
      table: {
        category: 'Adaptive',
        type: { summary: 'boolean' }
      }
    },
    objectWidth: {
      control: 'number',
      description: 'Physical size of the object (width)<br><br>' +
        'Физический размер объекта (ширина)',
      table: {
        category: 'Adaptive',
        type: { summary: 'number' }
      }
    },
    objectHeight: {
      control: 'number',
      description: 'Physical size of the object (height)<br><br>' +
        'Физический размер объекта (высота)',
      table: {
        category: 'Adaptive',
        type: { summary: 'number' }
      }
    }
  },
  args: {
    value: 'home'
  },
  decorators: [
    () => ({
      template: `
        <div style="display: inline-flex; align-items: center; justify-content: center; gap: 8px; position: relative; min-width: 128px; min-height: 128px; border: 1px solid;">
          <story/>
        </div>
      `
    })
  ]
} satisfies Meta<typeof Md3Image>

type Story = StoryObj<typeof meta>;

export default meta

export const Icon: Story = {
  name: 'Icon, value=home',
  args: {
    value: 'home'
  }
}

export const IconPng: Story = {
  name: 'Icon, value=<@...>',
  args: {
    value: icon.options[2]
  }
}

export const Image: Story = {
  name: 'Image, value=<url>',
  args: {
    value: icon.options[icon.options.length - 1]
  }
}

export const ImageCoordinator: Story = {
  name: 'Image, coordinator=[0, 50, 50, 0]',
  args: {
    value: icon.options[icon.options.length - 1],
    coordinator: [0, 50, 50, 0]
  }
}

export const ImageAdaptive: Story = {
  name: 'Image, adaptive=true',
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
