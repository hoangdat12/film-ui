import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

import {AiOutlineCloseCircle} from 'react-icons/ai'

import './modal.scss';

const Modal = props => {

    const [active, setActive] = useState(false);

    useEffect(() => {
        setActive(props.active);
    }, [props.active]);

    return (
        <div id={props.id} className={`modal ${active ? 'active' : ''}`}>
            {props.children}
        </div>
    );
}

Modal.propTypes = {
    active: PropTypes.bool,
    id: PropTypes.string
}

export const ModalContent = props => {

    const contentRef = useRef(null);

    useEffect(() => {
        const handler = (event) => {
            if(!contentRef.current?.contains(event.target)) {
                closeModal()
            }
        }
        window.addEventListener('click', handler)
        return () => window.removeEventListener('click', handler)
    })

    const closeModal = (e) => {
        contentRef.current.parentNode.classList.remove('active');
        if (props.onClose) props.onClose();
    }

    return (
        <div ref={contentRef} className="modal__content">
            {props.children}
            <div className="modal__content__close" onClick={(e) => closeModal(e)}>
                <i className="bx bx-x"><AiOutlineCloseCircle /></i>
            </div>
        </div>
    )
}

ModalContent.propTypes = {
    onClose: PropTypes.func
}

export default Modal;