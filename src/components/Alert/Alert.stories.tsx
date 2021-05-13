import React from 'react';
import { Story, Meta } from '@storybook/react';

import Alert, {AlertType, close, AlertProps} from './Alert';

export default {
    type: AlertType.Default,
    title: 'Alert',
    showClose: close.Show
} as Meta;

const Template: Story<AlertProps> = (args) => <Alert {...args} />;

export const DefaultAlert = Template.bind({});
DefaultAlert.args = {
    type: AlertType.Default,
    title: '默认的提示',
    showClose: close.Show,
    children: '默认的提示内容'
};

export const DangerAlert = Template.bind({});
DangerAlert.args = {
    type: AlertType.Danger,
    title: '危险的提示',
    showClose: close.Show,
    children: '危险的提示内容'
};

export const HiddenClose = Template.bind({});
HiddenClose.args = {
    type: AlertType.Default,
    title: '隐藏关闭按钮',
    showClose: close.Hidden,
    children: '隐藏关闭按钮的提示内容'
};