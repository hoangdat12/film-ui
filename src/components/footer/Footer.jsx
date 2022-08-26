import React from "react";

import {SiTailwindcss} from 'react-icons/si'
import {FaFacebook, FaInstagram, FaTwitter, FaGithub, FaTiktok} from 'react-icons/fa'

import './footer.scss'

const Footer = () => {

    return (
        <div className="footer">
            <div className="footer_container">
                <div className="footer__content">
                    <h3>Font End</h3>
                    <ul className="content__list">
                        <li className="content__item">
                            <a>React Js</a>
                        </li>
                        <li className="content__item">
                            <a>TailWin Css</a>
                        </li>
                        <li className="content__item">
                            <a>Redux</a>
                        </li>
                    </ul>
                </div>
                <div className="footer__content">
                    <h3>Back End</h3>
                    <ul className="content__list">
                        <li className="content__item">
                            <a>Django</a>
                        </li>
                        <li className="content__item">
                            <a>JWT</a>
                        </li>
                    </ul>
                </div>
                <div className="footer__content">
                    <h3>FullStack</h3>
                    <ul className="content__list">
                        <li className="content__item">
                            <a>Django</a>
                        </li>
                        <li className="content__item">
                            <a>Reacjs</a>
                        </li>
                        <li className="content__item">
                            <a>Redux</a>
                        </li>
                    </ul>
                </div>
                <div className="footer__contact">
                    <div className="footer__icons">
                        <SiTailwindcss />
                    </div>
                    <div className="footer__letter">
                        <h2>Making the world the better place through constructing elegant hierarchies</h2>
                    </div>
                    <div className="contact">
                        <span><FaFacebook /></span>
                        <span><FaInstagram /></span>
                        <span><FaGithub /></span>
                        <span><FaTwitter /></span>
                        <span><FaTiktok /></span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer