import React, { useContext } from 'react';
import classNames from 'classnames';
import {TabContext} from './Tabs';

export interface TabPaneProps {
    index?: number;
    className?: string;
    style?: React.CSSProperties;
};

const TabPane: React.FC<TabPaneProps> = (props) => {
    const {
        index,
        className,
        style,
        children,
    } = props;

    const context = useContext(TabContext);

    const classes = classNames('tab-pane', className, {
        'is-actived': context.index === index
    })

    return (
        <div>
            {children}
        </div>
    )
}

TabPane.displayName = 'TabPane';

export default TabPane;