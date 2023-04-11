import React, { useRef, useState } from 'react';
import './Modal.component.css';

const Modal = ({ show, onClose, children }) => {
    const modal = useRef(null)

    const closeModal = (event) => {
        if (event.target === modal.current) {
            onClose();
        }
    };

    return (
        <div ref={modal} className={`modal ${show ? 'show' : ''}`} onClick={closeModal}>
            <div className="modal-content">
                <span className="close" onClick={onClose}>&times;</span>
                {children}
            </div>
        </div>
    );
};

export { Modal };
