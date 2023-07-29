import { FC, useState } from 'react'
import Icon from '@mdi/react';
import { mdiDelete, mdiDeleteSweep, mdiDeleteAlert } from '@mdi/js';

interface IconButtonProps {
    onClick: () => void,
    toDelete?: boolean,
    iconPath?: string
}
export const IconButton:FC<IconButtonProps> = ({onClick, toDelete = false, iconPath = mdiDelete}:IconButtonProps) => {
    const [stage, setStage] = useState<number>(0);
    return  <button
                onClick={(e) => {
                    e.stopPropagation();
                    if(toDelete && stage < 2)
                        return setStage(stage+1)
                    onClick()
                }}
                className='IconButton'>
        <Icon
            path={toDelete ? [mdiDelete, mdiDeleteSweep, mdiDeleteAlert][stage] : iconPath}
            size={1.3}
        />
    </button>
}