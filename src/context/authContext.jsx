import React, {createContext, useEffect, useState} from "react";
import {useNavigate} from 'react-router-dom'
import jwt_decode from "jwt-decode";
import axios from 'axios'

export const AuthContext = createContext()

const AuthProvider = ({children}) => {
    let navigate = useNavigate()

    const [authTokens, setAuthTokens] = useState(() => localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null)
    const [user, setUser] = useState(() => localStorage.getItem('authTokens') ? jwt_decode(localStorage.getItem('authTokens')) : null)

    const getInforUser =async (username) => {
        let userInfor = await axios.get(`http://127.0.0.1:8000/api/user/${username.username}`) 
        if (userInfor.status === 200) {
            localStorage.setItem('inforUser', JSON.stringify(userInfor.data))
        }
    }

    const getProfile = async(username) => {
        let profileUser = await axios.get(`http://127.0.0.1:8000/api/profile/${username.user_id}`)
        if(profileUser.status === 200) {
            localStorage.setItem('profile', JSON.stringify(profileUser.data))
        }
    }

    const loginUser = async (login) => {
        let res = await axios.post('http://127.0.0.1:8000/api/token/', {
            'username': login.username,
            'password': login.password
        })
        if (res.status === 200) {
            setAuthTokens(res.data)
            setUser(jwt_decode(res.data.access))
            localStorage.setItem('authTokens', JSON.stringify(res.data))
            getInforUser(jwt_decode(res.data.access))
            getProfile(jwt_decode(res.data.access))
            navigate('/')
        }
        else {
            alert('Something went wrong !')
        }
    }

    const logoutUser = () => {
        setAuthTokens(null)
        setUser(null)
        localStorage.removeItem('authTokens', 'profile', 'inforUser')
        navigate('/person/login')
    } 

    const updateTokens = async () => {
        let res = await axios.post('http://127.0.0.1:8000/api/token/refresh', {
            'refresh': authTokens?.refresh
        })
        if (res.status === 200) {
            setAuthTokens(res.data)
            setUser(jwt_decode(res.data.access))
            localStorage.setItem('authTokens', JSON.stringify(res.data))
        }
        else {
            logoutUser()
        }

        // if (loading) {
        //     setLoading(false)
        // }
    }

    useEffect(() => {
        // if (loading) {
        //     updateTokens()
        // }
        let fourMinus = 100 * 600 * 4
        let interval = setInterval(() => {
            if(authTokens) {
                updateTokens()
            }
        }, fourMinus)
        return () => clearInterval(interval)
    }, [authTokens])

    const registerUser = async (register) => {
        let res = await axios.post('http://127.0.0.1:8000/api/register/', {
            email: register.email,
            first_name: register.first_name,
            last_name: register.last_name,
            password: register.password,
            password2: register.password2,
            username: register.username,
        })
        if (res.status === 201) {
            navigate('/person/login')
        }
    }

    let contextData = {
        loginUser: loginUser,
        registerUser: registerUser,
        authTokens: authTokens,
        logoutUser: logoutUser,
        user: user,
    }

    return (
        <AuthContext.Provider value={contextData}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider