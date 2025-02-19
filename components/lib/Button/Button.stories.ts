import type { Meta, StoryObj } from '@storybook/react';

import { Button } from './Button';

const meta = {
  title: 'components/lib/Button',
  component: Button,
} satisfies Meta<typeof Button>;

export default meta;

type TStory = StoryObj<typeof meta>;

export const Default: TStory = {
  args: {
    children: 'Click me',
  },
};

export const Primary: TStory = {
  args: {
    children: 'Click me',
    color: 'primary',
  },
};

export const Secondary: TStory = {
  args: {
    children: 'Click me',
    color: 'secondary',
  },
};

export const Tertiary: TStory = {
  args: {
    children: 'Click me',
    color: 'tertiary',
  },
};

export const Outlined: TStory = {
  args: {
    children: 'Click me',
    color: 'outlined',
  },
};

export const Loading: TStory = {
  args: {
    loading: true,
    children: 'Button',
  },
};

export const Disabled: TStory = {
  args: {
    disabled: true,
    children: 'Button',
  },
};
