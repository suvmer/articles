import { FC, useState } from 'react'
import Icon from '@mdi/react';
import { mdiMenu } from '@mdi/js';

interface SwitchButtonProps {
    onClick: (arg0: boolean) => void,
    iconPath?: string,
    className?: string,
    rotate?: boolean
    value?: boolean | null
}
export const SwitchButton:FC<SwitchButtonProps> = ({onClick, iconPath = mdiMenu, className="", rotate=false, value = null}:SwitchButtonProps) => {
    const [pressed, setPressed] = useState<boolean>(false);
    const buttonState = (value ?? pressed); //controlled or uncontrolled
    return <button
                className={'IconButton '+className+ ((rotate && buttonState) ? ' IconButton_rotated' : '')}
                onClick={(e) => {
                    e.stopPropagation();
                    onClick(buttonState);
                    setPressed(!buttonState);
                }}>
        <Icon
            path={iconPath}
            size={1.3}
            color={"white"}
        />
    </button>
}