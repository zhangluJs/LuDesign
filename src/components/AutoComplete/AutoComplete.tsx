import React, { ChangeEvent, ReactElement, useState } from 'react';
import Input, {InputProps} from '../Input/Input';

/**
 * 因为有可能接收更复杂的数据类型，不能item只是一个string
 * 所以需要将一开始定义的string类型全部更换为复杂的类型（object）
 * 
 */
interface DataSuorctObject {
    value: string
}

// 复杂类型
export type DataSourceType<T = {}> = T & DataSuorctObject;

export interface AutoCompleteProps extends Omit<InputProps, 'onSelect'> {
    fetchSuggestions: (str: string) => DataSourceType[];
    onSelect?: (item: DataSourceType) => void;
    renderOption?: (item: DataSourceType) => ReactElement;
}

const AutoComplete: React.FC<AutoCompleteProps> = (props) => {
    const {
        fetchSuggestions,
        onSelect,
        value,
        renderOption,
        ...restPorps
    } = props;

    // 初始化input的value
    const [inputValue, setInputValue] = useState(value);
    // 用来渲染联系下拉list的数组
    const [suggestions, setSuggestions] = useState<DataSourceType[]>([]);

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

    const handleSelect = (item: DataSourceType) => {
        setInputValue(item.value);
        setSuggestions([]);
        if (onSelect) {
            onSelect(item);
        }
    }

    const renderTemplate = (item: DataSourceType) => {
        return renderOption? renderOption(item) : item.value;
    }

    const generateDropdown = () => {
        return (
            <ul>
                {
                   suggestions.map((item, index) => {
                       return (
                           <li key={index} onClick={() => {handleSelect(item)}}>
                               {renderTemplate(item)}
                           </li>
                       );
                   })
                }
            </ul>
        );
    }

    return (
        <div className="lu-auto-complete">
            <Input
                value={inputValue}
                onChange={handleChange}
                {...restPorps}></Input>
            {(suggestions.length > 0) && generateDropdown()}
        </div>
    );
}

export default AutoComplete;