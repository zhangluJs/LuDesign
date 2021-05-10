import React, {useState, createContext} from 'react';
import classNames from 'classnames';
import {TabItemProps} from './TabItem';

type TabsMode = 'horizontal' | 'vertical';
type SeclectCallback = (selectedIndex: number) => void;

export interface TabsProps {
    defaultIndex?: number;
    type?: 'line' | 'card';
    className?: string;
    style?: React.CSSProperties;
    onSelect?: SeclectCallback
};

const Tabs: React.FC<TabsProps> = (props) => {
    const {
        defaultIndex,
        type,
        className,
        style,
        children,
        onSelect
    } = props;

    const [activeIndex, setActiveIndex] = useState(defaultIndex);

    const classes = classNames('lu-tabs', className, {
        'tabs-line': type === 'line',
        'tabs-card': type === 'card'
    });

    const navClass = classNames('lu-tabs-nav', {
        'nav-line': type === 'line',
        'nav-card': type === 'card',
      })

    const handleClick = (e: React.MouseEvent,index: number, disabled: boolean | undefined) => {
        if (!disabled) {
            setActiveIndex(index);
            if (onSelect) {
                onSelect(index);
            }
        }
    }

    const renderChildren = () => {
        return React.Children.map(children, (child, index) => {
            const childElement = child as React.FunctionComponentElement<TabItemProps>;
            const {label, disabled} = childElement.props;
            const classes = classNames('lu-tabs-nav-item', {
                'is-active': activeIndex === index,
                'disabled': disabled,
            })
            return (
                <li 
                    className={classes} 
                    key={`nav-item-${index}`}
                    onClick={(e) => {handleClick(e, index, disabled)}}>
                    {label}
                </li>
            )
        })
    }

    const renderContent = () => {
        return React.Children.map(children, (child, index) => {
            if (index === activeIndex) {
                return child;
            }
        })
    }
    
    return (
        <div data-testid="test-tabs" className={`lu-tabs ${className}`}>
            <ul
                className={navClass}
                style={style}>
                {renderChildren()}
            </ul>
            <div className="lu-tabs-content">
                {renderContent()}
            </div>
        </div>
    )
}

Tabs.defaultProps = {
    type: 'line',
    defaultIndex: 0
}

export default Tabs;