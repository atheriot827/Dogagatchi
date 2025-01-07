import React from 'react';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export default function VoiceTraining() {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
        <Button variant="primary" onClick={handleShow}>
            Launch modal
        </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Header Here</Modal.Title>
                </Modal.Header>
                <Modal.Body>Woohoo, we got text in a modal!</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close Modal
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                        Save changes or do something else
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

