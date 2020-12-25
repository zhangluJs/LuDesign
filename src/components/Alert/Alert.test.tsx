/**
 * @file Alert组件单元测试
 * @author zhanglu
 * @date 2020/12/25
 * @desc Alert组件的单元测试。这个描述是写完这个单元测试写的，感觉api好多都不知道。而且感觉这个单元测试有点片面，没法真正的达到我预想的那种测试效果，不过我感觉是因为我对这玩意不熟悉。慢慢来吧
 */

import React from 'react';
import {render, fireEvent} from '@testing-library/react';
import Alert, {AlertType, close, AlertProps} from './Alert';

const DefaultProps: AlertProps = {
    title: '提示的文案',
    type: AlertType.Default
}

const DangerProps: AlertProps = {
    title: '危险的提示',
    type: AlertType.Danger
}

const HiddenProps: AlertProps = {
    title: '提示的文案',
    showClose: close.Hidden
}

const defaultProps = {
    onClick: jest.fn()
}

describe('Alert Test', () => {
    // 测试默认熟悉
    it('Alert Default test', () => {
        // 刚开始我试图像btn单元测试那样拿节点，但是发现btn组件只有一层节点，而alert组件里面嵌套了其他节点。我在想这怎么判断这个组件是否挂载到了dom节点中时。看别人的代码才反应过来，我可以看里面的某个节点挂载没就好，没必要按部就班的找一整个节点，有点死板了。
        const {container, queryByText} = render(<Alert {...defaultProps} {...DefaultProps}></Alert>);
        const closeBtn = container.querySelector('.close') as HTMLElement;
        expect(closeBtn).toBeInTheDocument();
        fireEvent.click(closeBtn);
        expect(defaultProps.onClick).toHaveBeenCalled();
    })
    // 测试危险类型
    it('Alert Danger test', () => {
        const {container, queryByText} = render(<Alert {...DangerProps}></Alert>);
        const Element = container.querySelector('.alert-danger') as HTMLElement;
        expect(Element).toBeInTheDocument();
    })
    // 测试是否显示close按钮
    it('Alert is Show CloseBtn test', () => {
        const {container, queryByText} = render(<Alert {...HiddenProps}></Alert>);
        const Element = container.querySelector('.close') as HTMLElement;
        expect(Element).not.toBeInTheDocument();
    })
})