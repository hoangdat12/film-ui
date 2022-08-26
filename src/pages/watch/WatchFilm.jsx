import React, {useEffect, useState} from "react";

import { useParams } from "react-router-dom";

import tmdbApi from "../../api/tmdbApi";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import {Video} from '../detail/VideoList'
import CastList from "../detail/CastList";
import Poster from '../../components/poster/Poster'
import MovieList from "../../components/movie-list/MovieList";
import Comment from "../../components/comments/Comment";

import './watch.scss'

const WatchFilm = () => {
    let {category, id} = useParams()

    const [videos, setVideos] = useState([])
    const [detail, setDetail] = useState([])

    useEffect(() => {
        const getDetail = async () => {
            const response = await tmdbApi.detail(category, id, {params:{}});
            const res = await tmdbApi.getVideos(category, id);
            setDetail(response);
            setVideos(res.results.slice(0,1))
            window.scrollTo(0,0);
        }
        getDetail();
    }, [category, id]);


    return (
        <>
        <Navbar />
        <Poster />
        <div className="watch__film section">
            <div className="film">
                {
                    videos && videos.map((video, index) => (
                        <Video key={index} item={video}/>
                    )) 
                }
                <div className="film__descriptions">
                    <h2 className="title">{detail.title}</h2>
                    <div className="type">
                        {
                            detail.genres && detail.genres.map((genre, index) => (
                                <span key={index}>{genre.name}</span>
                            ))
                        }
                    </div>
                    <div className="time">
                        <span>Time: {detail && detail.runtime} minus</span>
                        <span>Point: {detail && detail.vote_average}</span>
                    </div>
                    <div className="company">
                        <h4 className="letter">Conpany:</h4> 
                        {detail.production_companies && detail.production_companies.map((company, index) => (
                            <span key={index}>{company.name}</span>
                        ))}
                    </div>
                    <div className="content">
                        <span>Content Flim: {detail && detail.overview}</span>
                    </div>
                    <div className="cast">
                        <CastList id={id} multiple={true}/>
                        <div className="button">
                            <button>More</button>
                        </div>
                    </div>
                </div>

                <Comment id={id} />

                <div className="section mb-3">
                    <div className="section__header mb-2">
                        <h2>Similar</h2>
                    </div>
                    <MovieList category={category} type="similar" id={id}/>
                </div>
            </div>
        </div>
        <Footer />
        </>
    )
}

export default WatchFilm