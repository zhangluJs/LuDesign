import React from 'react';
import {CSSTransition} from 'react-transition-group';
import {CSSTransitionProps} from 'react-transition-group/CSSTransition';

type AnimationName = 'zoom-in-top' | 'zoom-in-left' | 'zoom-in-bottom' | 'zoom-in-right';

type TransitionProps = CSSTransitionProps & {
    animation?: AnimationName;
    /**
     * 这个wrapper属性的作用给传进来的节点外面套一层容器。
     * 这样做的目的是防止组件自身样式带有transition，这样Transition组件的样式就会被覆盖
     * 而添加一个容器后，transition会作用在添加后的容器上，并且transition属性不会被继
     * 承，所以就可以解决这个问题
     */
    wrapper?: boolean
}

const Transition: React.FC<TransitionProps> = (props) => {
    const {
        children,
        classNames,
        animation,
        wrapper,
        ...restProps
    } = props;
    return (
        <CSSTransition
            {...restProps}
            classNames={classNames ? classNames : animation}>
            {wrapper ? <div>{children}</div> : children}
        </CSSTransition>
    )
}

Transition.defaultProps = {
    unmountOnExit: true,
    appear: true
}

export default Transition;