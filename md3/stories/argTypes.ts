import { ImageIcon } from '../../constructors/Image/ImageIcon'

export const category = {
  event: 'Events',
  icon: 'Icons',
  option: 'Options',
  status: 'Status',
  style: 'Styles',
  value: 'Values'
}

ImageIcon.addByList({
  'market-coffee': require('./icons/market-coffee.png'),
  'market-vegetables': require('./icons/market-vegetables.png')
})

// Values

export const label = {
  control: 'text',
  table: {
    category: category.value,
    type: { summary: 'string | number' }
  }
}

export const icon = {
  control: 'select',
  options: [
    'search',
    'home',
    '@market-coffee',
    '@market-vegetables',
    'https://drscdn.500px.org/photo/294267357/q%3D80_m%3D2000/v2?sig=03989c1970e5921d8ab67b23e03e79b8db13b7e7d3bc3f72829cc9eecbb42cf4',
    'https://drscdn.500px.org/photo/292683549/q%3D80_m%3D2000/v2?sig=bcf16bbbd7b11052a17012bf2be91a0c95edb8d0a45f2928ab72b027ca30fb85'
  ],
  table: {
    category: category.icon,
    type: { summary: 'string | File' }
  }
}

export const value = {
  control: 'object',
  table: {
    category: category.value,
    type: { summary: 'string | number | object' }
  }
}

export const detail = {
  control: 'object',
  description: 'Additional data that can be passed to events<br><br>Дополнительные данные, которые можно передать в события',
  table: {
    category: category.value,
    type: { summary: 'object' }
  }
}

// Status

export const status = {
  control: 'boolean',
  table: {
    category: category.status,
    type: { summary: 'boolean' }
  }
}

export const active = status
export const selected = {
  ...status,
  description: 'Translate into the selection state<br><br>Перевести в состояние выделения'
}
export const focus = status
export const dragged = status
export const turn = status
export const progress = {
  ...status,
  description: 'Enable the bootloader<br><br>Включить загрузчик'
}
export const disabled = status
export const hide = status

// Options

export const tagForButton = {
  control: 'select',
  options: ['button', 'a', 'span'],
  table: {
    category: category.option,
    defaultValue: { summary: 'button' },
    type: { summary: 'button | a | span' }
  }
}

export const tagForChip = {
  ...tagForButton,
  table: {
    ...tagForButton.table,
    defaultValue: { summary: 'span' }
  }
}

// Events

export const onLoad = {
  action: 'load',
  table: {
    category: category.event,
    type: { summary: '(image: string | ImageItemType) => void' }
  }
}

export const onClick = {
  action: 'click',
  table: {
    category: category.event,
    type: { summary: '(event: MouseEvent, options: ButtonEventType) => void' }
  }
}
