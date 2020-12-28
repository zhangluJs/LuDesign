import React, { useState } from 'react';
import classNames from 'classnames';

export enum AlertType {
    Success = 'success',
    Default = 'default',
    Danger = 'danger',
    Warning = 'warning'
}

export enum close {
    Show = 'show',
    Hidden = 'hidden'
}

interface AlertBaseProps {
    showClose?: close,
    type?: AlertType,
    status?: boolean
    title: string,
    children?: React.ReactNode,
}

type NativeDivProps = AlertBaseProps & React.BaseHTMLAttributes<HTMLElement>;

export type AlertProps = AlertBaseProps & NativeDivProps;

const Alert: React.FC<AlertProps> = (props) => {
    const [closeAlert, setCloseAlert] = useState(true);
    const {
        showClose,
        className,
        type,
        title,
        children,
        ...resetProps
    } = props;
    // alert alert-type 
    const classes = classNames('alert', className, {
        [`alert-${type}`]: type
    });

    return (
        <>
            {
                closeAlert && 
                <div
                    {...resetProps}
                    className={classes}>
                    <h3>{title}</h3>
                    <p>{children}</p>
                    {
                        close.Show === showClose
                        && <div
                            className="close"
                            onClick={() => {setCloseAlert(false)}}>
                            关闭
                        </div>
                    }
                </div>
            }
        </>
    )
}

Alert.defaultProps = {
    type: AlertType.Default,
    title: '消息提示文案',
    showClose: close.Show
}

export default Alert;