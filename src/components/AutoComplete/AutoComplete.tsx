import React, { ChangeEvent, ReactElement, useState, useEffect, useDebugValue} from 'react';
import Input, {InputProps} from '../Input/Input';
import Icon from '../Icon/icon';
import useDebounce from '../../hooks/useDebounce';

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
    fetchSuggestions: (str: string) => DataSourceType[] | Promise<DataSourceType[]>;
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
    const [inputValue, setInputValue] = useState(value as string);
    // 用来渲染联系下拉list的数组
    const [suggestions, setSuggestions] = useState<DataSourceType[]>([]);

    const [loading, setLoading] = useState(false);

    const deBounceValue = useDebounce(inputValue, 500);

    useEffect(() => {
        if (deBounceValue) {
            setLoading(true);
            const result = fetchSuggestions(deBounceValue);
            if (result instanceof Promise) {
                result.then(data => {
                    setLoading(false);
                    setSuggestions(data);
                })
            } else {
                setLoading(false);
                setSuggestions(result);
            }
        } else {
            setSuggestions([]);
        }
    }, [deBounceValue]);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.trim();
        setInputValue(value);
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
            {loading && <ul><Icon icon="spinner" spin /></ul>}
            {(suggestions.length > 0) && generateDropdown()}
        </div>
    );
}

export default AutoComplete;