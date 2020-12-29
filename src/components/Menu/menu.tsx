import React, {createContext, useState} from 'react';
import {MenuItemProps} from './menuItem';
import classNames from 'classnames';

type MenuMode = 'horizontal' | 'vertical';
type SelectCallback = (selectedIndex: number) => void;

export interface MenuProps {
    defaultIndex?: number;
    mode?: MenuMode;
    className?: string;
    style?: React.CSSProperties;
    onSelect?: SelectCallback
}

interface IMenuContext {
    index: number;
    onSelect?: SelectCallback
}

export const MenuContext = createContext<IMenuContext>({
    index: 0
});

const Menu: React.FC<MenuProps> = (props) => {
    const {
        defaultIndex,
        className,
        style,
        mode,
        children,
        onSelect
    } = props;

    const [currentActive, setCurrentActive] = useState(defaultIndex);

    const classes = classNames('lu-menu', className, {
        'menu-vertical': mode === 'vertical',
        'menu-horizontal': mode !== 'vertical'
    })

    const handleClick = (index: number) => {
        setCurrentActive(index);
        if (onSelect) {
            onSelect(index);
        }
    }

    const passedContext: IMenuContext = {
        index: currentActive ? currentActive : 0,
        onSelect: handleClick
    }

    /**
     * @desc 该方法通过遍历children，通过判断 children 的 disaplayName 来剔除不符合规则的 children
     * 官方提供的方法 React.Children.map 用于遍历children，返回一个数组
     */
    const renderChildren = () => {
        return React.Children.map(children, (child, index) => {
            // 类型断言，转换成为FunctionComponen实例，拿到声明的displayName
            const childElement = child as React.FunctionComponentElement<MenuItemProps>;
            const {displayName} = childElement.type;
            if (displayName === 'MenuItem' || displayName === 'SubMenu') {
                /**
                 * React.cloneElement 克隆元素，将新旧属性合并返回一个新的元素
                 * 这里是将MenuItem的index添加
                 */
                return React.cloneElement(childElement, {index});
                // return child;
            } else {
                console.error('Warning: Menu has a child which is not a MenuItem Component');
            }
        })
    }

    console.log(renderChildren());

    return (
        <ul
            data-testid="test-menu"
            className={classes}
            style={style}>
            <MenuContext.Provider value={passedContext}>
                {renderChildren()}
                {/* {children} */}
            </MenuContext.Provider>
        </ul>
    )
}

Menu.defaultProps = {
    mode: 'horizontal',
    defaultIndex: 0
}

export default Menu;