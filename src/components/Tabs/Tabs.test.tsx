import {render, RenderResult, fireEvent, cleanup, waitFor, queryByText} from '@testing-library/react';
import Tabs, {TabsProps} from './Tabs';
import TabItem from './TabItem';

const testProps: TabsProps = {
    defaultIndex: 1,
    onSelect: jest.fn(),
    className: 'test'
}

const generateTabs = (props: TabsProps) => {
    return (
        <Tabs {...testProps}>
            <TabItem label="tab1">content1</TabItem>
            <TabItem label="tab2">content2</TabItem>
            <TabItem label="disabled" disabled>content3</TabItem>
        </Tabs>
    )
}

let wrapper: RenderResult;

describe('test Tabs and TabItem components', () => {
    beforeEach(() => {
        wrapper = render(generateTabs(testProps));
    })

    it('should render the correct default Tabs', () => {
        const {queryByText, container} = wrapper;
        expect(container.querySelector('.lu-tabs')).toHaveClass('tabs-line');
        const avtiveElement = queryByText('tab2');
        expect(avtiveElement).toBeInTheDocument();
        expect(avtiveElement).toHaveClass('is-actived');
        expect(queryByText('tab1')).not.toHaveClass('is-actived');
        expect(queryByText('content2')).toBeInTheDocument();
        expect(queryByText('content1')).not.toBeInTheDocument();
    })

    it('click tabItem should switch to content', () => {
        const { queryByText, getByText } = wrapper;
        const clickedElement = getByText('tab1');
        fireEvent.click(clickedElement);
        expect(queryByText('tab1')).toHaveClass('is-actived');
        expect(queryByText('tab2')).not.toHaveClass('is-actived');
        expect(queryByText('content1')).toBeInTheDocument();
        expect(queryByText('content2')).not.toBeInTheDocument();
        expect(testProps.onSelect).toHaveBeenCalledWith(0);
    })

    it('click disabled tabItem should not works', () => {
        const {getByText} = wrapper;
        const disableElement = getByText('disabled');
        expect(disableElement).toHaveClass('is-disabled');
        fireEvent.click(disableElement);
        expect(disableElement).not.toHaveClass('is-actived');
        expect(testProps.onSelect).not.toHaveBeenCalledWith();
    })
})