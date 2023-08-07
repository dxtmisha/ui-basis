import { disabled, hide, icon, turn } from '../stories/argTypes'

export const argTypes = {
  // [!] System label, cannot be deleted
  // [!] Системная метка, нельзя удалять
  // :arg-basic
  value: icon,
  turn,
  disabled,
  hide,
  coordinator: {
    control: 'object',
    description: 'An array of 1 to 4 values. Responsible for cropping the image<br><br>Массив из от 1 до 4 значения. Отвечает за кроп изображения',
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
  },
  // :arg-basic
  ...{
    // [!] System label, cannot be deleted
    // [!] Системная метка, нельзя удалять
    // :arg-types
    // :arg-types
  }
}

export const images = {
  galaxy_s23: require('../stories/images/galaxy_s23.png'),
  galaxy_s23p: require('../stories/images/galaxy_s23p.png'),
  galaxy_z_flip5: require('../stories/images/galaxy_z_flip5.png'),
  galaxy_z_fold5: require('../stories/images/galaxy_z_fold5.png')
}
