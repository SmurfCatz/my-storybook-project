// .storybook/main.ts
import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  stories: [
    "../src/stories/**/*.stories.@(js|jsx|ts|tsx)",
    "../src/components/**/*.stories.@(js|jsx|ts|tsx)",
  ],
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-a11y',
    '@storybook/addon-interactions',
    '@storybook/addon-docs',
    'msw-storybook-addon',
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  staticDirs: ['../public'],

  // ใช้ define เพื่อ inject import.meta.env.STORYBOOK
  viteFinal: async (config) => {
    config.define = {
      ...config.define,
      'import.meta.env.STORYBOOK': JSON.stringify('true'),
    };
    return config;
  },
};

export default config;