/**
 * @file 自定义hook，AutoComplete组件点击其他区域收起下拉list
 */
import {useEffect, useState, RefObject} from 'react';

function useClickOutSide(ref: RefObject<HTMLElement>, handle: Function) {
    useEffect(() => {
        const listener = (event: MouseEvent) => {
            // 当节点为空，或者null的时候不执行handle操作
            if (!ref.current || ref.current.contains(event.target as HTMLElement)) {
                return false;
            }
            handle(event);
        }
        document.addEventListener('click', listener);
        return () => {
            document.removeEventListener('click', listener);
        }
    }, [ref, handle]);
}

export default useClickOutSide;