import React, {useContext, useState} from "react";
import { Link } from 'react-router-dom';

import {BsFillPersonFill, BsFillHeartFill, BsFillStopwatchFill} from 'react-icons/bs'
import {FiLogOut} from 'react-icons/fi'
import {AiFillSetting} from 'react-icons/ai'

import { AuthContext } from '../../context/authContext';

import './user.scss'

const User = () => {
    let {logoutUser} = useContext(AuthContext)
    let profile = localStorage.getItem('profile') ? JSON.parse(localStorage.getItem('profile')) : null
    let inforUser = localStorage.getItem('inforUser') ? JSON.parse(localStorage.getItem('inforUser')) : null
    
    const [activeUser, setActiveUser] = useState(false)

    return (
    <div className="user">
        <div
            onClick={() => setActiveUser(!activeUser)}
            className="avatar"
        >
            <img src={`http://127.0.0.1:8000${profile.profile_img}`} alt="" />
        </div>
        <div className={activeUser ? "options active" : "options"}>
            <div className="infor">
                <div className="infor__avatar">
                    <img src={`http://127.0.0.1:8000${profile.profile_img}`} alt="" />
                </div>
                <div className="infor_name">
                    <h2 className="name">{inforUser.first_name ? inforUser.first_name + inforUser.last_name : inforUser.username}</h2>
                    <h3 className="nickname">@{inforUser.username}</h3>
                </div>
            </div>
            <ul className="user_options">
                <li>
                    <Link to='/profile'>
                        <span><BsFillPersonFill /></span>
                        <span>Profile</span>
                    </Link>
                </li>
                <li>
                    <Link to='/'>
                        <span><BsFillHeartFill /></span>
                        <span>Film Liked</span>
                    </Link>
                </li>
                <li>
                    <Link to='/'>
                        <span><BsFillStopwatchFill /></span>
                        <span>Film Watched</span>
                    </Link>
                </li>
                <li>
                    <Link to='/'>
            <span><AiFillSetting /></span>
                        <span>Setting</span>
                    </Link>
                </li>
                <li>
                    <Link to='/person/login' onClick={logoutUser}>
                        <span><FiLogOut /></span>
                        <span>Logout</span>
                    </Link>
                </li>
            </ul>
        </div>
        </div>
    )
}

export default User