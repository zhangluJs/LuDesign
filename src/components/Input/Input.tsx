import React, {InputHTMLAttributes, ReactElement, ChangeEvent, useState} from 'react';
import classNames from 'classnames';
import {IconProp} from '@fortawesome/fontawesome-svg-core';
import Icon from '../Icon/icon';

export type InputSize = 'lg' | 'sm';

/** Omit忽略某个值 */
export interface InputProps extends Omit<InputHTMLAttributes<HTMLElement>, 'size'> {
    /**是否禁用 Input */
    disabled?: boolean;
    /**设置 input 大小，支持 lg 或者是 sm */
    size?: InputSize;
    /**添加图标，在右侧悬浮添加一个图标，用于提示 */
    icon?: IconProp;
    /**添加前缀 用于配置一些固定组合 */
    prepend?: string | ReactElement;
    /**添加后缀 用于配置一些固定组合 */
    append?: string | ReactElement;
    className?: string;
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
};

/**
 * Input 输入框 通过鼠标或键盘输入内容，是最基础的表单域的包装。
 * 
 * ~~~js
 * // 这样引用
 * import { Input } from 'lu-design'
 * ~~~
 * 
 * 支持 HTMLInput 的所有基本属性
 */
export const Input: React.FC<InputProps> = (props) => {
    // 取出所有的属性
    const {
        size,
        disabled,
        className,
        icon,
        prepend,
        append,
        style,
        ...restProps
    } = props;
    // 根据属性计算不同的classnames
    const classes = classNames('lu-input-wrapper', className, {
        [`input-size-${size}`]: size,
        'is-disabled': disabled,
        'input-group': prepend || append,
        'input-group-append': !!append,
        'input-group-prepend': !!prepend
    })

    const fixControlledValue = (val: any) => {
        if (val === '' || !val) {
            return '';
        }
        return val;
    }

    if ('value' in props) {
        // 这里这个判断是为了处理组件上同时有value与defaultvalue导致的错误
        // 当有value的时候删除掉defaultValue
        delete restProps.defaultValue;
        // 这个是为了给useState一个合法的初始化空值
        restProps.value = fixControlledValue(props.value);
    }

    return (
        // 根据属性判断是否添加不同的节点
        <div className={classes} style={style}>
            {
                prepend
                && <div className="lu-input-group-prepend">{prepend}</div>
            }
            {
                icon
                && <div className="icon-wrapper">
                    <Icon icon={icon} title={`title-${icon}`}/>
                </div>
            }
            <input
                className="lu-input-inner"
                type='text'
                disabled={disabled}
                {...restProps} />
            {
                append
                && <div className="lu-input-group-append">{append}</div>
            }
        </div>
    )
}

export default Input;