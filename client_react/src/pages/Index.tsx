import { FC } from 'react'
import { useOutlet } from 'react-router'
import { Header } from '../components/Header';
import { SideBar } from '../components/SideBar';

export const Index : FC = () => {
    const outlet = useOutlet();
    return <div>
        <Header/>
        <div className='main'>
            <SideBar/>
            <div className='contentWrapper'>
                <div className='content'>{outlet}</div>
            </div>
        </div>
    </div>
}