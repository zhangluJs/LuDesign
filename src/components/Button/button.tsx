import React from 'react';
import classNames from 'classnames';

export enum ButtonSize {
    Large = 'lg',
    Small = 'sm'
}

export enum ButtonType {
    Primary = 'primary',
    Danger = 'danger',
    Default = 'default',
    Link = 'link'
}

interface ButtonBaseProps {
    size?: ButtonSize;
    btnType?: ButtonType,
    href?: string,
    children: React.ReactNode,
    disabled?: boolean,
    className?: string
}

/**
 * 组件中除了要获取我们定义的属性，还有元素自身所带的属性，比如title、alt等等。但是元素自带的属性非常的多，一项一项写出来很不现实，
 * 所以react提供了所有原生节点上的props 通过 React.ButtonHTMLAttributes获取，还需要来传入<HTMLElement>泛型来规范一下
 * 
 * 同时我们的组件与我们自定义的属性两者都要有，所以需要&来让两者都满足。
 * Partial 是typescript提供的方法。它可以快速把接口类型中定义的属性变成可选的(Optional)：
 * 我们这里有a上的属性button可能没有，反之亦然所以都需要调整成为可选
 * 
 * 下面是获取button & a props
 */
type NativeButtonProps = ButtonBaseProps & React.ButtonHTMLAttributes<HTMLElement>;
type AnchorButtonProps = ButtonBaseProps & React.AnchorHTMLAttributes<HTMLElement>;

export type ButtonProps = Partial<NativeButtonProps & AnchorButtonProps>;

const Button: React.FC<ButtonProps> = (props) => {
    const {
        size,
        className,
        btnType,
        href,
        children,
        disabled,
        // 解构出来额外的原生属性
        ...resetProps
    } = props;
    // btn, btn-large, btn-primary
    const classes = classNames('btn', className, {
        [`btn-${btnType}`]: btnType,
        [`btn-${size}`]: size,
        'disabled': disabled && (ButtonType.Link === 'link')
    });
    if (btnType === ButtonType.Link && href) {
        return (
            <a
                {...resetProps}
                className={classes}
                href={href}>
                {children}
            </a>
        )
    } else {
        return (
            <button
                {...resetProps}
                className={classes}
                disabled={disabled}>
                {children}
            </button>
        )
    }
}

Button.defaultProps = {
    btnType: ButtonType.Default,
    disabled: false
}

export default Button;