import React, { ChangeEvent, useState } from 'react';
import {storiesOf} from '@storybook/react';
import {action} from '@storybook/addon-actions';
import AutoComplete, {AutoCompleteProps, DataSourceType} from './AutoComplete';
import Input, {InputProps} from '../Input/Input';

const lakersWithNumber = [
    {value: 'bradley', number: 11},
    {value: 'pope', number: 1},
    {value: 'caruso', number: 4},
    {value: 'cook', number: 2},
    {value: 'cousins', number: 15},
    {value: 'james', number: 23},
    {value: 'AD', number: 3},
    {value: 'green', number: 14},
    {value: 'howard', number: 39},
    {value: 'kuzma', number: 0},
];

interface lakersPropsValue {
    value: string,
    number: number
}

const simpleComplete = () => {
    const lakers = ['bradley', 'pope', 'caruso', 'cook', 'cousins',
  'james', 'AD', 'green', 'howard', 'kuzma', 'McGee', 'rando'];
    const handleFetch = (value: string) => {
        return lakers.filter(item => item.includes(value)).map(item => ({value: item}));
    }
    return (
        <AutoComplete
            fetchSuggestions={handleFetch}
            onSelect={action('click item')}
        />
    )
}

const renderTemplate = () => {
    const handleFetch = (value: string) => {
        return lakersWithNumber.filter(item => item.value.includes(value));
    }
    const handleRender = (item: DataSourceType) => {
        const itemWithNumber = item as DataSourceType<lakersPropsValue>;
        return (
            <h5>Name: {itemWithNumber.value} {itemWithNumber.number}</h5>
        )
    }
    return (
        <AutoComplete
            fetchSuggestions={handleFetch}
            onSelect={action('click item')}
            renderOption={handleRender}
        />
    )
}

storiesOf('AutoComplete', module)
    .add('AutoComplete', simpleComplete)
    .add('customTemplate', renderTemplate)