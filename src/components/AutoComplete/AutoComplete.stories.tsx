import React, { ChangeEvent, useState } from 'react';
import {storiesOf} from '@storybook/react';
import {action} from '@storybook/addon-actions';
import AutoComplete, {AutoCompleteProps} from './AutoComplete';
import Input, {InputProps} from '../Input/Input';

const defaultInput = () => {
    const lakers = ['bradley', 'pope', 'caruso', 'cook', 'cousins',
  'james', 'AD', 'green', 'howard', 'kuzma', 'McGee', 'rando'];
    const handleFetch = (value: string) => {
        return lakers.filter(item => item.includes(value));
    }
    return(
        <AutoComplete
            fetchSuggestions={handleFetch}
            onSelect={action('click item')}
        />
    )
}

storiesOf('AutoComplete', module)
    .add('AutoComplete', defaultInput)