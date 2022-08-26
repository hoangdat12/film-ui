import React, {useState, useEffect, useContext} from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';

import Navbar  from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import MovieCard from '../../components/movie-card/MovieCard';
import { AuthContext } from '../../context/authContext';

import './person.scss'

const Person = () => {
    let {user} = useContext(AuthContext) 

    let userInfor = localStorage.getItem('inforUser') ? JSON.parse(localStorage.getItem('inforUser')) : null
    let profile = localStorage.getItem('profile') ? JSON.parse(localStorage.getItem('profile')) : null

    const [movieWatched, setMovieWatched] = useState([]);
    const [movieLiked, setMovieLiked] = useState([])

    useEffect(() => {
        const getMovies = async () => {
            let res = await axios.get(`http://127.0.0.1:8000/api/film/get/${user.user_id}/is-watched`)
            if((res.data).length > 5) {
                setMovieWatched(res.data.slice(0,5))
            }
            else {
                setMovieWatched(res.data)
            }
            let response = await axios.get(`http://127.0.0.1:8000/api/film/get/${user.user_id}/is-liked`)
            if ((response.data).length > 5) {
                setMovieLiked(response.data.slice(0,5))
            }
            else {
                setMovieLiked(response.data)
            }
        }
        getMovies();
    }, [user.user_id]);

    return (
        <>
            <Navbar />
            <div className="person">
                <div className="nav__img__person">
                    <div className="person__profile">
                        <div className="profile__img">
                            <img src={`http://127.0.0.1:8000${profile.profile_img}`} alt="" />
                        </div>
                        <div className="profile__name">{userInfor.first_name + ' ' + userInfor.last_name} </div>
                        <div className="bio">{profile.bio}</div>
                        <Link to='/profile/update' className='btn-update' >Update Profile</Link>
                    </div>
                </div>

                <div className="nav__history__person">
                    <div className="person__history section">
                        <h2>History</h2>
                        <div className="list_movie movie-grid">
                        {
                            movieWatched.map((item, i) => <MovieCard item={item} key={i}/>)
                        }
                        </div>
                    </div>

                    <div className="person__history section">
                        <h2>Liked</h2>
                        <div className="list_movie movie-grid">
                        {
                            movieLiked.map((item, i) => <MovieCard item={item} key={i}/>)
                        }
                        </div>
                    </div>
                </div>

            </div>
            <Footer />
        </>
    )
}

export default Person