import React, { useRef, useEffect, useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';

import User from '../user/User';
import { AuthContext } from '../../context/authContext';

import './navbar.scss';

const headerNav = [
    {
        display: 'Home',
        path: '/'
    },
    {
        display: 'Movies',
        path: '/movie'
    },
    {
        display: 'TV Series',
        path: '/tv'
    },
    {
        display: 'Search',
        path: '/search'
    },
    {
        display: 'Login',
        path: '/person/login'
    },
    {
        display: 'Profile',
        path: 'profile'
    }
];


const Header = () => {
    let {user} = useContext(AuthContext)

    const { pathname } = useLocation();
    const headerRef = useRef(null);

    const active = headerNav.findIndex(e => e.path === pathname);

    useEffect(() => {
        const shrinkHeader = () => {
            if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
                headerRef.current.classList.add('shrink');
            } else {
                headerRef.current.classList.remove('shrink');
            }
        }
        window.addEventListener('scroll', shrinkHeader);
        return () => {
            window.removeEventListener('scroll', shrinkHeader);
        };
    }, []);

    return (
        <div ref={headerRef} className="header">
            <div className="header__wrap container">
                <div className="logo">
                    <img src='https://blogphotoshop.com/wp-content/uploads/2018/08/thiet-ke-logo-website-o-dau-4.jpg' alt="" />
                    <Link to="/">HRadleyD</Link>
                </div>
                <ul className="header__nav">
                    {
                        headerNav.slice(0,4).map((e, i) => (
                            <li key={i} className={`${i === active ? 'active' : ''}`}>
                                <Link to={e.path}>
                                    {e.display}
                                </Link>
                            </li>
                        ))
                    }
                    
                    {
                        user ? 
                        <li className={`${5 === active ? 'active' : ''}`}>
                            <Link to={headerNav[5].path}>
                                {headerNav[5].display}
                            </Link>
                        </li>
                        : 
                        <li className={`${4 === active ? 'active' : ''}`}>
                            <Link to={headerNav[4].path}>
                                {headerNav[4].display}
                            </Link>
                        </li>
                    }
                </ul>

                {
                    user ?
                    <User />
                :
                <Link to='/person/login' className="login__btn">
                    <button>Login</button>
                </Link>
                }
            </div>
        </div>
    );
}

export default Header;