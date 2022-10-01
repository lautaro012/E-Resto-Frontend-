import { useState } from 'react'

const useModal = (initalValue = false) => {


    const [isOpenModal, setIsOpenModal] = useState (initalValue)

    function openModal() {
        setIsOpenModal(true)
    }

    function closeModal() {
        setIsOpenModal(false)
    }

    return [isOpenModal, openModal, closeModal]

}

export default useModal