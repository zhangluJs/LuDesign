import React from 'react';
import {render, RenderResult, fireEvent, cleanup} from '@testing-library/react';
import Menu, {MenuProps} from './menu';
import MenuItem, {MenuItemProps} from './menuItem';

const testProps: MenuProps = {
    defaultIndex: 0,
    onSelect: jest.fn(),
    className: 'test'
}

const testVerProps: MenuProps = {
    defaultIndex: 0,
    mode: 'vertical'
}

/**
 * @description 渲染不同属性的组件
 * @param props 
 */
const generateMenu = (props: MenuProps) => {
    return (
        <Menu {...props}>
            <MenuItem index={0}>active</MenuItem>
            <MenuItem index={1} disabled>disabled</MenuItem>
            <MenuItem index={2}>xyz</MenuItem>
        </Menu>
    );
}

let wrapper: RenderResult, menuElement: HTMLElement, activeElement: HTMLElement, disabledElement: HTMLElement;

describe('test Menu and MenuItem components', () => {
    // beforeEach 是每个case执行前都会跑的函数
    beforeEach(() => {
        // 渲染组件
        wrapper = render(generateMenu(testProps));

        // 这里getByTestId需要去组件节点写上data-testid
        menuElement = wrapper.getByTestId('test-menu');

        // 获取内容是active的节点
        activeElement = wrapper.getByText('active');

        // 获取内容是disabled的节点
        disabledElement = wrapper.getByText('disabled');
        // wrapper.container
    });

    it('should render cottect Menu and MenuItem based on default props', () => {
        // 是否挂载到dom节点上
        expect(menuElement).toBeInTheDocument();
        expect(menuElement).toHaveClass('lu-menu test');
        expect(menuElement.getElementsByTagName('li').length).toEqual(3);
        expect(activeElement).toHaveClass('is-actived menu-item');
        expect(disabledElement).toHaveClass('is-disabled menu-item');
    })

    it('click item should change active and call the right callback', () => {
        const element = wrapper.getByText('xyz');
        // 点击节点后查看是否触发点击效果
        fireEvent.click(element);
        expect(element).toHaveClass('is-actived');
        expect(activeElement).not.toHaveClass('is-actived');
        expect(testProps.onSelect).toHaveBeenCalledWith(2);
        // 点击disabled
        fireEvent.click(disabledElement);
        expect(testProps.onSelect).not.toHaveBeenCalledWith(1);
        expect(disabledElement).not.toHaveClass('is-actived');
    })

    it('should render vertical mode when mode is set to vertical', () => {
        cleanup();
        const wrapper = render(generateMenu(testVerProps));
        const menuElement = wrapper.getByTestId('test-menu');
        expect(menuElement).toBeInTheDocument();
        expect(menuElement).toHaveClass('lu-menu menu-vertical');
    })
})