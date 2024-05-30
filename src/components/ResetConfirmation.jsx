import React, { useState } from "react"
import { Button, Modal } from "react-bootstrap";

const ResetConfirmation = ({confirmAction}) => {
    const [show, setShow] = useState(false);
    const handleShow = () => {
        setShow(true);
    }
    const handleClose = () => {
        setShow(false);
    }
    const handleConfirm = () => {
        confirmAction();
        setShow(false);
    }
    return (
        <div>
            <div className="d-grid gap-2">
                <Button variant='danger' className="w-50 mx-auto" onClick={handleShow}><h5>Reset Balance</h5></Button>                
            </div>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header>
                    Reset confirmation
                </Modal.Header>
                <Modal.Body>
                    <h5>Clicking <span style={{color: "red", fontWeight: "bold"}}>"Yes"</span> will reset your current Net Balance. This cannot be undone.</h5>
                    <h3>Are you sure ?</h3>
                </Modal.Body>
                <Modal.Footer>
                    <Button 
                        variant='secondary'
                        className="px-5"
                        onClick={handleClose}
                    >
                        No
                    </Button>
                    <Button 
                        variant='danger'
                        className="px-5"
                        onClick={handleConfirm}
                    >
                        Yes
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
};

export default ResetConfirmation;
