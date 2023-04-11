import React, { useEffect, useState } from "react";
import { Modal } from '../Components/ModalComponent/Modal.component';
function ModalView(params) {
    // const [showModal, setShowModal] = useState(false);

    // const openModal = () => {
    //     setShowModal(true);
    // };

    // const closeModal = () => {
    //     setShowModal(false);
    // };

    return (<>
        <div>
            {/* <button onClick={openModal}>Open Modal</button> */}
            <Modal show={params.showModal} onClose={params.onClose}>
                <h1>Error Handler</h1>
                <p>{params.errorMessage}</p>
            </Modal>
        </div>
    </>)
}
export {ModalView}