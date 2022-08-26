import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router';

import {BsHeart, BsSuitHeartFill} from 'react-icons/bs'

import tmdbApi from '../../api/tmdbApi';
import apiConfig from '../../api/apiConfig';

import CastList from './CastList';
import VideoList from './VideoList';
import Navbar  from "../../components/navbar/Navbar";
import Footer from '../../components/footer/Footer';
import Button from '../../components/button/Button';
import { OutlineButton } from '../../components/button/Button';
import MovieList from '../../components/movie-list/MovieList';

import './detail.scss';
import axios from 'axios';


const Detail = () => {
    let user = localStorage.getItem('inforUser') ? JSON.parse(localStorage.getItem('inforUser')) : null
    let navigate = useNavigate()

    const { category, id } = useParams();

    const [item, setItem] = useState(null);
    const [loading, setLoading] = useState(false)
    const [active, setActive] = useState(false)

    useEffect(() => {
        const getDetail = async () => {
            let response = await tmdbApi.detail(category, id, {params:{}});
            setItem(response);
            setLoading(true)
            window.scrollTo(0,0);
        }
        getDetail();
        const uploadFilm = async () => {
            let res = await axios.post('http://127.0.0.1:8000/api/film/create', {
                name: item ? item.title || item.name : null,
                type_film: category,
                film_id: id,
                image: item ? item.poster_path : null,
                user: user ? user.id : 1,
                is_watch: true,
            })
            if (res.status === 201) {
                console.log('Successfully !')
            }
        }
        if (loading) {
            uploadFilm()
        }
    }, [category, id, loading]);

    const updateLike = async() => {
        let res = await axios.post(`http://127.0.0.1:8000/api/film/update-like/${id}`)
        setActive(!active)
        console.log(res.data.detail)
    }

    const updateUnLike = async () => {
        let res = await axios.post(`http://127.0.0.1:8000/api/film/update-unlike/${id}`)
        setActive(!active)
        console.log(res.data.detail)
    }

    const handleWatchFilm = () => {
        navigate(`/watch/${category}/${id}`)
    }

    return (
        <>
            <Navbar />
            <div className="detail">
            {
                item && (
                    <>
                        <div className="banner" style={{backgroundImage: `url(${apiConfig.originalImage(item.backdrop_path || item.poster_path)})`}}></div>
                        <div className="mb-3 movie-content container">
                            <div className="movie-content__poster">
                                <div className="movie-content__poster__img" style={{backgroundImage: `url(${apiConfig.originalImage(item.poster_path || item.backdrop_path)})`}}></div>
                                <div className="button">
                                </div>
                            </div>
                            <div className="movie-content__info">
                                <h1 className="title">
                                    {item.title || item.name}
                                </h1>
                                <div className="genres">
                                    {
                                        item.genres && item.genres.slice(0, 5).map((genre, i) => (
                                            <span key={i} className="genres__item">{genre.name}</span>
                                        ))
                                    }
                                </div>
                                <div className="button">
                                    <Button onClick={handleWatchFilm}>Watch Film</Button>
                                    <OutlineButton>Watch Trailer</OutlineButton>
                                    <Button 
                                        onClick={active ? updateUnLike : updateLike}
                                        className='btn_like' 
                                    >
                                        <i className={active ? 'active' : ''}>
                                            {active ? <BsSuitHeartFill /> : <BsHeart />}
                                        </i>
                                    </Button>
                                </div>
                                <p className="overview">{item.overview}</p>
                                <div className="cast">
                                    <div className="section__header">
                                        <h2>Casts</h2>
                                    </div>
                                    <CastList id={item.id}/>
                                </div>
                            </div>
                        </div>
                        <div className="container">
                            <div className="section mb-3">
                                <VideoList id={item.id}/>
                            </div>
                            <div className="section mb-3">
                                <div className="section__header mb-2">
                                    <h2>Similar</h2>
                                </div>
                                <MovieList category={category} type="similar" id={item.id}/>
                            </div>
                        </div>
                    </>
                )
            }
            </div>
            <Footer />
        </>
    );
}

export default Detail;