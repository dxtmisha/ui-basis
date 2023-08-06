import { ImageIcon } from '../../constructors/Image/ImageIcon'

// Icon

ImageIcon.addByList({
  'market-coffee': require('./icons/market-coffee.png'),
  'market-vegetables': require('./icons/market-vegetables.png')
})

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
    category: 'Icon',
    type: { summary: 'string | File' }
  }
}

// Status

export const status = {
  control: 'boolean',
  table: {
    category: 'Status',
    type: { summary: 'boolean' }
  }
}

export const active = status
export const turn = status
export const disabled = status
export const hide = status

// Events

export const onLoad = {
  action: 'load',
  table: {
    category: 'Events',
    type: { summary: '(image: string | ImageItemType) => void' }
  }
}
