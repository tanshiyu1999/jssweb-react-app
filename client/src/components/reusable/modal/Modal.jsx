import React, { useState, useMemo, useEffect, useRef } from 'react';
import './Modal.css'

const Modal = ({open, onClose, name, description, urlText1, url1, urlText2, url2, urlText3, url3}) => {

  // https://dev.to/link2twenty/react-using-native-dialogs-to-make-a-modal-popup-4b25


  const modalRef = useRef(null);

  const handleButtonClick = () => {
    modalRef.current.showModal();
  }

  const closeModal = () => {
    const dialog = modalRef.current;
    dialog.setAttribute("closing", "");
  }

  const handleDialogClick = (e) => {
    const dialog = modalRef.current;
    if (e.target == dialog) {
      dialog.setAttribute("closing", "");
    }
  }

  const onAnimationEnd = () => {
    const dialog = modalRef.current;
    if (dialog.hasAttribute("closing")) {
      dialog.removeAttribute("closing");
      onClose();
      dialog.close();
    }
  }

  useEffect(() => {
    const { current: el } = modalRef;
    if (open) el.showModal();
  }, [open]);

  

  return (
    <>
      {/* <button onClick={() => handleButtonClick(prev => !prev)}>Open</button> */}
      <dialog
        ref={modalRef}
        className="center-screen"
        onClick={(e) => handleDialogClick(e)}
        onAnimationEnd={onAnimationEnd}
      >
        <div className="inside-modal">
          <h3>{name}</h3>
          <p>{description}</p>
          <button onClick={() => closeModal()}>Close</button>
        </div>
      </dialog>
    </>
  )
}

export default Modal