import React from 'react';
import {storiesOf} from '@storybook/react';
import {action} from '@storybook/addon-actions';
import Button from './button';

const defaultButton = () => {
    return (
        <Button onClick={action('clicked')}>
            default button
        </Button>
    );
}

const buttonWithSize = () => {
    return (
        <>
            <Button size='lg' onClick={action('clicked')}>
                Large Button
            </Button>
            <Button size='sm' onClick={action('clicked')}>
                Small Button
            </Button>
        </>
    )
}

const buttonWithType = () => {
    return (
        <>
            <Button btnType="primary" onClick={action('clicked')}>
                Primary Button
            </Button>
            <Button btnType="danger" onClick={action('clicked')}>
                Danger Button
            </Button>
            <Button btnType="link" href="https://www.baidu.com" onClick={action('clicked')}>
                Link Button
            </Button>
        </>
    )
}

storiesOf('Button Component', module)
    .add('默认 Button', defaultButton)
    .add('不同尺寸 Button', buttonWithSize)
    .add('不同类型 Button', buttonWithType)