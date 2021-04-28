import React, {useState, createContext} from 'react';
import classNames from 'classnames';
import {TabItemProps} from './TabItem';

type TabsMode = 'horizontal' | 'vertical';
type SeclectCallback = (selectedIndex: number) => void;

export interface TabsProps {
    defaultIndex?: number;
    mode?: TabsMode;
    className?: string;
    style?: React.CSSProperties;
    onSelect?: SeclectCallback
};

interface ITabContext {
    index: number,
    onSelect?: SeclectCallback,
    mode?: TabsMode
}

export const TabContext = createContext<ITabContext>({
    index: 0
})

const Tabs: React.FC<TabsProps> = (props) => {
    const {
        defaultIndex,
        mode,
        className,
        style,
        children,
        onSelect
    } = props;

    const [currentActive, setCurrentActive] = useState(defaultIndex);

    const classes = classNames('lu-tabs', className, {
        'tabs-vertical': mode === 'vertical',
        'tabs-horizontal': mode !== 'vertical'
    });

    const handleClick = (index: number) => {
        setCurrentActive(index);
        if (onSelect) {
            onSelect(index);
        }
    }

    const passedContext: ITabContext = {
        index: currentActive ? currentActive : 0,
        onSelect: handleClick,
        mode
    }

    const renderChildren = () => {
        return React.Children.map(children, (child, index) => {
            const childElement = child as React.FunctionComponentElement<TabItemProps>;
            const {displayName} = childElement.type;
            if (displayName === 'TabItem') {

                return React.cloneElement(childElement, {index: index});
            } else {
                console.error('Warning: Tabs has a child which is not a TabItem Component')
            }
        })
    }
    
    return (
        <ul
            data-test="test-tabs"
            className={classes}
            style={style}>
            <TabContext.Provider value={passedContext}>
                {renderChildren()}
            </TabContext.Provider>
        </ul>
    )
}

Tabs.defaultProps = {
    mode: 'horizontal',
    defaultIndex: 0
}

export default Tabs;