import './Modal.css'

export default function ModalInDetail({ isOpen, closeModal, title, children }) {

    return (
        <div className={`modal ${isOpen && 'modal-open'}`}>
            <div className='modal_dialog'>
                <button onClick={closeModal}>X</button>
                <h1 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">{title}</h1>
                <hr></hr>
                <div className='tags_modal_children'>
                    {children}
                </div>
            </div>
        </div>
    )
}