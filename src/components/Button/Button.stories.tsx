import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Button, ButtonThemes, ButtonSize, ButtonProps } from './Button';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Mesita/Button',
  component: Button,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof Button>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const Dark = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Dark.args = {
  theme: ButtonThemes.Dark,
  size: ButtonSize.Regular,
  children: 'Button',
};

export const Light = Template.bind({});
Light.args = {
  theme: ButtonThemes.Light,
  size: ButtonSize.Regular,
  children: 'Button',
};

export const Large = Template.bind({});
Large.args = {
  theme: ButtonThemes.Dark,
  size: ButtonSize.Large,
  children: 'Button',
};
