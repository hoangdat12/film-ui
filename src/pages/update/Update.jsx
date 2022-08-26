import React, {useState} from "react";
import {useNavigate, Link} from 'react-router-dom'
import axios from "axios";

import Header from "../../components/navbar/Navbar";

import './update.scss'

const Update = () => {
    let profile = JSON.parse(localStorage.getItem('profile'))
    let inforUser = JSON.parse(localStorage.getItem('inforUser'))

    let navigate = useNavigate()

    const [firstName, setFirstName] = useState(inforUser.first_name)
    const [lastName, setLastName] = useState(inforUser.last_name)
    const [biography, setBiography] = useState(profile.bio)
    const [address, setAddress] = useState(profile.location)

    const handleUpdate = async () => {
        if (biography !== profile.bio || address !== profile.location) {
            let res = await axios.post(`http://127.0.0.1:8000/api/profile/update/${inforUser.id}`, {
                bio: biography,
                location: address
            })
            localStorage.setItem('profile', JSON.stringify(res.data))
        }
        if (firstName !== inforUser.first_name || lastName !== inforUser.last_name) {
            let response =  await axios.post(`http://127.0.0.1:8000/api/user/update/${profile.id}`, {
                firstName: firstName,
                lastName: lastName,
            })
            localStorage.setItem('inforUser', JSON.stringify(response.data))
        }
        navigate('/person')
    }

    return (
        <>
            <Header />
            <div className="update">
                <div className="container">
                    <div className="avatar">
                        <img src={`http://127.0.0.1:8000${profile.profile_img}`} alt="" />
                    </div>
                    <h3 className="name">
                        {inforUser.first_name + ' ' + inforUser.last_name}
                    </h3>
                    <p className="email_contact">{inforUser.email}</p>
                    <div className="about">
                        <Link to='/'>Change Password</Link>
                    </div>
                    <div className="input">
                        <div className="input_name">
                            <div className="first_name">
                                <label htmlFor="">First Name</label>
                                <input 
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                    className="input_conent" 
                                    type="text"
                                />
                            </div>
                            <div className="last_name">
                                <label htmlFor="">Last Name</label>
                                <input 
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                    className="input_conent" 
                                    type="text"
                                />
                            </div>
                        </div>
                        <div className="input_email">
                            <div className="email">
                                <label htmlFor="">Biography</label>
                                <textarea 
                                    value={biography}
                                    onChange={(e) => setBiography(e.target.value)}
                                    className="input_conent" 
                                    type="text"
                                />
                            </div>
                            <div className="email">
                                <label htmlFor="">Address</label>
                                <textarea 
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                    className="input_conent" 
                                    type="text"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="btn_update">
                        <button onClick={handleUpdate}>Upadate</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Update