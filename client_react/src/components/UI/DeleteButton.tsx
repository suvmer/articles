import { FC, useState } from 'react'
import Icon from '@mdi/react';
import { mdiDelete, mdiDeleteSweep, mdiDeleteAlert } from '@mdi/js';

interface DeleteButtonProps {
    onClick: () => void
}
export const DeleteButton:FC<DeleteButtonProps> = ({onClick}:DeleteButtonProps) => {
    const [stage, setStage] = useState<number>(0);
    return  <button
                onClick={(e) => {
                    e.stopPropagation();
                    if(stage < 2)
                        return setStage(stage+1)
                    onClick()
                }}
                className='DeleteButton'>
        <Icon
            path={[mdiDelete, mdiDeleteSweep, mdiDeleteAlert][stage]}
            size={1}
        />
    </button>
}