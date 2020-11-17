import React from 'react'
import Portal from './Portal'
import './Modal.css'

const Modal = ({
    title, isOpen, onCancel, onSubmit, children
}) => {
    return (
        <>
        { isOpen && 
            <Portal>
            <div className='modal__overlay'>
                <div className='modal__window'>
                    <div className='modal__header'>
                        <div className='modal__title'>{title}</div>
                        <div onClick={onCancel}>&times;</div>
                    </div>
                    <div className='modal__body'>
                        {children}
                    </div>
                    <div className='modal__footer'>
                        <button className='modal__cancel' onClick={onCancel}>Отменить</button>
                        <button className='modal__submit' onClick={onSubmit}>Добавить</button>
                    </div>
                </div>
            </div>
        </Portal>
        }
        </>
    )
}

export default Modal
