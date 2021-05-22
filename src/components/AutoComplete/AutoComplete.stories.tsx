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

interface GithubUserProps {
    login: string;
    url: string;
    avatar_url: string;
}

const simpleComplete = () => {
    const lakers = ['bradley', 'pope', 'caruso', 'cook', 'cousins',
  'james', 'AD', 'green', 'howard', 'kuzma', 'McGee', 'rando'];
    // const handleFetch = (query: string) => {
    //     return lakers.filter(item => item.includes(query)).map(item => ({value: item}));
    // }
    const handleFetch = (query: string) => {
        return fetch(`https://api.github.com/search/users?q=${query}`).then(res => {
            return res.json();
        }).then(({items}) => {
            return items.slice(0, 10).map(item => ({value: item.login, ...item}))
        });
    }
    const handleRender = (item: DataSourceType) => {
        let itemWithNumber = item as DataSourceType<GithubUserProps>;
        return (
            <div>
                <h5>Name: {itemWithNumber.login}</h5>
                <p>url: {itemWithNumber.url}</p>
            </div>
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

const renderTemplate = () => {
    const handleFetch = (value: string) => {
        return lakersWithNumber.filter(item => item.value.includes(value));
    }
    const handleRender = (item: DataSourceType) => {
        const itemWithNumber = item as DataSourceType<lakersPropsValue>;
        return (
            <h5>Name: {itemWithNumber.value} Age: {itemWithNumber.number}</h5>
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