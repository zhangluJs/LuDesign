import React, {useContext} from 'react';
import classNames from 'classnames';
import {MenuContext} from './menu';

export interface MenuItemProps {
    index: number;
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
        if (context.onSelect && !disabled) {
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

export default MenuItem;