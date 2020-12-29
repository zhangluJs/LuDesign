import React, {Children, useContext} from 'react';
import classNames from 'classnames';
import {MenuContext} from './menu';
import {MenuItemProps} from './menuItem';

export interface SubMenuProps {
    index?: number;
    title: string;
    className?: string;
}

const SubMenu: React.FC<SubMenuProps> = ({index, title, children, className}) => {
    const context = useContext(MenuContext);
    const classes = classNames('menu-item submenu-item', className, {
        'is-actived': context.index === index
    });

    const renderChildren = () => {
        const childrenComponent = React.Children.map(children, (child, index) => {
            const childElement = child as React.FunctionComponentElement<MenuItemProps>;
            const {displayName} = childElement.type;
            if (displayName === 'MenuItem') {
                return childElement;
            } else {
                console.error('Warning: SubMenu has a child which is not a MenuItem Component');
            }
        })
        return (
            <ul className="lu-submenu">
                {childrenComponent}
            </ul>
        )
    }

    function handleClick() {
        if (context.onSelect && (typeof index === 'number')) {
            context.onSelect(index);
        }
    }

    return (
        <li
            onClick={handleClick}
            key={index}
            className={classes}>
            <div>{title}</div>
            {renderChildren()}
        </li>
    )
}

SubMenu.displayName = 'SubMenu';

export default SubMenu;