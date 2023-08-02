import { FC, useState } from 'react'
import Icon from '@mdi/react';
import { mdiMenu } from '@mdi/js';

interface SwitchButtonProps {
    onClick: (arg0: boolean) => void,
    iconPath?: string,
    className?: string,
    rotate?: boolean
}
export const SwitchButton:FC<SwitchButtonProps> = ({onClick, iconPath = mdiMenu, className="", rotate=false}:SwitchButtonProps) => {
    const [pressed, setPressed] = useState<boolean>(false);
    return <button
                className={'IconButton '+className+ ((rotate && pressed) ? ' IconButton_rotated' : '')}
                onClick={(e) => {
                    e.stopPropagation();
                    onClick(pressed);
                    setPressed(!pressed);
                }}>
        <Icon
            path={iconPath}
            size={1.3}
            color={"white"}
        />
    </button>
}