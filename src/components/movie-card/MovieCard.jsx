import React from 'react';
import { Link } from 'react-router-dom';

import {FaPlayCircle} from 'react-icons/fa'

import Button from '../button/Button';
import apiConfig from '../../api/apiConfig';
import { category } from '../../api/tmdbApi';

import './movie-card.scss';

const MovieCard = props => {

    const item  = props.item;

    let Category = item.type_film ? item.type_film : category[props.category]
    let id = item.film_id ? item.film_id : item.id

    const link = '/' + Category + '/' + id;

    const bg = apiConfig.w500Image(item.image || item.poster_path || item.backdrop_path);

    return (
        <Link to={link}>
            <div className="movie-card" style={{backgroundImage: `url(${bg})`}}>
                <Button>
                    <i><FaPlayCircle /></i>
                </Button>
            </div>
            <h3>{item.title || item.name}</h3>
        </Link>
    );
}

export default MovieCard;