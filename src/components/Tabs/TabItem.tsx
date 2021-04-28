import React, { useContext } from 'react';
import classNames from 'classnames';
import {TabContext} from './Tabs';

export interface TabItemProps {
    index?: number;
    disabled?: boolean;
    className?: string;
    style?: React.CSSProperties;
    label: string
};

const TabItem: React.FC<TabItemProps> = (props) => {
    const {
        index,
        disabled,
        className,
        style,
        children,
        label
    } = props;

    const context = useContext(TabContext);

    const classes = classNames('tab-item', className, {
        'is-disabled': disabled,
        'is-activeed': context.index === index
    });

    function handleClick() {
        if (context.onSelect && !disabled && (typeof index === 'number')) {
            context.onSelect(index);
        }
    }

    return (
        <li
            onClick={handleClick}
            className={classes}
            style={style}>
            {label}
        </li>
    )
}

TabItem.displayName = 'TabItem';

export default TabItem;