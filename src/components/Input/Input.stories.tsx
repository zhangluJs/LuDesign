import React, { useState } from 'react';
import {storiesOf} from '@storybook/react';
import {action} from '@storybook/addon-actions';
import {Input} from './Input';

const defaultInput = () => (
    <Input
        placeholder="default Input"
        onChange={action('changed')}
    />
)
const disabledInput = () => (
    <Input
        placeholder="disabled input"
        disabled 
    />
)

const iconInput = () => (
    <Input
        placeholder="input with icon"
        icon="search"
    />  
)

const sizeInput = () => (
    <div>
        <Input
        defaultValue="large size"
        size="lg" />
        <Input
        placeholder="small size"
        size="sm" />
    </div>
)

const pandInput = () => (
    <div>
        <Input
        defaultValue="prepend text"
        prepend="https://" />
        <Input
        defaultValue="google"
        append=".com" />
    </div>
)


storiesOf('Input', module)
  .add('Input', defaultInput)
  .add('disabledInput', disabledInput)
  .add('IconInput', iconInput)
  .add('sizeInput', sizeInput)
  .add('pandInput', pandInput)
