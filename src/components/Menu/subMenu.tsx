import React, {Children, useContext, useState} from 'react';
import classNames from 'classnames';
import {CSSTransition} from 'react-transition-group';

import {MenuContext} from './menu';
import {MenuItemProps} from './menuItem';
import Icon from '../Icon/icon';


export interface SubMenuProps {
    index?: string;
    title: string;
    className?: string;
}

const SubMenu: React.FC<SubMenuProps> = ({index, title, children, className}) => {
    const context = useContext(MenuContext);
    const opendSubMenus = context.defaultSubMenus as string[];
    const isOpend = (index && context.mode === 'vertical') ? opendSubMenus.includes(index) : false;
    const [menuOpen, setMenuOpen] = useState(isOpend);
    const classes = classNames('menu-item submenu-item', className, {
        'is-actived': context.index === index,
        'is-opened': menuOpen,
        'is-vertical': context.mode === 'vertical'
    });

    function isOpenSubMenu(e: React.MouseEvent) {
        e.preventDefault();
        setMenuOpen(!menuOpen);
    }

    let timer: any;
    function handleMouse(e: React.MouseEvent, toggle: boolean) {
        clearTimeout(timer);
        e.preventDefault();
        timer = setTimeout(() => {
            setMenuOpen(toggle);
        }, 300)
    }

    const clickEvent = context.mode === 'vertical' ? {
        onClick: isOpenSubMenu
    } : {}
    const hoverEvent = context.mode !== 'vertical' ? {
        onMouseEnter: (e: React.MouseEvent) => {handleMouse(e, true)},
        onMouseLeave: (e: React.MouseEvent) => {handleMouse(e, false)}
    } : {}

    const renderChildren = () => {
        const subMenuClass = classNames('lu-submenu', {
            'menu-opened': menuOpen
        });
        const childrenComponent = Children.map(children, (child, i) => {
            const childElement = child as React.FunctionComponentElement<MenuItemProps>;
            const {displayName} = childElement.type;
            if (displayName === 'MenuItem') {
                return React.cloneElement(childElement, {index: `${index}-${i}`})
                // return childElement;
            } else {
                console.error('Warning: SubMenu has a child which is not a MenuItem Component');
            }
        })
        return (
            <CSSTransition
                in={menuOpen}
                timeout={300}
                classNames="zoom-in-top"
                appear>
                <ul className={subMenuClass}>
                    {childrenComponent}
                </ul>
            </CSSTransition>
        )
    }

    function handleClick() {
        if (context.onSelect && (typeof index === 'number')) {
            context.onSelect(index);
        }
    }

    return (
        <li {...hoverEvent} key={index} className={classes}>
            <div {...clickEvent}>
                {title}
                <Icon icon={'angle-down'} className="arrow-icon"></Icon>
            </div>
            {renderChildren()}
        </li>
    )
}

SubMenu.displayName = 'SubMenu';

export default SubMenu;