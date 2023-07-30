import { FC } from 'react';
export const Header:FC = () => {
    return <header className='header'>
        <p>{document.title}</p>
    </header>;
}