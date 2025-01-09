import React from 'react';
import {useState, useEffect} from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Toast from 'react-bootstrap/Toast';
import Button from 'react-bootstrap/Button';

export default function ToastPopUp({message}) {
    const [showToast, setShowToast] = useState(true);
    const toggleShowToast = () => setShowToast(!showToast);


    return (<>


        <Row>
            <Col md={6} className='mb-2'>
                <Button onClick={toggleShowToast} className='mb-2'>
                    {message}
                </Button>

                <Toast show={showToast} onClose={toggleShowToast}>
                    <Toast.Header>
                        <img src='../assets/roman.webp' className='rounded me-2'
                             alt=''/>
                        <strong className='me-auto'>Roman Bellic</strong>
                        <small>Dog Trainer</small>
                    </Toast.Header>
                    <Toast.Body>Cousin</Toast.Body>
                </Toast>
            </Col>
        </Row>


    </>)
}