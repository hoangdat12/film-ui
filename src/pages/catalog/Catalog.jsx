import React, {useState, useEffect} from 'react'
import {useParams} from 'react-router-dom'

import Navbar from "../../components/navbar/Navbar";
import MovieCard from '../../components/movie-card/MovieCard';
import Footer from '../../components/footer/Footer';
import Pagination from '../../components/pagination/Pagination';
import Poster from '../../components/poster/Poster'

import tmdbApi, { category, movieType, tvType } from '../../api/tmdbApi';

import './catalog.scss'


const Catalog = () => {
    let {catalog} = useParams()

    const [items, setItems] = useState([]);
    const [page, setPage] = useState(1)

    useEffect(() => {
        const getList = async () => {
            let response = null;
            let params = {};
            if (page === 1) {
                switch(catalog) {
                    case category.movie:
                        response = await tmdbApi.getMoviesList(movieType.upcoming, {params});
                        break;
                    default:
                        response = await tmdbApi.getTvList(tvType.popular, {params});
                }
            }
            else {
                params = {
                    page: page
                }
                switch(catalog) {
                    case category.movie:
                        response = await tmdbApi.getMoviesList(movieType.upcoming, {params});
                        break;
                    default:
                        response = await tmdbApi.getTvList(tvType.popular, {params});
                }
            }
            setItems(response.results);
        }
        getList();
        window.scrollTo(0,0);
    }, [catalog, page]);

    return (
        <>
            <Navbar />
            <Poster />
            <div className="catalog section">

                <h2>{catalog === 'movie' ? 'Movie' : 'Tv Series'}</h2>

                {/* <div className="category mb-3">
                    <div className="category__title">
                        <Select Keyword={Year} Selected={'Year'}/>
                        <Select Keyword={Sort} Selected={'Sort'}/>
                        <Select Keyword={Format} Selected={'Format'}/>
                        <Select Keyword={National} Selected={'National'}/>
                        <Select Keyword={Type} Selected={'Type'}/>
                        <div className="button"><Button>Fillter</Button></div>
                    </div>
                </div> */}

                <div className="list_movie movie-grid">
                    {
                        items.map((item, i) => <MovieCard category={catalog} item={item} key={i}/>)
                    }
                </div>

                <Pagination onClick={setPage} page={page} />

            </div>
            <Footer />
        </>
    )
}

export default Catalog