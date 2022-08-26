import React, {useState, useEffect, useRef} from "react";
import axios from 'axios'
import PropTypes from 'prop-types'

import {BiLike} from 'react-icons/bi'
import {FaReply} from 'react-icons/fa'

import './comment.scss'

const Comment = (props) => {
    let inputRef = useRef()

    let profile = localStorage.getItem('profile') ? JSON.parse(localStorage.getItem('profile')) : null
    let user = localStorage.getItem('inforUser') ? JSON.parse(localStorage.getItem('inforUser')) : null
    const [content, setContent] = useState('')
    const [comments, setComments] = useState([])
    const [film, setFilm] = useState([])

    const commentFilm =async () => {
        const res = await axios.post(`http://127.0.0.1:8000/api/comment/create`, {
            user: profile.id_user,
            film_id: film.id,
            content: content,
            username: `${user.first_name} ${user.last_name}`,
            avatar: profile.profile_img
        })
        setComments(() => [res.data, ...comments])
    }
    useEffect(() => {
        const getCommets = async () => {
            let filmInfor = await axios.get(`http://127.0.0.1:8000/api/film/get/${props.id}`)
            setFilm(filmInfor.data)
            let res = await axios.get(`http://127.0.0.1:8000/api/comment/get-all/${filmInfor.data.id}`)
            setComments(res.data)
        }
        getCommets()
    }, [props.id])

    const handlePostComment = () => {
        commentFilm()
        setContent('')
        inputRef.current.focus();
    }


    return (
        
        <div className="comment">
            <div className="comment-body ">
                <h4 className="comment_title">Recent comments</h4>
                <p>Latest Comments section by users</p>

                {
                    comments && comments.map(comment => (
                        <div key={comment.id} className="comment_film">
                            <img src={`http://127.0.0.1:8000${profile.profile_img}`} alt="avatar" width="60" height="60" />
                            <div>
                                <h6 className="title">{comment.username}</h6>
                                <div className="infor__comment">
                                    <p className="infor">
                                        March 07, 2021
                                    </p>
                                </div>
                                <p className="content">
                                {
                                    comment.content
                                }
                                </p>
                            </div>
                            <div className="btn_comment">
                                <span><BiLike /></span>
                                <span><FaReply /></span>
                            </div>
                        </div>
                    ))
                }


                
            </div>

            <div className="comment_input">
                <div className="avatar">
                    <img src={`http://127.0.0.1:8000${profile.profile_img}`} alt="" />
                </div>
                <div className="input">
                    <textarea 
                        ref={inputRef}
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        className="form-control" 
                        id="textAreaExample" 
                        style={{background: "#fff"}}
                        placeholder="Enter comments"
                    />
                    <div className="btn_post">
                        <button className="cancel">Cancel</button>
                        <button 
                            onClick={handlePostComment}
                            className="post"
                        >
                            Post
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

Comment.propTypes = {
    id: PropTypes.string,
}

export default Comment