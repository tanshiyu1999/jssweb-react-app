import React, { useState, useMemo, useEffect, useRef } from 'react';
import './Modal.css'

const Modal = () => {

  // https://dev.to/link2twenty/react-using-native-dialogs-to-make-a-modal-popup-4b25

  const [isOpen, setIsOpen] = useState(false);

  const modalRef = useRef(null);

  // console.log(modalRef)

  const handleButtonClick = () => {
    modalRef.current.showModal();
  }

  const closeModal = () => {
    modalRef.current.close();
  }

  const handleDialogClick = (e) => {
    const dialog = modalRef.current;
    if (e.target == dialog) {
      dialog.setAttribute("closing", "");
      // modalRef.current.close();
    }
  }

  const onAnimationEnd = () => {
    const dialog = modalRef.current;
    if (dialog.hasAttribute("closing")) {
      dialog.removeAttribute("closing");
      dialog.close();
    }
  }

  return (
    <>
      <button onClick={() => handleButtonClick(prev => !prev)}>Open</button>

      <dialog
        ref={modalRef}
        className="center-screen"
        onClick={(e) => handleDialogClick(e)}
        onAnimationEnd={onAnimationEnd}
      >
        <div className="inside-modal">
          <p>This is modal</p>
          <button onClick={() => closeModal()}>Close Modal</button>
        </div>
      </dialog>
    </>
  )
}

export default Modal