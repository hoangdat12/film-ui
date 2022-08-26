import React, {useState, useEffect, useCallback} from 'react'
import {useParams, useNavigate} from 'react-router-dom'
import axios from 'axios';
import apiConfig from '../../api/apiConfig';

import Navbar from "../../components/navbar/Navbar";
import Footer from '../../components/footer/Footer';
import MovieCard from '../../components/movie-card/MovieCard';
import Pagination from '../../components/pagination/Pagination';
import Select from '../../components/selection/Select';
import { Format, Year, Type  } from '../../utils/selector';
import Button from '../../components/button/Button';
import Poster from '../../components/poster/Poster'

import './search.scss'

const Search = () => {
    let navigate = useNavigate()
    let {keyword} = useParams()

    const [items, setItems] = useState([]);
    const [keywordSearch, setKeywordSearch] = useState('')
    const [page, setPage] = useState(1)
    const [format, setFormat] = useState('Format')
    const [year, setYear] = useState('Year')
    const [type, setType] = useState('Type')

    useEffect(() => {
        const getList = async () => {
            let response = null
            if (!keyword || !keywordSearch) {
                response = await axios.get(`https://api.themoviedb.org/3/movie/top_rated?api_key=${apiConfig.apiKey}&language=en-US&page=${page}`)
            }
            else {
                response = await axios.get(`https://api.themoviedb.org/3/search/${type === 'Type' | type === 'Movie' ? 'movie' : 'tv'}?api_key=${apiConfig.apiKey}&language=en-US&query=${keyword}&page=${page}&include_adult=${format === 'Over 18' ? 'true' : 'false'}&year=${year}`);
            }
            setItems(response.data.results)
        }
        getList();
    }, [keyword, format, type, year, keywordSearch, page]);

    const goToSearch = useCallback(
        () => {
            if (keywordSearch.trim().length > 0) {
                navigate(`/${type === 'Type' | type === 'Movie' ? 'movie' : 'tv'}}/search/${keywordSearch}`);
            }
        },
        [keywordSearch, type, navigate]
    );

    useEffect(() => {
        const enterEvent = (e) => {
            e.preventDefault();
            if (e.keyCode === 13) {
                goToSearch();
            }
        }
        document.addEventListener('keyup', enterEvent);
        return () => {
            document.removeEventListener('keyup', enterEvent);
        };
    }, [keywordSearch, goToSearch])

    return (
        <>
            <Navbar />
            <Poster />
            <div className="search">
                <div className="category mb-3">
                    <div className="category__title">
                        <Select Keyword={Year} Selected={year} setSort={setYear}/>
                        <Select Keyword={Format} Selected={format} setSort={setFormat}/>
                        <Select Keyword={Type} Selected={type} setSort={setType}/>

                        <input 
                            type="text" 
                            placeholder='Search...' 
                            className='input__search' 
                            value={keywordSearch}
                            onChange={(e) => setKeywordSearch(e.target.value)}
                        />
                        <div className="button">
                            <Button onClick={goToSearch}>Fillter</Button>
                        </div>
                    </div>
                </div>
                <div className="section">
                    <div className="list_movie movie-grid">
                        {
                            items && items.map((item, i) => <MovieCard category = {type === 'Type' | type === 'Movie' ? 'movie' : 'tv'} item={item} key={i}/>)
                        }
                    </div>
                </div>
            </div>
            <Pagination onClick={setPage} page={page} />
            <Footer />
        </>
    )
}

export default Search