import React from 'react';
import { Modal } from 'react-bootstrap';

const ModalCotainer = ({ show, handleClose, title, children, size = 'md' }) => {
  return (
    <Modal show={show} size={size} onHide={handleClose} className='modalContainer'>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {children}
      </Modal.Body>
    </Modal>
  );
};

export default ModalCotainer;
