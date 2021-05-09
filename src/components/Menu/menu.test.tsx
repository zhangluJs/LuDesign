import React from 'react';
/**
 * render 挂载节点
 * RenderResult 节点渲染
 * fireEvent 事件触发
 * cleanup 清除节点
 * waitFor 异步操作
 */
import {render, RenderResult, fireEvent, cleanup, waitFor} from '@testing-library/react';
import Menu, {MenuProps} from './menu';
import MenuItem, {MenuItemProps} from './menuItem';
import SubMenu from './subMenu';

const testProps: MenuProps = {
    defaultIndex: '0',
    onSelect: jest.fn(),
    className: 'test'
}

const testVerProps: MenuProps = {
    defaultIndex: '0',
    mode: 'vertical',
    defaultSubMenus: ['4']
}

/**
 * @description 渲染不同属性的组件
 * @param props 
 */
const generateMenu = (props: MenuProps) => {
    return (
        <Menu {...props}>
            <MenuItem index="0">active</MenuItem>
            <MenuItem index="1" disabled>disabled</MenuItem>
            <MenuItem index="2">xyz</MenuItem>
            <SubMenu title="dropdown" index="3">
                <MenuItem index="3-0">drop1</MenuItem>
            </SubMenu>
            <SubMenu title="opened" index="4">
                <MenuItem index="4-0">opened1</MenuItem>
            </SubMenu>
        </Menu>
    );
}

const createStyleFile = () => {
    const cssFile: string = `
        .lu-submenu {
            display: none;
        }
        .lu-submenu.menu-opened {
            display: block;
        }
    `;
    const style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = cssFile;
    return style;
}

let wrapper: RenderResult, wrapper2: RenderResult, menuElement: HTMLElement, activeElement: HTMLElement, disabledElement: HTMLElement;

describe('test Menu and MenuItem components', () => {
    // beforeEach 是每个case执行前都会跑的函数
    beforeEach(() => {
        // 渲染组件
        wrapper = render(generateMenu(testProps));
        
        wrapper.container.append(createStyleFile());

        // 这里getByTestId需要去组件节点写上data-testid
        menuElement = wrapper.getByTestId('test-menu');

        // 获取内容是active的节点
        activeElement = wrapper.getByText('active');

        // 获取内容是disabled的节点
        disabledElement = wrapper.getByText('disabled');
        // wrapper.container
    });

    it('should render correct Menu and MenuItem based on default props', () => {
        // 是否挂载到dom节点上
        expect(menuElement).toBeInTheDocument();
        expect(menuElement).toHaveClass('lu-menu test');
        // expect(menuElement.getElementsByTagName('li').length).toEqual(4);

        /**
         * :scope 是一个伪类，代表了当前节点的本身
         * https://developer.mozilla.org/zh-CN/docs/Web/CSS/:scope 解释的很详细
         */
        expect(menuElement.querySelectorAll(':scope > li').length).toEqual(5);
        expect(activeElement).toHaveClass('is-actived menu-item');
        expect(disabledElement).toHaveClass('is-disabled menu-item');
    })

    it('click item should change active and call the right callback', () => {
        const element = wrapper.getByText('xyz');
        // 点击节点后查看是否触发点击效果
        fireEvent.click(element);
        expect(element).toHaveClass('is-actived');
        expect(activeElement).not.toHaveClass('is-actived');
        expect(testProps.onSelect).toHaveBeenCalledWith('2');
        // 点击disabled
        fireEvent.click(disabledElement);
        expect(testProps.onSelect).not.toHaveBeenCalledWith('1');
        expect(disabledElement).not.toHaveClass('is-actived');
    })

    it('should render vertical mode when mode is set to vertical', () => {
        cleanup();
        const wrapper = render(generateMenu(testVerProps));
        const menuElement = wrapper.getByTestId('test-menu');
        expect(menuElement).toBeInTheDocument();
        expect(menuElement).toHaveClass('lu-menu menu-vertical');
    })

    it('should show dropdown items when hover on subMenu', async () => {
        /**
         * 为这里添加了一些css。因为没有css样式的话，这里的测试用例会认为当前节点其实是存在的。不过也确实存在，所以要加css
         */
        expect(wrapper.queryByText('drop1')).not.toBeVisible();
        const dropdownElement = wrapper.getByText('dropdown');
        fireEvent.mouseEnter(dropdownElement);
        await waitFor(() => {
            expect(wrapper.queryByText('drop1')).toBeVisible();
        });
        fireEvent.click(wrapper.getByText('drop1'));
        expect(testProps.onSelect).toHaveBeenCalledWith('3-0');
        fireEvent.mouseLeave(dropdownElement);
        await waitFor(() => {
            expect(wrapper.queryByText('drop1')).not.toBeVisible();
        });
    })
})

describe('test Menu and MenuItem component in vertical mode', () => {
    beforeEach(() => {
        // 渲染组件
        wrapper2 = render(generateMenu(testVerProps));
        
        wrapper2.container.append(createStyleFile());
    })
    it ('should render vertical mode when mode is set to vertical', () => {
        const menuElement = wrapper2.getByTestId('test-menu');
        expect(menuElement).toHaveClass('menu-vertical')
    })
    it('should show dropdown items when click on subMenu for vertical mode', () => {
        expect(wrapper.queryByText('drop1')).not.toBeVisible();
        const dropdownElement = wrapper2.getByText('dropdown');
        fireEvent.click(dropdownElement);
        expect(wrapper.queryByText('drop1')).toBeVisible();
    })
    it('should show subMenu dropdown when defaultOpenSubMenus contains SubMenu index', () => {
        expect(wrapper2.queryByText('opened1')).toBeVisible()
    })
})