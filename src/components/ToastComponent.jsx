import React from "react";
import { Toast, ToastContainer } from "react-bootstrap";

const ToastComponent = ({showToast, onToggleClose, toastMessage, background='secondary', delayTime=3000}) =>{
  return (
    <ToastContainer
        position='bottom-end'
    >
        <Toast 
            show={showToast} 
            onClose={onToggleClose} 
            animation={true} 
            bg={background}
            delay={delayTime} 
            autohide
        >
            <Toast.Header>
                <strong className="me-auto">{toastMessage.header}</strong>
            </Toast.Header>
            <Toast.Body className="text-light">
                <h6>{toastMessage.body}</h6>
            </Toast.Body>
        </Toast>
    </ToastContainer>
  )
};

export default ToastComponent;
