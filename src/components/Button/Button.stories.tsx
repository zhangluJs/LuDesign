import React from 'react';
import {Story, Meta} from '@storybook/react';
import Button, {ButtonProps} from './button';

export default {
    title: 'Button',
    component: Button,
} as Meta;

const Template: Story<ButtonProps> = (args) => <Button {...args} />;

export const Default = Template.bind({});
Default.args = {
    children: 'default Button'
};

export const Large = Template.bind({});
Large.args = {
    size: 'lg',
    children: 'large Button'
};

export const Primary = Template.bind({});
Primary.args = {
    btnType: 'primary',
    children: 'primary Button'
};

export const Link = Template.bind({});
Link.args = {
    btnType: 'link',
    children: 'link Button',
    href: 'https://wwww.baidu.com'
};