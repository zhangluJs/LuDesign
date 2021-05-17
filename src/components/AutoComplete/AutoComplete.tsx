import React, { ChangeEvent, useState } from 'react';
import Input, {InputProps} from '../Input/Input';

export interface AutoCompleteProps extends Omit<InputProps, 'onSelect'> {
    fetchSuggestions: (str: string) => string[];
    onSelect?: (item: string) => void;
}

const AutoComplete: React.FC<AutoCompleteProps> = (props) => {
    const {
        fetchSuggestions,
        onSelect,
        value,
        ...restPorps
    } = props;

    // 初始化input的value
    const [inputValue, setInputValue] = useState(value);
    // 用来渲染联系下拉list的数组
    const [suggestions, setSuggestions] = useState<string[]>([]);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.trim();
        setInputValue(value);
        if (value) {
            const result = fetchSuggestions(value);
            setSuggestions(result);
        } else {
            setSuggestions([]);
        }
    }

    const handleSelect = (item: string) => {
        setInputValue(item);
        setSuggestions([]);
        if (onSelect) {
            onSelect(item);
        }
    }

    const generateDropdown = () => {
        return (
            <ul>
                {
                   suggestions.map((item, index) => {
                       return (
                           <li key={index} onClick={() => {handleSelect(item)}}>
                               {item}
                           </li>
                       )
                   }) 
                }
            </ul>
        )
    }

    return (
        <div className="lu-auto-complete">
            <Input
                value={inputValue}
                onChange={handleChange}
                {...restPorps}></Input>
            {(suggestions.length > 0) && generateDropdown()}
        </div>
    )
}

export default AutoComplete;