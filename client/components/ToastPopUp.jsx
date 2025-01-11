import React from 'react';
import {useState, useEffect} from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Toast from 'react-bootstrap/Toast';


export default function ToastPopUp({message}) {
    const [showToast, setShowToast] = useState(true);
    const toggleShowToast = () => setShowToast(!showToast);


    useEffect(() => {
        if (message) {
            setShowToast(true);
        }
    }, [message]);


    return (<>


        <Row>
            <Col md={6} className='mb-4'>
                <Toast show={showToast} onClose={toggleShowToast} animation={true} delay={4000} autohide>
                    <Toast.Header>
                        <img src='../assets/roman.webp' className='rounded me-2 w-25 h-25'
                             alt=''/>
                        <strong className='me-auto'>Roman Bellic</strong>
                        <small>Dog Trainer</small>
                    </Toast.Header>
                    <Toast.Body>{message}</Toast.Body>
                </Toast>
            </Col>
        </Row>


    </>)
}