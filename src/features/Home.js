import React from 'react';
import Dashboard from './Dashboard';
import { NavIcons } from '../constants';
import './home.css';

function Home() {
    return (
        <div className='home'>
            <header>
                <div className='custom-hd'>
                    <div className='title'>Dashboard</div>
                    <div className='userAcc'>Dr.Manon</div>
                </div>
            </header>
            <nav>
                <div className='custom-nav'>
                    <ul>
                        {NavIcons.map((item) => {
                            return <li key={item.key} className={`usr-menu ${item.classList.join('')}`}>
                                <div><i className={item.iconCls}></i></div>
                                <div className='menutitle'>{item.title}</div>
                            </li>
                        })}
                    </ul>
                </div>
            </nav>
            <div className='dashbrd'>
                <Dashboard />
            </div>
        </div>
    );
}

export default Home;
