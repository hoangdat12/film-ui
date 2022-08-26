import React, {useState} from "react";
import { Link } from "react-router-dom";
import PropTypes  from 'prop-types';
import {BiFirstPage, BiLastPage} from 'react-icons/bi'

import './pagination.scss'

const Pagination = (props) => {
    let page = props.page + 1

    const [active, setActive] = useState(false)

    const handleActive = (value) => {
        if (value !== 1) {
            setActive(true)
        }
        props.onClick(value - 1)
    }

    return (
        <div className="pagination">
            <Link onClick={() => props.onClick(page === 1 ? 1 : page - 1)} to='#'><BiFirstPage /></Link>
            <Link onClick={() => handleActive(1)} to='#' className={active ? '' : 'active'} >1</Link>
            <Link onClick={() => handleActive(page)} to='#' className={active ? 'active' : ''}>{page + 0}</Link>
            <Link onClick={() => handleActive(page + 1)} to='#' >{page + 1}</Link>
            <Link to='#'>...</Link>
            <Link onClick={() => handleActive(page + 7)} to='#' >{page + 7}</Link>
            <Link onClick={() => handleActive(page + 8)} to='#' >{page + 8}</Link>
            <Link to='#'>...</Link>
            <Link to='#'><BiLastPage /></Link>
        </div>
    )
}

Pagination.propTypes = {
    onclick: PropTypes.func,
    page: PropTypes.number
}

export default Pagination