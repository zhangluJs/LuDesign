import React from 'react';
import {Story, Meta} from '@storybook/react';
import Icon, {IconProps} from './icon';

export default {
    title: 'Icon',
    component: Icon,
} as Meta;

const Template: Story<IconProps> = (args) => <Icon {...args} />;

export const Success = Template.bind({});
Success.args = {
    theme: 'success',
    icon: 'arrow-down',
    size: '1x'
};

export const Warning = Template.bind({});
Warning.args = {
    theme: 'warning',
    icon: 'arrow-down',
    size: '10x'
};