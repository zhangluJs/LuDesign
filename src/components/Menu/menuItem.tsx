import React, {useContext} from 'react';
import classNames from 'classnames';
import {MenuContext} from './menu';

export interface MenuItemProps {
    index?: string;
    disabled?: boolean;
    className?: string;
    style?: React.CSSProperties;
}

const MenuItem: React.FC<MenuItemProps> = (props) => {
    const {
        index,
        disabled,
        className,
        style,
        children
    } = props;

    const context = useContext(MenuContext);

    const classes = classNames('menu-item', className, {
        'is-disabled': disabled,
        'is-actived': context.index === index
    })

    function handleClick() {
        if (context.onSelect && !disabled && (typeof index === 'string')) {
            context.onSelect(index);
        }
    }

    return (
        <li
            onClick={handleClick}
            className={classes}
            style={style}>
            {children}
        </li>
    )
}

/**
 * react 自带的静态属性
 * 声明这个name供父组件判断传入的children是否正确
 */
MenuItem.displayName = 'MenuItem';

export default MenuItem;