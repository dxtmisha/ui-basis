import type { StorybookConfig } from '@storybook/vue3-webpack5'

const Properties = require('../classes/services/properties/Properties')

const config: StorybookConfig = {
  stories: [
    '../src/**/*.mdx',
    '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)',
    '../md3/**/*.stories.@(js|jsx|mjs|ts|tsx)'
  ],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-actions',
    '@storybook/addon-interactions',
    {
      name: '@storybook/addon-styling',
      options: {
        sass: {
          implementation: require('sass'),
          additionalData: new Properties(['md2', 'md3']).getScss()
        }
      }
    },
    '@storybook/addon-docs'
  ],
  framework: {
    name: '@storybook/vue3-webpack5',
    options: {},
  },
  docs: {
    autodocs: 'tag',
  },
}

export default config
