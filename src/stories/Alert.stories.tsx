import React from 'react';
import { Story, Meta } from '@storybook/react';

import Alert, {AlertType, close, AlertProps} from '../components/Alert/Alert';

export default {
    type: AlertType.Default,
    title: 'Alert',
    showClose: close.Show
} as Meta;

const Template: Story<AlertProps> = (args) => <Alert {...args} />;

export const dangerAlert = Template.bind({});
dangerAlert.args = {
    type: AlertType.Danger,
    title: '危险的提示',
    showClose: close.Show,
    children: 'asdasdasd'
};