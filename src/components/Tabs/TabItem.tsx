import React, { useContext } from 'react';
import classNames from 'classnames';

export interface TabItemProps {
    disabled?: boolean;
    label: string | React.ReactElement;
};

const TabItem: React.FC<TabItemProps> = ({children}) => {

    return (
        <div className="lu-tab-panel">
            {children}
        </div>
    )
}

TabItem.displayName = 'TabItem';

export default TabItem;