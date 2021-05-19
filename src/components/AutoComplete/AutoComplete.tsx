import React, { ChangeEvent, ReactElement, useState, useEffect, KeyboardEvent} from 'react';
import classNames from 'classnames';
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

    const [highlightIndex, setHighlightIndex] = useState(-1);

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
        setHighlightIndex(-1);
    }, [deBounceValue]);

    const hightligh = (index: number) => {
        if (index < 0) {
            index = 0;
        }
        if (index >= suggestions.length) {
            index = suggestions.length - 1;
        }
        setHighlightIndex(index);
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.trim();
        setInputValue(value);
    }

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        switch(e.keyCode) {
            case 13:
                if (suggestions[highlightIndex]) {
                    handleSelect(suggestions[highlightIndex]);
                }
                break;
            case 38:
                hightligh(highlightIndex - 1)
                break;
            case 40:
                hightligh(highlightIndex + 1)
                break;
            case 27:
                setSuggestions([]);
                break;
            default:
                break;
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
                       const cnames = classNames('suggestion-item', {
                           'item-highlighted': index === highlightIndex
                       })
                       return (
                           <li key={index} className={cnames} onClick={() => {handleSelect(item)}}>
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
                onKeyDown={handleKeyDown}
                {...restPorps}></Input>
            {loading && <ul><Icon icon="spinner" spin /></ul>}
            {(suggestions.length > 0) && generateDropdown()}
        </div>
    );
}

export default AutoComplete;