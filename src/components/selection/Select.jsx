import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {BiChevronDown} from 'react-icons/bi'

import './select.scss'


const Select = props => {
    const [active, setActive] = useState(false)
    // const [select, setSelect] = useState(props.Selected)

    const handleActive = () => {
        setActive(!active)
    }
    
    const handleValue = (index) => {
        props.setSort(props.Keyword[index])
        handleActive()
    }
    return (
            <div className={active ? "select-menu active" : "select-menu"}>
                <div 
                    onClick={handleActive}
                    className="select-btn"
                >
                    <span className="sBtn-text">{props.Selected}</span>
                    <i><BiChevronDown /></i>
                </div>

                <ul className="options">
                    {props.Keyword.map((item, index) => (
                        <li 
                            onClick={() => handleValue(index)}
                            key={index} 
                            className="option"
                        >
                            <span className="option-text">{item}</span>
                        </li>
                    ))}
                </ul>
            </div>
    );
}

Select.propTypes = {
    Keyword: PropTypes.array,
    Selected: PropTypes.string,
    setSort: PropTypes.func
}

export default Select;