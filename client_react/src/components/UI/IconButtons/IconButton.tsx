import { FC, useState } from 'react'
import Icon from '@mdi/react';
import { mdiDelete, mdiDeleteSweep, mdiDeleteAlert } from '@mdi/js';
import styles from './IconButtons.module.css'
import { IconButtonProps } from '../../../types/UI';

export const IconButton:FC<IconButtonProps> = ({onClick, toDelete = false, iconPath = mdiDelete, className=""}:IconButtonProps) => {
    const [stage, setStage] = useState<number>(0);
    return  <button
                className={styles.IconButton + ' ' + className}
                onClick={(e) => {
                    e.stopPropagation();
                    if(toDelete && stage < 2)
                        return setStage(stage+1)
                    onClick()
                }}>
        <Icon
            path={toDelete ? [mdiDelete, mdiDeleteSweep, mdiDeleteAlert][stage] : iconPath}
            size={1}
        />
    </button>
}