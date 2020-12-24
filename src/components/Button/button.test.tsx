/**
 * @file button组件单元测试
 * @desc 这是第一次接触测试，用的是create-react-app中集成的testing-library/react、jest-dom，虽然上手挺容易，但是还是得慢慢啃一啃
 * @date 2020/12/24
 */

import React from 'react';
// fireEvent 模拟用户发送事件
import {render, fireEvent} from '@testing-library/react';
import Button, {ButtonType, ButtonSize, ButtonProps} from './button';

// test('our first react test case', () => {
//     const wrapper = render(<Button>Nice</Button>);
//     const element = wrapper.queryByText('Nice');
//     expect(element).toBeTruthy();
// })

const testProps: ButtonProps = {
    btnType: ButtonType.Primary,
    size: ButtonSize.Small,
    className:'test',
    disabled: true
}

const testLinkProps: ButtonProps = {
    btnType: ButtonType.Link,
    size: ButtonSize.Small,
    className:'test',
    href: 'https://www.baidu.com'
}

const disabled: ButtonProps = {
    btnType: ButtonType.Primary,
    disabled: true
}

// mock function
const defaultProps = {
    // 这个jest已经被集成在这个cli里了，可以看看根目录下的setupTests.ts文件
    onClick: jest.fn()
}


describe('Button Test', () => {
    it('Button Default Test', () => {
        // 将组件挂载
        const wrapper = render(<Button {...defaultProps}>Nice</Button>);

        // 挂载后获取组件元素
        const element = wrapper.getByText('Nice');

        // 看是否挂载在文档中
        expect(element).toBeInTheDocument();

        // 查看节点name是否是button，大写
        expect(element.tagName).toEqual('BUTTON');

        // 查看节点上的className名称是否正确
        expect(element).toHaveClass('btn btn-default');
        
        // 模拟用户发送一个事件
        fireEvent.click(element);

        // toHaveBeenCalled 看能否调用到事件
        expect(defaultProps.onClick).toHaveBeenCalled();
    })

    it('Button props Test', () => {
        const wrapper = render(<Button {...testProps}>Nice</Button>);
        const element = wrapper.getByText('Nice');
        expect(element).toBeInTheDocument();
        expect(element).toHaveClass('btn test btn-primary btn-sm');
        // 查看是否禁用
        expect(element).toBeDisabled();
    })

    it('Button is Link', () => {
        const wrapper = render(<Button {...testLinkProps}>Link</Button>);
        const element = wrapper.getByText('Link');
        expect(element).toBeInTheDocument();
        expect(element).toHaveClass('btn test btn-link btn-sm');
        expect(element.tagName).toEqual('A');
    })

    it('Button is disabled', () => {
        const wrapper = render(<Button {...disabled}>Nice</Button>);
        // 类型断言变成button as HTMLButtonElement
        const element = wrapper.getByText('Nice') as HTMLButtonElement;
        expect(element.disabled).toBeTruthy();
        fireEvent.click(element);
        // disabled状态下无法触发事件，所以是not
        expect(defaultProps.onClick).not.toHaveBeenCalled();
    })
})