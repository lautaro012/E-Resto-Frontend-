import './Modal.css'

export default function Modal({ isOpen, closeModal, title, children }) {

    return (
        <div className={`modal ${isOpen && 'modal-open'}`}>
            <div className='modal_dialog'>
                <button onClick={closeModal}>X</button>
                <h1>{title}</h1>
                {children}
            </div>
        </div>
    )
}