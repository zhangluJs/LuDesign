import React, {InputHTMLAttributes, useState} from 'react';
import classNames from 'classnames';
import {IconProp} from '@fortawesome/fontawesome-svg-core';
import Icon from '../Icon/icon';

export type InputSize = 'lg' | 'sm';

/** Omit忽略某个值 */
interface InputProps extends Omit<InputHTMLAttributes<HTMLElement>, 'size'> {
    size?: InputSize;
    disabled?: boolean;
    icon?: IconProp;
    prepand?: string | React.ReactElement;
    append?: string | React.ReactElement;
    className?: string
};

export const Input: React.FC<InputProps> = (props) => {
    // 取出所有的属性
    const {
        size,
        disabled,
        className,
        icon,
        prepand,
        append
    } = props;
    const [inputVal, setInputVal] = useState(0);
    // 根据属性计算不同的classnames
    const classes = classNames('lu-input', className, {
        [`input-${size}`]: size,
        'disabled': disabled
    })

    function handleInput(e: any) {
        if (!disabled) {
            setInputVal(e.target.value);
        }
    }

    return (
        // 根据属性判断是否添加不同的节点
        <div className={classes}>
            {
                prepand
                ? <div className="prepend">{prepand}</div>
                : ''
            }
            <input type='text' value={inputVal} onChange={handleInput}/>
            {
                append ? append : ''
            }
        </div>
    )
}

export default Input;