import { FC, useState } from 'react'
import Icon from '@mdi/react';
import { mdiMenu } from '@mdi/js';
import styles from './IconButtons.module.css'
import { SwitchButtonProps } from '../../../types/UI';

export const SwitchButton:FC<SwitchButtonProps> = ({onClick, iconPath = mdiMenu, className="", rotate=false, value = null}:SwitchButtonProps) => {
    const [pressed, setPressed] = useState<boolean>(false);
    const buttonState = (value ?? pressed); //controlled or uncontrolled
    const isRotated = (rotate && buttonState);
    return <button
                className={styles.IconButton + ' ' + className + ' ' + (isRotated ? styles.IconButton_rotated : '')}
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