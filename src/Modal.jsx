import React from 'react'
import { Modal, Button } from "react-bootstrap";

const DeleteConfirmation = ({ showModal, hideModal, confirmModal, id }) => {
  return (
    <Modal show={showModal} onHide={hideModal}>
      <Modal.Header closeButton>
        <Modal.Title>Delete Confirmation</Modal.Title>
      </Modal.Header>
      <Modal.Body><div className="alert alert-danger text-center fw-bold">Are You Sure you want to delete..?</div></Modal.Body>
      <Modal.Footer>
        <Button variant="outline-info" onClick={hideModal}>
          Cancel
        </Button>
        <Button variant="outline-danger" onClick={() => confirmModal(id)}>
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default DeleteConfirmation;